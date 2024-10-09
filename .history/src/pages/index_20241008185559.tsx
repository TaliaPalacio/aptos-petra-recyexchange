import React from "react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";
import Home from "@/components/home";


const PrinPage = () => {
  return (
    <div className="w-full">
      <React.StrictMode>
        <AptosWalletAdapterProvider
          //si hay f5 la wallet no se quede desconectada
          autoConnect={true}
          //Aqui se colocan las wallwets que se van a usar
          optInWallets={["Petra"]}
          //Aqui se coloca la red en la que se va a trabajar, en este caso es testnet
          dappConfig={{ network: Network.TESTNET }}
          //Aqui se coloca el error que se va a mostrar si hay un error
          onError={(error) => console.log(error)}
          //Aqui si vamos a usar otro tipo de Wallets y se debe importar el paquete de esa wallet
          plugins={[]}
        >        
          <Home />
          
        </AptosWalletAdapterProvider>
      </React.StrictMode>
    </div>
  );
};

export default PrinPage;
