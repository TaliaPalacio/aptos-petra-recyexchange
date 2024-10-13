import React, { useState } from "react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Address } from "cluster";

interface Recycling {
  owner: Address;
  type: string;
  ubication: string;
  weight: number;
  pricePound: number;
  observations: string;
  chats: [];
  available: boolean;
}

export const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));
const ADDRESS =
  "0xfed39611e5ac476394ec5799b1e0ed2a577a47dcfa522ab92df24d5667bc4720";

const Index = () => {
  const { account } = useWallet();
  const [recyclings, setRecyclings] = useState<Recycling[][]>([]);

  const getRecycling = async () => {
    const payload = {
      function:
        `${ADDRESS}::recicly::get_all_recyclings` as `${string}::${string}::${string}`,
      functionArguments: [`${account?.address}`],
    };
    try {
      const result: any = await aptos.view({ payload });
      console.log("Resultado de reciclajes:", result);

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

  return (
    <div>
      <button onClick={getRecycling}>Obtener todos los reciclajes</button>
      {recyclings.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Owner</th>
              <th>Type</th>
              <th>Ubication</th>
              <th>Weight</th>
              <th>Price per Pound</th>
              <th>Observations</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {recyclings.length > 0 ? (
              recyclings.flatMap((recyclingArray, index) =>
                recyclingArray.map((recycling, subIndex) => (
                  <tr key={`${index}-${subIndex}`}>
                    <td>{recycling.owner.toString()}</td>
                    <td>{recycling.type}</td>
                    <td>{recycling.ubication}</td>
                    <td>{recycling.weight}</td>
                    <td>{recycling.pricePound}</td>
                    <td>{recycling.observations}</td>
                    <td>{recycling.available ? "Sí" : "No"}</td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td colSpan={7}>No hay reciclajes disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Index;
