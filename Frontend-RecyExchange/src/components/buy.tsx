import React, { useState } from "react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

// Configuración del contrato inteligente
const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);
const CONTRACT_ADDRESS = "0x1";
const ADDRESS = "0xf6dedb75631e78abc7efaf29ded3a5c5d44f0c017168aa9155e41ee3c271cb8c";

interface BuyProps {
  recycling: {
    id: number;
    owner: string;
    type: string;
    ubication: string;
    weight: number;
    pricePound: number;
    totalPrice: number; // Se utiliza directamente de recycling
    available: boolean;
  };
  onBuySuccess: (recyclingId: number) => Promise<void>;
}


const Buy: React.FC<BuyProps> = ({ recycling, onBuySuccess }) => {
  const { signAndSubmitTransaction, account } = useWallet();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const transfer = async () => {
    if (!account) {
      console.error("No se ha conectado una cuenta");
      return;
    }
    try {
      const response = await signAndSubmitTransaction({
        sender: account?.address, // Tu wallet que firma la transacción
        data: {
          function: `${CONTRACT_ADDRESS}::aptos_account::transfer`, // Función de tu contrato inteligente
          typeArguments: [], // Si tu función usa argumentos de tipo
          functionArguments: [
            ADDRESS, // Dirección del destinatario
            recycling.totalPrice, // Monto a transferir
            //recycling.ubication, // Argumento adicional de reciclaje
          ],
        },
      });

      await aptos.waitForTransaction({ transactionHash: response.hash });
      setSuccessMessage("¡La compra y el pago se realizaron con éxito!");
      await onBuySuccess(recycling.id); // Llama a la función onBuySuccess
    } catch (error) {
      console.error("Error al realizar la transacción:", error);
    }
  };

  const closeMessage = () => {
    setSuccessMessage(null);
  };


  return (
    <div>
      <button
        onClick={transfer}
        className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center space-x-1 text-sm hover:bg-blue-600 transition-colors"
      >
        Buy
      </button>

      {successMessage && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
            <h2 className="text-xl font-bold text-center">{successMessage}</h2>
            <button
              onClick={closeMessage}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buy;
