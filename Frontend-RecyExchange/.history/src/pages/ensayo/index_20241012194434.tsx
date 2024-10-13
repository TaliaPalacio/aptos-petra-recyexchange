import React, { useState } from 'react';
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet } from '@aptos-labs/wallet-adapter-react';

export const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));
const ADDRESS = "0xfed39611e5ac476394ec5799b1e0ed2a577a47dcfa522ab92df24d5667bc4720";

const Index = () => {
    const { account } = useWallet();
    interface Recycling {
        owner: string;
        type: string;
        ubication: string;
        weight: string;
        pricePound: string;
        observations: string;
        available: boolean;
    }

    const [recyclings, setRecyclings] = useState<Recycling[]>([]);

    const getRecycling = async () => {
        const payload = {
            function: `${ADDRESS}::recicly::get_all_recyclings` as `${string}::${string}::${string}`,
            functionArguments: [`${account?.address}`]
        };
        try {
            const result = await aptos.view({ payload });

            // Extraer datos del array de arrays
            const extractedRecyclings = result.map(recyclingArray => {
                if (!Array.isArray(recyclingArray) || recyclingArray.length === 0) {
                    throw new Error("Invalid recycling data");
                }
                const recycling = recyclingArray[0] as [string, string, string, number, number, string, boolean]; // acceder al primer elemento del array
                return {
                    owner: recycling[0],               // address
                    type: recycling[1],                // String
                    ubication: recycling[2],            // String
                    weight: recycling[3].toString(),    // u64, convertir a string si es necesario
                    pricePound: recycling[4].toString(), // u64, convertir a string si es necesario
                    observations: recycling[5],         // String
                    available: recycling[6]             // bool
                };
            });

            setRecyclings(extractedRecyclings);
            console.log(extractedRecyclings);
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
                            <th>Ubicación</th>
                            <th>Peso</th>
                            <th>Precio por libra</th>
                            <th>Observaciones</th>
                            <th>Disponible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recyclings.map((recycling, index) => (
                            <tr key={index}>
                                <td>{recycling.owner}</td>
                                <td>{recycling.type}</td>
                                <td>{recycling.ubication}</td>
                                <td>{recycling.weight}</td>
                                <td>{recycling.pricePound}</td>
                                <td>{recycling.observations}</td>
                                <td>{recycling.available ? 'Sí' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Index;
