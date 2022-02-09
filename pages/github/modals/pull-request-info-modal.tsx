import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useAuthContext } from "../../../utils/hooks/use-auth.hook";
import PropType from "prop-types";
import dynamic from "next/dynamic";
import { useWallet } from "use-wallet";
import { useContext, useEffect, useRef, useState } from "react";
import WalletConnectDialog from "./wallet.connect.dialog";
import {
  isTransactionMined,
  getPOPRContract,
} from "../../../utils/hooks/use-contracts.hook";
import { WalletStateContext } from "../../../utils/hooks/WalletStateContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  getNfts,
  NftData,
  saveNft,
} from "../../../utils/db/skynet-db/skynetdb";
import { config } from "../../../utils/config";
import { NFTStorage } from "nft.storage";

const nftStorageToken = process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN;
const storage = new NFTStorage({ token: nftStorageToken });

const PIN_STATUSES = {
  PINNED: "pinned",
  QUEUED: "queued"
};

const storeNftData = async (data) => {
  const cid = await storage.storeBlob(new Blob([data]));
  const status = await storage.status(cid);
  return status;
};

const PullRequestInfoModal = (props) => {
  const { pr } = props;
  const ipfsGateway = config.IPFS_GATEWAY;

  const wallet = useWallet();
  const auth = useAuthContext();
  const [open, setOpen] = useState(false);
  const [nftHash, setNftHash] = useState<string | undefined>(undefined);
  const [jsonHash, setJsonHash] = useState<string | undefined>(undefined);
  const [mintedTokenId, setMintedTokenId] = useState<Number | undefined>(
    undefined
  );
  const [mintedNfts, setMintedNfts] = useState<NftData[]>([]);

  const [showLoading, setShowLoading] = useState(false);
  const [disableMint, setDisableMint] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const walletStateContext = useContext(WalletStateContext);

  const poprContractAddress = config.POPR_ADDRESS;
  const tokenAddress = config.TOKEN_ADDRESS;
  const tokenTracker = config.TOKEN_TRACKER;

  const getMintedNfts = async () => {
    if (wallet.account) {
      const minted = await getNfts(wallet.account);
      setMintedNfts(minted && minted !== [] ? minted : []);

      return minted;
    }

    return [];
  };

  useEffect(() => {
    const getImageUrl = async () => {
      const _imageUrlResponse = await axios.post(config.IMAGE_API_URL, pr);      
      setImageUrl(_imageUrlResponse.data);
    }

    if(config.IMAGE_API_URL) {
      getImageUrl();
    } else {
      toast('No image url api selected');
    }      
    setJsonHash(undefined);
    setDisableMint(false);    
  }, [pr?.node_id]);

  useEffect(() => {
    getMintedNfts();
  }, [wallet.account, showLoading]);

  const shouldDisableMint = () => {
    if (showLoading) {
      return true;
    }

    const nft: NftData = mintedNfts?.find((nft: NftData) => {
      if (nft.pullRequestId === pr?.node_id) {
        return true;
      }

      return false;
    });

    if (nft) {
      setJsonHash(nft.jsonHash);
      setNftHash(nft.nftHash);
      setMintedTokenId(nft.tokenId);
      return true;
    }

    return false;
  };

  const splitHashDisplay = (hash: string) => {
    if (hash) {
      const len = hash.length;
      return `${hash.substring(0, 10)}...${hash.substring(len - 10, len)}`;
    }

    return "";
  };

  const displayHash = (hash: string) => {
    if (hash) {
      return hash.length <= 10 ? hash : splitHashDisplay(hash);
    }

    return "";
  };

  const getMintedTokenIdFromTransactionReceipt = (txReceipt) => {
    const relevantTransferEvent = txReceipt.events.find(
      (e) => e.event === "Minted"
    );

    const tokenId = relevantTransferEvent.args.tokenId.toNumber(); // convert the BigNumber tokenId emitted to a number.
    const address = relevantTransferEvent.args.to;
    return { tokenId, address };
  };

  const updateDatabase = async (nft) => {
    const dbNft = {
      walletAddress: auth.walletAddress,
      githubUsername: auth.login,
      jsonHash: nft.jsonHash,
      nftHash: nft.nftHash,
      contractAddress: nft.contractAddress,
      tokenId: nft.tokenId,
      pullRequestId: pr?.node_id,
    };

    await saveNft(dbNft);
    await shouldDisableMint();
  };

  const mintNft = async () => {
    if (wallet.isConnected()) {
      try {
        toast("Running Pre-Mint check...");
        await getMintedNfts();
        if (shouldDisableMint()) {
          toast.warning("Nft for this PR already minted");
          return;
        }
        setShowLoading(true);
        setDisableMint(true);

        toast("Uploading Nft to IPFS...");
        // 1. Upload Image to nft.storage, get the link

        const dataUrl = imageUrl;

        const imageUploadResult = await storeNftData(dataUrl);

        if (imageUploadResult.pin.status === PIN_STATUSES.QUEUED || imageUploadResult.pin.status === PIN_STATUSES.PINNED) {
          toast("Uploading Metadata to IPFS...");
          // 2. Create json file set the image url to link got from 1

          const metadata = {
            name: "Proof of Pull Request",
            description: pr.title,
            image: `${ipfsGateway}/${imageUploadResult.cid}`,
            external_url: pr.html_url,
            attributes: pr,
          };

          // 3. Upload json file, get url
          const metadataUploadResult = await storeNftData(metadata);

          if (metadataUploadResult.pin.status === PIN_STATUSES.QUEUED || metadataUploadResult.pin.status === PIN_STATUSES.PINNED) {
            toast("Minting Nft on the blockchain...");
            const metadataUrl = `${ipfsGateway}/${metadataUploadResult.cid}`;

            setNftHash(imageUploadResult.cid);
            setJsonHash(metadataUploadResult.cid);

            const popr = getPOPRContract(poprContractAddress, wallet.ethereum);
            const mintTxPromise = popr.mint(metadataUrl);

            walletStateContext.addNewQueuedTx(
              mintTxPromise,
              "Minting Proof of Pull Request",
              {}
            );

            const mintTx = await mintTxPromise;
            const mintTxExecuted = await mintTx.wait(1);

            const isMined = await isTransactionMined(
              wallet.ethereum,
              mintTxExecuted.transactionHash,
              config.TX_WAIT_BLOCK_COUNT
            );

            if (!isMined) {
              toast.error(
                `Transaction not found after ${config.TX_WAIT_BLOCK_COUNT} blocks`
              );
            } else {
              const { tokenId, address } =
                getMintedTokenIdFromTransactionReceipt(mintTxExecuted);
              if (address !== wallet.account) {
                throw Error("Account and Wallet Address Minted not the same");
              }
              setMintedTokenId(tokenId);
              toast.success(
                "NFT Minted Successfully. Check your wallet for the token"
              );

              toast("Cleaning up...");
              await updateDatabase({
                nftHash: imageUploadResult.cid,
                jsonHash: metadataUploadResult.cid,
                contractAddress: poprContractAddress,
                tokenId: tokenId,
              });
            }

            setShowLoading(false);
            setDisableMint(true);
          }
        }
      } catch (err) {
        console.log(err);
        setShowLoading(false);
        setDisableMint(false);
      }
    } else {
      wallet?.reset();
      setOpen(true);
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Pull Request Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={2}>Title:</Col>
          <Col>{pr?.title}</Col>
        </Row>
        <hr />
        <Row>
          <Col xs={2}>Body:</Col>
          <Col>{pr?.body}</Col>
        </Row>
        <hr />
        <Row>
          <Col xs={2}>Url</Col>
          <Col>
            <a href={pr?.html_url} target="_blank" rel="noreferrer">
              {pr?.html_url}
            </a>
          </Col>
        </Row>
        <hr />
        <Row>
          {wallet.account && (
            <Col xs={12} style={{ marginBottom: "20px" }}>
              Wallet: {wallet.account}
            </Col>
          )}
          <Col xs={12} style={{ marginBottom: "20px" }}>
            <Button
              variant="success"
              onClick={() => mintNft()}
              disabled={disableMint}
            >
              {wallet.isConnected() ? `Mint NFT` : "Connect Wallet"}
            </Button>
          </Col>
          <Col xs={6}>
            <img alt="NFT Image" src={imageUrl} width="350" height="350"></img>
          </Col>
          <Col xs={6}>
            {showLoading && (
              <div className="text-center">
                <div
                  className="spinner-border"
                  role="status"
                  style={{ width: "6rem", height: "6rem" }}
                ></div>
              </div>
            )}

            {jsonHash && !showLoading && (
              <div>
                <p>
                  <span>Nft Hash: </span>
                  <a href={`${ipfsGateway}/${nftHash}`}>
                    {displayHash(nftHash)}
                  </a>
                </p>
                <p>
                  <span>Json Hash: </span>
                  <a href={`${ipfsGateway}/${jsonHash}`}>
                    {displayHash(jsonHash)}
                  </a>
                </p>
                <p>
                  <span>Contract: </span>
                  <a href={`${tokenTracker}/${tokenAddress}`}>
                    {splitHashDisplay(tokenAddress)}
                  </a>
                </p>
                <p>
                  <span>Minted Token Id: {mintedTokenId}</span>
                </p>
              </div>
            )}
          </Col>
        </Row>
        <WalletConnectDialog open={open} setOpen={setOpen} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

PullRequestInfoModal.propTypes = {
  pr: PropType.object.isRequired,
  show: PropType.bool.isRequired,
  onHide: PropType.func.isRequired,
};
export default PullRequestInfoModal;
