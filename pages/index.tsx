import Head from "next/head";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

export default function Home() {
  const state = Math.random() * Number.MAX_SAFE_INTEGER;

  return (
    <div className="container">
      <Head>
        <title>Proof of Pull Request</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="p-3">
        <Link
          href={`https://github.com/login/oauth/authorize?client_id=Iv1.967aea4cd2c26675&state=${state}&redirect_uri=http://localhost:3000/github`}
        >
          <Button variant="primary">Connect Github</Button>
        </Link>
      </Container>
    </div>
  );
}
