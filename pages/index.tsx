import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Buttons from "./components/buttons";
import { resetAPIDB } from "../utils/db/skynet-db/skynetdb";

export default function Home() {
  
  // resetAPIDB();
  return (
    <div className="container">      
      <Head>
        <title>Proof of Pull Request</title>
      </Head>      
      <Buttons />
      
    </div>
  );
}
