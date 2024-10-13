import React, { useState } from 'react';
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet } from '@aptos-labs/wallet-adapter-react';

export const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));
const ADDRESS = "0xfed39611e5ac476394ec5799b1e0ed2a577a47dcfa522ab92df24d5667bc4720";

type Recycling = {
    owner: string;
    type: string;
    ubication: string;
    weight: string;
    pricePound: string;
    observations: string;
    available: boolean;
};

const Index = () => {
    const { account } = useWallet();
    const [recyclings, setRecyclings] = useState<Recycling[]>([]);

    const getRecycling = async () => {
        const payload = {
            function: `${ADDRESS}::recicly::get_all_recyclings` as `${string}::${string}::${string}`,
            functionArguments: [`${account?.address}`]
        };
        try {
            const result = await aptos.view({ payload });

            // Asegurarse de que result es un array de arrays y tiene datos
            if (Array.isArray(result) && result.length > 0) {
                const extractedRecyclings = result.map((recyclingArray: any) => {
                    // Verificar que recyclingArray es un array y tiene al menos un elemento
                    const recycling = Array.isArray(recyclingArray) && recyclingArray.length > 0 ? recyclingArray[0] : [];
                    return {
                        owner: recycling[0]?.toString() || 'N/A',                // address
                        type: recycling[1]?.toString() || 'N/A',                 // String
                        ubication: recycling[2]?.toString() || 'N/A',             // String
                        weight: recycling[3] !== undefined ? recycling[3].toString() : 'N/A', // u64
                        pricePound: recycling[4] !== undefined ? recycling[4].toString() : 'N/A', // u64
                        observations: recycling[5]?.toString() || 'N/A',          // String
                        available: recycling[6] || false                          // bool
                    };
                });

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
                <table style={{ marginTop: '20px', borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Owner</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Type</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Ubicación</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Peso</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Precio por libra</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Observaciones</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Disponible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recyclings.map((recycling, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{recycling.owner}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{recycling.type}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{recycling.ubication}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{recycling.weight}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{recycling.pricePound}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{recycling.observations}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{recycling.available ? 'Sí' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Index;
