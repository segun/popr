import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useWallet } from "use-wallet";
import { config } from "../../../utils/config";

interface DialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const WalletConnectDialog = (props: DialogProps) => {
  const wallet = useWallet();

  const addGnosisChainNetwork = async () => {
    try {
      await wallet.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: process.env.NEXT_PUBLIC_CHAIN_ID }], // Hexadecimal version of 80001, prefixed with 0x
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await wallet.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: process.env.NEXT_PUBLIC_CHAIN_ID, // Hexadecimal version of 80001, prefixed with 0x
                chainName: "Gnosis Chain",
                nativeCurrency: {
                  name: "Gnosis",
                  symbol: "xDAI",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc.xdaichain.com"],
                blockExplorerUrls: ["https://blockscout.com/xdai/mainnet"],
                iconUrls: [""],
              },
            ],
          });
        } catch (addError) {
          console.log("Did not add network");
        }
      }
    }
  };

  React.useEffect(() => {
    if (wallet.isConnected && wallet.status === "connected" && wallet.chainId !== +process.env.NEXT_PUBLIC_CHAIN_ID) {
      addGnosisChainNetwork();
    }
  }, [wallet.status]);

  const handleClose = () => {
    const { setOpen } = props;
    setOpen(false);
  };

  const { open } = props;

  const wallets = [
    {
      name: "Metamask",
      image: "img/metamask.png",
      onClick: () => {
        wallet.connect("provided");
        handleClose();
      },
    },
    {
      name: "Wallet Connect",
      image: "img/walletconnect.png",
      onClick: () => {
        wallet.connect("walletconnect");
        handleClose();
      },
    }
  ];
  return (
    <React.Fragment>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12}>
              <Row style={{ marginBottom: "10px" }}>
                {wallets.map((wallet) => {
                  return (
                    <Col key={wallet.name} xs="6" style={{ marginTop: "10px", marginBottom: "10px" }}>
                      <div className="d-grid gap-2">
                        <Button className="wallet-button-image" variant="warning" size="lg" onClick={wallet.onClick}>
                          {wallet.name}
                        </Button>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default WalletConnectDialog;
