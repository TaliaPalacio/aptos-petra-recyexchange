import React, { useState, useEffect } from "react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

interface Recycling {
  type: string;
  ubication: string;
  weight: number;
  pricePound: number;
  observations: string;
  chats: [];
  available: boolean;
}

export const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));
const ADDRESS = "0xfed39611e5ac476394ec5799b1e0ed2a577a47dcfa522ab92df24d5667bc4720";

const Table = () => {
  const { account } = useWallet();
  const [recyclings, setRecyclings] = useState<Recycling[][]>([]);
  const [selectedRecycling, setSelectedRecycling] = useState<Recycling | null>(null);

  useEffect(() => {
    if (account) {
      getRecycling();
    }
  }, [account]);

  const getRecycling = async () => {
    const payload = {
      function:
        `${ADDRESS}::recicly::get_all_recyclings` as `${string}::${string}::${string}`,
      functionArguments: [`${account?.address}`],
    };
    try {
      const result: any = await aptos.view({ payload });
      console.log("Resultado de reciclajes:", result[0]);

      if (Array.isArray(result) && result.length > 0) {
        const extractedRecyclings: Recycling[][] = result.map(
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
    }
  };

  const handleRowClick = (recycling: Recycling) => {
    setSelectedRecycling(recycling);
  };

  const handleCloseModal = () => {
    setSelectedRecycling(null);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl">
        {recyclings.length > 0 && (
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Ubication</th>
                <th className="px-4 py-2 border">Weight</th>
                <th className="px-4 py-2 border">Price Per Pound</th>
                <th className="px-4 py-2 border">Observations</th>
                <th className="px-4 py-2 border">Available</th>
              </tr>
            </thead>
            <tbody>
              {recyclings.flatMap((recyclingArray, index) =>
                recyclingArray.map((recycling, subIndex) => (
                  <tr 
                    key={`${index}-${subIndex}`} 
                    onClick={() => handleRowClick(recycling)} 
                    className="hover:bg-blue-200 cursor-pointer transition-colors duration-200"
                  >
                    <td className="px-4 py-2 border">{recycling.type}</td>
                    <td className="px-4 py-2 border">{recycling.ubication}</td>
                    <td className="px-4 py-2 border">{recycling.weight}</td>
                    <td className="px-4 py-2 border">{recycling.pricePound}</td>
                    <td className="px-4 py-2 border">{recycling.observations}</td>
                    <td className="px-4 py-2 border">{recycling.available ? "Sí" : "No"}</td>
                  </tr>
                ))
              )}
              {recyclings.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center">No hay reciclajes disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
        
        {selectedRecycling && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl mb-4">Recycling Overview</h2>
              <p><strong>Type:</strong> {selectedRecycling.type}</p>
              <p><strong>Ubication:</strong> {selectedRecycling.ubication}</p>
              <p><strong>Weight:</strong> {selectedRecycling.weight}</p>
              <p><strong>Price Per Pound:</strong> {selectedRecycling.pricePound}</p>
              <p><strong>Observations:</strong> {selectedRecycling.observations}</p>
              <p><strong>Available:</strong> {selectedRecycling.available ? "Sí" : "No"}</p>
              <button onClick={handleCloseModal} className="mt-4 px-4 py-2block w-full rounded-md text-center bg-orange-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-transform transform hover:scale-105 duration-300">Close</button>
              <button onClick={handleCloseModal} className="mt-4 px-4 py-2 block w-full rounded-md text-center bg-orange-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-transform transform hover:scale-105 duration-300">See Chat</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
