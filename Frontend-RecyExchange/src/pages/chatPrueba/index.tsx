import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";
import { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import axios from "axios";

export const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));
const ADDRESS =
  "0xfed39611e5ac476394ec5799b1e0ed2a577a47dcfa522ab92df24d5667bc4720";
const URL = "https://api.testnet.aptoslabs.com/v1/graphql";

const chatPrueba = () => {
  const {
    connect,
    account,
    connected,
    disconnect,
    signAndSubmitTransaction,
    signTransaction,
    signMessage,
    signMessageAndVerify,
  } = useWallet();

  const getChat = async () => {
    const payload = {
      function:
        `${ADDRESS}::recicly::get_chat` as `${string}::${string}::${string}`,
      functionArguments: [`${account?.address}`, 1],
    };
    let result = await aptos.view({ payload });
    console.log(result);
  };

  const queryIndexer = async (contractAddress: string) => {
    try {
      const response = await axios.post(URL, {
        query: `
                        query GetAccountTransactionsData($contractAddress: String! $limit: Int) {
                            account_transactions(
                                where: { account_address: { _eq: $contractAddress } }
                                order_by: { transaction_version: desc }
                                limit: $limit
                            ) {
                                account_address
                                user_transaction {
                                    __typename
                                    block_height
                                    entry_function_id_str
                                    epoch
                                    expiration_timestamp_secs
                                    gas_unit_price
                                    max_gas_amount
                                    parent_signature_type
                                    sender
                                    sequence_number
                                    timestamp
                                    version
                                }
                                transaction_version
                            }
                        }
                    `,
        variables: {
          contractAddress: contractAddress,
        },
      });

      console.log(response.data);
    } catch (error) {
      const err = error as any;
      console.error("Error:", err.response?.data?.errors || err.message);
    }
  };

  return (
    <div>
      <button onClick={getChat}>Obtener chat</button>
      <button
        onClick={() =>
          queryIndexer(
            "0x7ba23f3b116da3871b06133fda6f9ba93339b6714213f643a85d608beeaa9044"
          )
        }
      >
        Consultar Bloque
      </button>
    </div>
  );
};

export default chatPrueba;
