import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { WalletProvider } from "@/components/walletContext";
import { Network } from "@aptos-labs/ts-sdk";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <AptosWalletAdapterProvider
        autoConnect={true}
        optInWallets={["Petra"]}
        dappConfig={{ network: Network.TESTNET }}
        onError={(error) => console.log(error)}
        plugins={[]}
      >
        <WalletProvider>
        {/* Aquí renderizas la página actual */}
        <Component {...pageProps} />
        </WalletProvider>

      </AptosWalletAdapterProvider>
    </React.StrictMode>
  );
}
