import React from "react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";
import Home from "@/components/home";

const PrinPage = () => {
  return (
    <div className="w-full">
      <React.StrictMode>
        <AptosWalletAdapterProvider
          autoConnect = {true}
          optInWallets={["Petra"]}
          dappConfig={{network: Network.TESTNET}}
          onError={(error) => console.log(error)}
          plugins={[]}
        >
          <Home />
          
        </AptosWalletAdapterProvider>
      </React.StrictMode>
    </div>
  );
};

export default PrinPage;
