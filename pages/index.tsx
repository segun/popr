import Head from "next/head";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

export default function Home() {
  const state = Math.random() * Number.MAX_SAFE_INTEGER;

  const authUrl = process.env.NEXT_PUBLIC_API_AUTHORIZE_URL;
  const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL;
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${authUrl}?client_id=${clientId}&state=${state}&redirect_uri=${redirectUrl}`;

  return (
    <div className="container">
      <Head>
        <title>Proof of Pull Request</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="p-3">
        <Link
          href={url}
        >
          <Button variant="primary">Connect Github</Button>
        </Link>
      </Container>
    </div>
  );
}
