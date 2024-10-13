import React from "react";
import Header from "@/components/header";
import Carousel from "@/components/carousel-shadcn";
import FormRegister from "@/components/formRegister";
import { DataTableDemo } from "@/components/table";
import { useState } from "react";
import Button from "@/components/button";

const postRecycling = () => {
  const [selectedType, setSelectedType] = useState(""); 

  return (
    
    <div>
      <Header />
      <div className="flex justify-center items-center py-10 w-full mt-4">
        <div className="w-2/5 flex justify-center pb-40">
          <Carousel setSelectedType={setSelectedType} />
        </div>
        <div className="w-2/5 flex justify-start">
          <FormRegister selectedType={selectedType}/>
        </div>
      </div>
        <div className="w-10/12 mx-auto flex justify-center items-center">
            <DataTableDemo />
        </div>
        <Button/>
    </div>
  );
};

export default postRecycling;
