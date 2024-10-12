import React from "react";
import Image from "next/image";
import Header from "../../components/header";
import Card from "../../components/card";
import { DataTableDemo } from "@/components/table";

const collectRecycling = () => {

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
