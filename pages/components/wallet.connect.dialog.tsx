import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useWallet } from "use-wallet";

interface DialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const WalletConnectDialog = (props: DialogProps) => {
  const wallet = useWallet();

  React.useEffect(() => {
    console.log(wallet);
  }, [wallet]);

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
    },
    {
      name: "Binance Wallet",
      image: "img/bsc.png",
      onClick: () => {
        wallet.connect("bsc");
        handleClose();
      },
    },
    {
      name: "Torus",
      image: "img/torus.png",
      onClick: () => {
        wallet.connect("torus");
        handleClose();
      },
    },
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
                    <Col
                      xs="6"
                      style={{ marginTop: "10px", marginBottom: "10px" }}
                    >
                      <div className="d-grid gap-2">
                        <Button
                          className="wallet-button-image"
                          variant="warning"
                          size="lg"
                          onClick={wallet.onClick}
                        >
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
