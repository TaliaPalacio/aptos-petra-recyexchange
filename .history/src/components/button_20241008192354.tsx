import React from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletName } from "@aptos-labs/wallet-adapter-react";
import { useWalletContext } from "./walletContext";

const Button = () => {
  const { connect, connected, disconnect} = useWallet();  // Asegúrate de obtener correctamente el estado de la wallet
  const { setConnected } = useWalletContext();  // Usa el contexto si es necesario para manejar el estado global

  const conexionWallet = async () => {
 
    try {
      if (connected) {
        await disconnect();  // Desconectar la wallet si ya está conectada
        setConnected(false);  // Actualiza el estado global si es necesario
      } else {
        await connect("Petra" as WalletName);  // Conectar a la wallet Petra
        //setConnected(true);  // Actualiza el estado global si es necesario
      }

      
    } catch (error) {
      console.error("Error al conectar o desconectar la wallet:", error);
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
          {connected ? "Disconnect" : "Connect"}
        </button>
      </div>
    </div>
  );
};

export default Button;
