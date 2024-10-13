import React from "react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";


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
      
          <>  </>
        </AptosWalletAdapterProvider>
      </React.StrictMode>
    </div>
  );
};

export default PrinPage;
