import React from "react";
import Image from "next/image";
import ButtonCreateWallet from "./buttonCreateWallet";
import Carousel from "./carousel";
import Header from "./header";
import Button from "./button";
import { useState } from "react";
import { useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";

export const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));
const Home = () => {
  const [isAccountInitialized, setIsAccountInitialized] = useState(false);
  const { signAndSubmitTransaction, account } = useWallet();

  const walletAddress =
    "0x4f98a31ac13e9bfa1d1eeb2dca6aaf6f1396a75041ba9308f95e60aa61c47969";
  const CONTRACT_ADDRESS =
    "0xfed39611e5ac476394ec5799b1e0ed2a577a47dcfa522ab92df24d5667bc4720";

  const initializeAccount = async () => {
    console.log(walletAddress);
    console.log("entro a la funcion");

    const response = await signAndSubmitTransaction({
      sender: walletAddress,
      data: {
        function: `${CONTRACT_ADDRESS}::recicly::inicializar`,
        typeArguments: [],
        functionArguments: [],
      },
    });
    try {
      await aptos.waitForTransaction({ transactionHash: response.hash });
      console.log("Cuenta inicializada con éxito.");
      setIsAccountInitialized(true); // Actualizar el estado para habilitar el registro de reciclaje
    } catch (error) {
      console.log("Error al inicializar la cuenta.");
    }
  };
  return (
    <div className="bg-white w-full">
      <div className="flex flex-row w-full">
        <Header />
        <div className="w-2/12 flex justify-end pr-10">
          <Button />
        </div>
      </div>
      <div>
        <Carousel />
      </div>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="text-center"></div>
            <div className="opacity-50 pb-10">
              <Image
                className="rounded-xl"
                src="/Logo_RecyExchange.jpg"
                alt="Logo"
                width={200}
                height={200}
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Transformando el Reciclaje en Medellín
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Conectate con recicladores independientes y crea un impacto
              positivo en tu comunidad.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <ButtonCreateWallet />
            </div>

            <div className="mt-5">
              <button
                onClick={initializeAccount}
                className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-transform transform hover:scale-105 duration-300"
              >
                Inicializar cuenta
              </button>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
