import React from 'react'
import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";
import { useEffect, useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import axios from 'axios';
import Header from '@/components/header';

export const aptos= new Aptos(new AptosConfig({network: Network.TESTNET}));
const ADDRESS = "0xfed39611e5ac476394ec5799b1e0ed2a577a47dcfa522ab92df24d5667bc4720"

const index = () => {
    const {connect, account, connected, disconnect, signAndSubmitTransaction,
    signTransaction, signMessage, 
        signMessageAndVerify} = useWallet();

    const getRecycling = async () =>{
        const payload = {
            function: `${ADDRESS}::recicly::get_all_recyclings` as `${string}::${string}::${string}`,
            functionArguments: [`${account?.address}`]
        }
        let result = await aptos.view({payload});
        console.log(result);
    }
  
  return (
    <div>
        <Header />
        <button onClick={getRecycling}>Obtener todos los reciclajes</button>
    </div>
  )
}

export default index