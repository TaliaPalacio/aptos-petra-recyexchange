import React from "react";
import Image from "next/image";
import Card from "../../components/card";
import TableBuy from "@/components/tableBuy";

const collectRecycling = () => {

  return (
    <div>
      <div className="text-center mt-6">
      <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
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
          <Card/>
        </div>
        {/* Separator Line */}
      <div className="my-12 w-full flex justify-center pt-24 mt-7">
        <hr className="w-[80%] border-t-4 border-gray-500 shadow-md rounded-full opacity-50" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 flex justify-center transition-colors hover:text-violet-600 transform hover:translate-x-2">
        Purchase History
      </h2>
        <div className="w-full mx-auto flex justify-center items-center mt-36 pb-20">
            <TableBuy />
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

export default collectRecycling;
