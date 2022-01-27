import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useAuthContext } from "../../../utils/hooks/use-auth.hook";
import PropType from "prop-types";
import p5Types from "p5";
import dynamic from "next/dynamic";
import { useWallet } from "use-wallet";
import { useContext, useEffect, useState } from "react";
import WalletConnectDialog from "./wallet.connect.dialog";
import {
  isTransactionMined,
  getPOPRContract,
} from "../../../utils/hooks/use-contracts.hook";
import { WalletStateContext } from "../../../utils/hooks/WalletStateContext";
import axios from "axios";

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

const PullRequestInfoModal = (props) => {
  const { pr } = props;
  const ipfsGateway = process.env.NEXT_PUBLIC_IPFS_GATEWAY;

  const wallet = useWallet();
  const [open, setOpen] = useState(false);
  const [canvas, setCanvas] = useState<p5Types.Renderer | undefined>(undefined);
  const [p5Instance, setP5Instance] = useState<p5Types | undefined>(undefined);
  const [nftHash, setNftHash] = useState<string | undefined>(undefined);
  const [jsonHash, setJsonhash] = useState<string | undefined>(undefined);
  const [mintedTokenId, setMintedTokenId] = useState<Number | undefined>(
    undefined
  );
  const [showLoading, setShowLoading] = useState(false);
  const walletStateContext = useContext(WalletStateContext);

  const poprContractAddress = process.env.NEXT_PUBLIC_API_POPR_ADDRESS;
  const tokenAddress = process.env.NEXT_PUBLIC_API_TOKEN_ADDRESS;
  const tokenTracker = process.env.NEXT_PUBLIC_API_TOKEN_TRACKER;

  useEffect(() => {
    // do something when wallet is connected
  }, [wallet]);

  const id = () => {
    const result = [];
    if (pr) {
      let val1 = [...pr.html_url.toString()];
      result.push(
        val1.reduce((acc, item) => acc + item.charCodeAt(0), val1.length) % 255
      ); // 1

      val1 = [...pr.node_id.toString()];
      result.push(
        val1.reduce((acc, item) => acc + item.charCodeAt(0), val1.length) % 255
      ); // 2

      val1 = [...pr.title.toString()];
      result.push(
        val1.reduce((acc, item) => acc + item.charCodeAt(0), val1.length) % 255
      ); // 3

      val1 = [...pr.id.toString()];
      result.push(
        val1.reduce((acc, item) => acc + item.charCodeAt(0), val1.length) % 255
      ); // 4

      val1 = [...pr.number.toString()];
      result.push(
        val1.reduce((acc, item) => acc + item.charCodeAt(0), val1.length) % 255
      ); // 5

      val1 = [...pr.created_at.toString()];
      result.push(
        val1.reduce((acc, item) => acc + item.charCodeAt(0), val1.length) % 255
      ); // 6

      val1 = [...pr.updated_at.toString()];
      result.push(
        val1.reduce((acc, item) => acc + item.charCodeAt(0), val1.length) % 255
      ); // 7

      val1 = [...pr.closed_at.toString()];
      result.push(
        val1.reduce((acc, item) => acc + item.charCodeAt(0), val1.length) % 255
      ); // 8

      val1 = [...pr.body.toString()];
      result.push(
        val1.reduce((acc, item) => acc + item.charCodeAt(0), val1.length) % 255
      ); // 9
    }
    return result;
  };

  const auth = useAuthContext();

  const MAX_HEIGHT = 350;
  const MAX_WIDTH = 350;
  const DENSITY = 16;
  const GAP = MAX_HEIGHT / DENSITY;
  const RELOAD_TIMEOUT = 3000;
  const STROKE_COLOR = "#00203F";

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const c = p5.createCanvas(MAX_HEIGHT, MAX_WIDTH).parent(canvasParentRef);
    c.id("my-canvas");
    p5.stroke(STROKE_COLOR);
    p5.noLoop();
    setCanvas(c);
    setP5Instance(p5);
  };

  function draw(p5: p5Types) {
    let index = id();
    const tonesArray = [];
    tonesArray.push([
      [index[0], index[1], index[2]],
      [index[3], index[4], index[5]],
      [index[6], index[7], index[8]],
    ]);

    index = id();
    tonesArray.push([
      [index[0], index[1], index[2]],
      [index[3], index[4], index[5]],
      [index[6], index[7], index[8]],
    ]);

    index = id();
    tonesArray.push([
      [index[0], index[1], index[2]],
      [index[3], index[4], index[5]],
      [index[6], index[7], index[8]],
    ]);

    index = id();
    tonesArray.push([
      [index[0], index[1], index[2]],
      [index[3], index[4], index[5]],
      [index[6], index[7], index[8]],
    ]);

    console.log(tonesArray);

    const lines = [];
    let odd = false;
    for (let y = GAP / 2; y <= MAX_HEIGHT; y += GAP) {
      odd = !odd;
      const trait = [];
      const oddFactor = odd ? GAP / 2 : 0;
      for (let x = GAP / 4; x <= MAX_HEIGHT; x += GAP) {
        trait.push({
          x: x + (Math.random() * 0.8 - 0.4) * GAP + oddFactor,
          y: y + (Math.random() * 0.8 - 0.4) * GAP,
        });
      }
      lines.push(trait);
    }
    odd = true;
    for (let y = 0; y < lines.length - 1; y++) {
      odd = !odd;
      const dotLine = [];
      for (let i = 0; i < lines[y].length; i++) {
        dotLine.push(odd ? lines[y][i] : lines[y + 1][i]);
        dotLine.push(odd ? lines[y + 1][i] : lines[y][i]);
      }
      for (let i = 0; i < dotLine.length - 2; i++) {
        let tonesIndex = Math.floor(Math.random() * tonesArray.length);
        let tones = tonesArray[tonesIndex];

        let radius = 20;

        if (i % 3 === 0) {
          radius = 15;
        }

        if (i % 2 === 0) {
          drawTriangle(p5, dotLine[i], dotLine[i + 1], dotLine[i + 2], tones);
        } else {
          drawCircle(p5, dotLine[i], dotLine[i + 1], tones, radius);
        }
      }
    }
  }

  const drawCircle = (p5: p5Types, pointA, pointB, tones, radius) => {
    let random_index = Math.floor(Math.random() * tones.length);
    const [r, g, b] = tones[random_index];
    p5.fill(r, g, b);
    p5.circle(pointA.x, pointB.y, radius);
  };

  const drawTriangle = (p5: p5Types, pointA, pointB, pointC, tones) => {
    let random_index = Math.floor(Math.random() * tones.length);
    const [r, g, b] = tones[random_index];
    p5.fill(r, g, b);
    p5.triangle(pointA.x, pointA.y, pointB.x, pointB.y, pointC.x, pointC.y);
  };

  const downloadNft = async () => {
    const fileName = `mycanvas_${Math.floor(Math.random() * 10000)}`;
    p5Instance.saveCanvas(canvas, fileName, "png");
  };

  const splitHashDisplay = (hash: string) => {
    const len = hash.length;
    return `${hash.substring(0, 10)}...${hash.substring(len - 10, len)}`;
  };

  const displayHash = (hash: string) => {
    return hash.length <= 10 ? hash : splitHashDisplay(hash);
  };

  const getMintedTokenIdFromTransactionReceipt = (txReceipt) => {
    const relevantTransferEvent = txReceipt.events.find(
      (e) => e.event === "Minted"
    );

    console.log("to: ", relevantTransferEvent.args.to);
    console.log("tokenId: ", relevantTransferEvent.args.tokenId.toNumber());

    const tokenId = relevantTransferEvent.args.tokenId.toNumber(); // convert the BigNumber tokenId emitted to a number.
    const address = relevantTransferEvent.args.to;
    return { tokenId, address };
  };

  const mintNft = async () => {
    if (wallet.isConnected()) {
      try {
        setShowLoading(true);
        // 1. Upload Image to nft.storage, get the link

        const domCanvas = document.getElementById(
          "my-canvas"
        ) as HTMLCanvasElement;

        const dataUrl = domCanvas.toDataURL("image/png", 1);

        const imageUploadResult = await axios.post(
          "/api/nft.storage",
          dataUrl,
          {
            headers: { "content-type": "image/png" },
          }
        );

        if (imageUploadResult.data.pin.status === "queued") {
          // 2. Create json file set the image url to link got from 1

          const metadata = {
            name: "Proof of Pull Request",
            description: pr.title,
            image: `${ipfsGateway}/${imageUploadResult.data.cid}`,
            external_url: pr.html_url,
            attributes: pr,
          };

          console.log(metadata);

          // 3. Upload json file, get url
          const metadataUploadResult = await axios.post(
            "/api/nft.storage",
            metadata,
            {
              headers: { "content-type": "image/png" },
            }
          );

          if (metadataUploadResult.data.pin.status === "queued") {
            const metadataUrl = `${ipfsGateway}/${metadataUploadResult.data.cid}`;

            setNftHash(imageUploadResult.data.cid);
            setJsonhash(metadataUploadResult.data.cid);

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
              process.env.TX_WAIT_BLOCK_COUNT
            );

            if (!isMined) {
              // toast.error(
              //   `Transaction not found after ${process.env.TX_WAIT_BLOCK_COUNT} blocks`
              // );
            } else {
              const { tokenId, address } =
                getMintedTokenIdFromTransactionReceipt(mintTxExecuted);
              if (address !== wallet.account) {
                throw Error("Account and Wallet Address Minted not the same");
              }
              setMintedTokenId(tokenId);
              // toast.success(
              //   "NFT Minted Successfully. Check your wallet for the token"
              // );
            }

            setShowLoading(false);
          }
        }
      } catch (err) {
        console.log(err);
        setShowLoading(false);
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
          <Col xs={6} style={{ marginBottom: "20px" }}>
            <Button variant="success" onClick={() => downloadNft()}>
              Download NFT
            </Button>
          </Col>
          <Col xs={6} style={{ marginBottom: "20px" }}>
            <Button variant="success" onClick={() => mintNft()}>
              {wallet.isConnected() ? `Mint NFT` : "Connect Wallet"}
            </Button>
          </Col>
          <Col xs={6}>
            <Sketch setup={setup} draw={draw} />
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
                  <span>Contract: </span><a href={`${tokenTracker}/${tokenAddress}`}>{splitHashDisplay(tokenAddress)}</a>
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
