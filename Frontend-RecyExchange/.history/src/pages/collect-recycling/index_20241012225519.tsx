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
          <Card
            type="tarros"
            price={4}
            location="Calle 123"
            imageUrl="" wallet={"0x4f98a31ac13e9bfa1d1eeb2dca6aaf6f1396a75041ba9308f95e60aa61c47969"} recyclingId={"1"}          />
        </div>
        <div className="w-10/12 mx-auto flex justify-center items-center">
            <Table />
        </div>
       
      </div>
    </div>
  );
};

export default collectRecycling;
