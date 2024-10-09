import React from "react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet, WalletName } from "@aptos-labs/wallet-adapter-react";
import { useWalletContext } from "./walletContext";

export const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));

const Button = () => {
  const { connect, connected, disconnect } = useWallet();
  const { setConnected } = useWalletContext(); // Usa el contexto

  const conexionWallet = async () => {
    if (connected) {
      await disconnect();
      setConnected(false); // Actualiza el contexto
    } else {
      await connect("Petra" as WalletName);
      setConnected(true); // Actualiza el contexto
    }
  };

  return (
    <div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <button
          onClick={conexionWallet}
          className="color-primary w-40 h-11 text-white font-bold text-base rounded-full 
          shadow-xl hover:opacity-70 transition ease-in-out hover:-translate-y-1 hover:scale-110 
          duration-300"
        >
          {connected ? "Disconect" : "Conect"}
        </button>
      </div>
    </div>
  );
};

export default Button;
