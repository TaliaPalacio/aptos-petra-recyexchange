import React from "react";
import Carousel from "@/components/carousel-shadcn";
import FormRegister from "@/components/formRegister";
import Table from "@/components/table";
import { useState } from "react";

const postRecycling = () => {
  const [selectedType, setSelectedType] = useState(""); 

  return (
    
    <div>
      <div className="flex justify-center items-center py-10 w-full mt-4">
        <div className="w-2/5 flex justify-center pb-40">
          <Carousel setSelectedType={setSelectedType} />
        </div>
        <div className="w-2/5 flex justify-start">
          <FormRegister selectedType={selectedType}/>
        </div>
      </div>
        <div className="w-10/12 mx-auto flex justify-center items-center mt-52">
            <Table />
        </div>
    </div>
  );
};

export default postRecycling;
