// import App from "next/app";
import { BscConnector } from "@binance-chain/bsc-connector";
import type { AppProps /*, AppContext */ } from "next/app";
import { UseWalletProvider } from "use-wallet";
import {
  CHAIN_ID,
  RPC_URL,
  WALLET_CONNECT_BRIDGE,
  WALLET_CONNECT_POLL_INTERVAL,
} from "../utils/environment.test";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UseWalletProvider
      autoConnect
      connectors={{
        injected: {
          //allows you to connect and switch between mainnet and rinkeby within Metamask.
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
    </UseWalletProvider>
  );
}

export default MyApp;
