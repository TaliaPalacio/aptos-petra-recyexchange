import React, { useState, useEffect } from "react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Chat from "./chat";

interface Recycling {
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
const ADDRESS =
  "0xfed39611e5ac476394ec5799b1e0ed2a577a47dcfa522ab92df24d5667bc4720";

const CardContainer = () => {
  const { account } = useWallet();
  const [recyclings, setRecyclings] = useState<Recycling[]>([]);
  const [openChatId, setOpenChatId] = useState<string | null>(null); // Cambiado para almacenar el ID del reciclaje cuyo chat está abierto
  const [loading, setLoading] = useState(true); // Estado para controlar la carga
  const [selectedRecycling, setSelectedRecycling] = useState<Recycling | null>(
    null
  );

  const handleCloseModal = () => {
    setSelectedRecycling(null);
  };

  useEffect(() => {
    if (account) {
      getRecycling();
    }
  }, [account]);

  const getRecycling = async () => {
    setLoading(true); // Activar el estado de carga
    const payload = {
      function:
        `${ADDRESS}::recicly::get_all_recyclings` as `${string}::${string}::${string}`,
      functionArguments: [`${account?.address}`],
    };
    try {
      const result: any = await aptos.view({ payload });

      if (Array.isArray(result) && result.length > 0) {
        const extractedRecyclings: Recycling[] = result.flatMap(
          (recyclingArray: any[]) =>
            recyclingArray.map((recycling: any) => ({
              owner: recycling.owner,
              type: recycling.type || "N/A",
              ubication: recycling.ubication || "N/A",
              weight: recycling.weight || 0,
              pricePound: recycling.pricePound || 0,
              observations: recycling.observations || "N/A",
              chats: recycling.chats || [],
              available: recycling.available || false,
            }))
        );

        setRecyclings(extractedRecyclings);
      } else {
        console.error("No se encontraron reciclajes");
      }
    } catch (error) {
      console.error("Error al obtener reciclajes:", error);
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  const toggleChat = (recyclingId: string) => {
    setOpenChatId(openChatId === recyclingId ? null : recyclingId); // Cambia el estado del chat para un solo reciclaje
  };

  return (
    <div className="flex justify-center flex-wrap">
      {loading ? ( // Mostrar animación de carga
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="loader"></div>{" "}
          {/* Estilo para la animación de carga */}
          <p className="mt-4 text-lg">Cargando reciclajes...</p>
        </div>
      ) : recyclings.length > 0 ? (
        recyclings.map((recycling, index) => (
          <div key={index} className="relative m-4">
            <div className="bg-blue-200 border border-gray-300 rounded-lg shadow-lg w-80 p-6 text-center transition-all duration-500 hover:border-blue-400 hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
              {imageUrls[recycling.type] && (
                <img
                  src={imageUrls[recycling.type]} // URL de la imagen basada en el tipo
                  alt={`${recycling.type} image`}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
              )}
              <h2 className="text-xl font-semibold">{recycling.type}</h2>
              <p className="text-gray-700 text-sm mb-2">
                Price: ${recycling.pricePound}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Ubication: {recycling.ubication}
              </p>
              <div className="flex justify-around mt-4">
                <button
                  onClick={() => setSelectedRecycling(recycling)} // Pasa el reciclaje al hacer clic
                  className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center space-x-1 text-sm hover:bg-blue-600 transition-colors"
                >
                  <span>👁️</span>
                  <span>See</span>
                </button>
                <button
                  onClick={() => toggleChat(recycling.ubication)} // Pasa el ID del reciclaje al hacer clic
                  className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center space-x-1 text-sm hover:bg-blue-600 transition-colors"
                >
                  <span>💬</span>
                  <span>Chat</span>
                </button>
              </div>
            </div>

            {/* Mostrar el chat si está abierto */}
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
              <strong>Price Per Pound:</strong> ${selectedRecycling.pricePound}
            </p>
            <p>
              <strong>Observations:</strong> {selectedRecycling.observations}
            </p>
            <p>
              <strong>Available:</strong>{" "}
              {selectedRecycling.available ? "Yes" : "No"}
            </p>
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✖
            </button>
            <div className="flex flex-row justify-around mt-4">
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleCloseModal}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center space-x-1 text-sm hover:bg-blue-600 transition-colors"
                >
                  Close
                </button>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleCloseModal}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center space-x-1 text-sm hover:bg-blue-600 transition-colors"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardContainer;
