import React from "react";
import Image from "next/image";
import Header from "../../components/header";
import Card from "../../components/card";

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

        <div className="mt-10 flex items-center justify-center gap-x-6"></div>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card
        name="Jane Cooper"
        role="Paradigm Representative"
        isAdmin={true}
        imageUrl="https://via.placeholder.com/100"
      />
    </div>
      </div>
    </div>
  );
};

export default collectRecycling;
