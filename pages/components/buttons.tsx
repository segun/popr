import Link from "next/link";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useWallet } from "use-wallet";
import { config } from "../../utils/config";
import WalletConnectDialog from "../github/modals/wallet.connect.dialog";

const Buttons = () => {
  const wallet = useWallet();
  const [open, setOpen] = useState(false);

  const state = Math.random() * Number.MAX_SAFE_INTEGER;
  const authUrl = config.AUTHORIZE_URL;
  const redirectUrl = config.REDIRECT_URL;
  const clientId = config.CLIENT_ID;
  const url = `${authUrl}?client_id=${clientId}&state=${state}&redirect_uri=${redirectUrl}`;

  const connectWallet = () => {
    wallet?.reset();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container className="p-3">
      <Link href={url} passHref={true}>
        <Button size="lg" variant="primary">
          Get Repositories
        </Button>
      </Link>
      <Button
        style={{ marginLeft: "15px" }}
        variant="secondary"
        size="lg"
        color="secondary"
        onClick={() => connectWallet()}
      >
        {wallet.isConnected() ? wallet.account : "Connect Wallet"}
      </Button>
      <WalletConnectDialog open={open} setOpen={setOpen}/>
    </Container>
  );
};

export default Buttons;
