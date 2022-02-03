// import App from "next/app";
import { BscConnector } from "@binance-chain/bsc-connector";
import type { AppProps /*, AppContext */ } from "next/app";
import { UseWalletProvider } from "use-wallet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { config } from "../utils/config";

function MyApp({ Component, pageProps }: AppProps) {
  const CHAIN_ID = +config.CHAIN_ID;  
  const RPC_URL = config.RPC_URL;
  const WALLET_CONNECT_BRIDGE = config.WALLET_CONNECT_BRIDGE;
  const WALLET_CONNECT_POLL_INTERVAL =
    config.WALLET_CONNECT_POLL_INTERVAL;

  return (
    <UseWalletProvider
      autoConnect
      connectors={{
        injected: {
          chainId: [CHAIN_ID],
        },
        walletconnect: {
          rpc: {
            [CHAIN_ID]: RPC_URL,
          },
          bridge: WALLET_CONNECT_BRIDGE,
          pollingInterval: WALLET_CONNECT_POLL_INTERVAL,
        },
        bsc: {
          web3ReactConnector() {
            return new BscConnector({ supportedChainIds: [CHAIN_ID] });
          },
          handleActivationError(err) {
            return err;
          },
        },
        torus: {
          web3ReactConnector() {
            return {
              chainId: CHAIN_ID,
              initOptions: {
                network: {
                  host: RPC_URL,
                },
                useLocalStorage: true,
                skipTKey: true,
              },
            };
          },
        },
      }}
    >
      <Component {...pageProps} />            
      <ToastContainer />
    </UseWalletProvider>
  );
}

export default MyApp;
