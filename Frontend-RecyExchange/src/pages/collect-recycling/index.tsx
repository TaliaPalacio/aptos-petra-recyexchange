import React from "react";
import Image from "next/image";
import Card from "../../components/card";
import Table from "@/components/table";

const collectRecycling = () => {

  return (
    <div>
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
          <Card/>
        </div>
        <div className="w-10/12 mx-auto flex justify-center items-center mt-20 py-40">
            <Table />
        </div>
       
      </div>
    </div>
  );
};

export default collectRecycling;
