import React, { useState, useEffect } from "react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Chat from "./chat";
import ADDRESS from "@/utils/data";
import Buy from "./buy";

interface Recycling {
  id: number;
  owner: string;
  type: string;
  ubication: string;
  weight: number;
  pricePound: number;
  observations: string;
  chats: [];
  available: boolean;
}

const imageUrls: Record<string, string> = {
  Metals: "/metals.jpeg",
  Plastics: "/plastic.jpeg",
  Cardboard: "/cardboard.jpeg",
  Glasses: "/glass.jpeg",
};
export const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));

const CardContainer = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  const [recyclings, setRecyclings] = useState<Recycling[]>([]);
  const [openChatId, setOpenChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRecycling, setSelectedRecycling] = useState<Recycling | null>(null);

  const handleCloseModal = () => {
    setSelectedRecycling(null);
  };

  useEffect(() => {
    if (account) {
      getRecycling();
    }
  }, [account]);

  const getRecycling = async () => {
    setLoading(true);
    const walletAddresses = [
      account?.address,
      "0xf6dedb75631e78abc7efaf29ded3a5c5d44f0c017168aa9155e41ee3c271cb8c",
      "0x4f98a31ac13e9bfa1d1eeb2dca6aaf6f1396a75041ba9308f95e60aa61c47969"
    ]; // Direcciones de wallet

    try {
      const allRecyclings = await Promise.all(
        walletAddresses.map(async (address) => {
          const payload = {
            function:
              `${ADDRESS}::recicly::get_all_recyclings` as `${string}::${string}::${string}`,
            functionArguments: [address],
          };

          const result: any = await aptos.view({ payload });
          return Array.isArray(result)
            ? result.flatMap((recyclingArray: any[]) =>
                recyclingArray.map((recycling: any) => ({
                  id: recycling.id,
                  owner: recycling.owner,
                  type: recycling.type || "N/A",
                  ubication: recycling.ubication || "N/A",
                  weight: recycling.weight || 0,
                  pricePound: recycling.pricePound || 0,
                  totalPrice: (recycling.weight || 0) * (recycling.pricePound || 0), // Agregado aquí
                  observations: recycling.observations || "N/A",
                  chats: recycling.chats || [],
                  available: recycling.available || false,
                }))
              )
            : [];
        })
      );

      const combinedRecyclings = allRecyclings.flat();
      if (combinedRecyclings.length > 0) {
        setRecyclings(combinedRecyclings);
      } else {
        console.error("No se encontraron reciclajes");
      }
    } catch (error) {
      console.error("Error al obtener reciclajes:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleChat = (recyclingId: string) => {
    setOpenChatId(openChatId === recyclingId ? null : recyclingId);
  };

  const handleBuySuccess = async () => {
    try {
      // Realiza la transacción
      const response = await signAndSubmitTransaction({
        sender: selectedRecycling?.owner,
        data: {
          function: `${ADDRESS}::recicly::change_available`,
          typeArguments: [],
          functionArguments: [selectedRecycling?.owner, selectedRecycling?.id],
        },
      });

      await aptos.waitForTransaction({ transactionHash: response.hash });
      

      // Marca el reciclaje como no disponible y actualiza el estado
     setRecyclings((prevRecyclings) =>
        prevRecyclings.map((r) =>
          r.id === selectedRecycling?.id ? { ...r, available: false } : r
        )
      );
      setSelectedRecycling(null); // Cierra el modal después de la compra
    } catch (error) {
      console.error("Error en la transacción:", error);
    }
  };

  return (
    <div className="flex justify-center flex-wrap">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="loader"></div>
          <p className="mt-4 text-lg">Loading recyclings...</p>
        </div>
      ) : recyclings.length > 0 ? (
        recyclings
          .filter((recycling) => recycling.available)
          .map((recycling, index) => (
            <div key={index} className="relative m-4">
              <div className="bg-blue-200 border border-gray-300 rounded-lg shadow-lg w-80 p-6 text-center transition-all duration-500 hover:border-blue-400 hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
                {imageUrls[recycling.type] && (
                  <img
                    src={imageUrls[recycling.type]}
                    alt={`${recycling.type} image`}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                )}
                <h2 className="text-xl font-semibold">{recycling.type}</h2>
                <p className="text-gray-700 text-sm mb-2">
                  Price per pound: {recycling.pricePound}octa
                </p>
                <p className="text-gray-700 text-sm mb-2">
                  Total Price: {recycling.weight * recycling.pricePound}octa
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  Ubication: {recycling.ubication}
                </p>
                <div className="flex justify-around mt-4">
                  <button
                    onClick={() => setSelectedRecycling(recycling)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center space-x-1 text-sm hover:bg-blue-600 transition-colors"
                  >
                    <span>👁️</span>
                    <span>See</span>
                  </button>
                  <button
                    onClick={() => toggleChat(recycling.ubication)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center space-x-1 text-sm hover:bg-blue-600 transition-colors"
                  >
                    <span>💬</span>
                    <span>Chat</span>
                  </button>
                </div>
              </div>

              {openChatId === recycling.ubication && (
                <Chat
                  recyclingId={recycling.ubication}
                  onClose={() => toggleChat(recycling.ubication)}
                />
              )}
            </div>
          ))
      ) : (
        <p className="text-center">No hay reciclajes disponibles</p>
      )}

      {selectedRecycling && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {selectedRecycling.type}
            </h2>
            <p>
              <strong>Ubication:</strong> {selectedRecycling.ubication}
            </p>
            <p>
              <strong>Weight:</strong> {selectedRecycling.weight} kg
            </p>
            <p>
              <strong>Price Per Pound:</strong> {selectedRecycling.pricePound}octa
            </p>
            <p>
              <strong>Observations:</strong> {selectedRecycling.observations}
            </p>
            <p>
              <strong>Available:</strong>{" "}
              {selectedRecycling.available ? "Yes" : "No"}
            </p>
            <p>
              <strong>
                Total Price: 
                {selectedRecycling.weight * selectedRecycling.pricePound}octa
              </strong>
            </p>
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✖
            </button>
            <div className="flex flex-row justify-around mt-4">
              <div className="w-36">
                <Buy
                  recycling={{
                    ...selectedRecycling,
                    totalPrice: selectedRecycling.weight * selectedRecycling.pricePound, // Calcula el precio total
                  }}
                  onBuySuccess={handleBuySuccess} // Función de éxito para manejar la compra
                />
              </div>
              <button
                onClick={handleCloseModal}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardContainer;
