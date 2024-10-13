import React from "react";
import Image from "next/image";
import Header from "../../components/header";
import Card from "../../components/card";
import { DataTableDemo } from "@/components/table";
import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import axios from 'axios';

export const aptos= new Aptos(new AptosConfig({network: Network.TESTNET}));
const ADDRESS = "0x7ba23f3b116da3871b06133fda6f9ba93339b6714213f643a85d608beeaa9044"
const URL = "https://api.testnet.aptoslabs.com/v1/graphql";

const collectRecycling = () => {
  const getChat = async () =>{
    const payload = {
        function: `${ADDRESS}::recicly::get_chat`,
        functionArguments: [`${account.address}`, 4]
    }
    let result = await aptos.view({payload});
    console.log(result);
}


  return (
    <div>
      <Header />
      <div className="text-center mt-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-xl">
          🌱 Help the environment
        </h1>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-xl mt-6 flex items-center flex justify-center">
          <Image
            src="/ubication.png"
            alt="Icono de ubicación"
            width={24}
            height={24}
            className="mr-2"
          />
          Here you can choose the recyclable materials closest to your location
        </h1>

        <div className="flex justify-center items-center min-h-screen">
          <Card
            type="Cartón"
            price={0.5}
            location="Calle 123"
            imageUrl="" wallet={""} recyclingId={""}          />
        </div>
        <div className="w-10/12 mx-auto flex justify-center items-center">
            <DataTableDemo />
        </div>
       
      </div>
    </div>
  );
};

export default collectRecycling;
