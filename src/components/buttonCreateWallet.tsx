    import React from "react";
    import { Aptos, AptosConfig, Network} from "@aptos-labs/ts-sdk";
    
    
    export const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));
    
    const buttonCreateWallet = () => {
        const redirectWallet = () => {
            const url = "https://chromewebstore.google.com/detail/petra-aptos-wallet/ejjladinnckdgjemekebdpeokbikhfci";
            //abre la URL en una nueva pestaña
            window.open(url, "_blank");
        };
    
      return (
        <div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button
              onClick={redirectWallet}
              className="color-primary w-40 h-11 text-white font-bold text-base rounded-full 
              shadow-xl hover:opacity-70 transition ease-in-out hover:-translate-y-1 hover:scale-110 
              duration-300"
            >
                Create Wallet
            </button>        
          </div>
        </div>
      );
    };
    
    export default buttonCreateWallet;
