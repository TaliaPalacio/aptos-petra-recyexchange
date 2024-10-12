import React from "react";
import Image from "next/image";
import ButtonCreateWallet from "./buttonCreateWallet";
import Carousel from "./carousel";

const Home = () => {

  return (
    <div className="bg-white w-full">
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
