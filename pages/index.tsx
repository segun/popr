import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Buttons from "./components/buttons";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Proof of Pull Request</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Buttons />
    </div>
  );
}
