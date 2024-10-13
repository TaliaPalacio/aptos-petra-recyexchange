import React from "react";
import Header from "@/components/header";
import Carousel from "@/components/carousel-shadcn";
import FormRegister from "@/components/formRegister";

const postRecycling = () => {
  return (
    <div>
      <Header />
      <Carousel />
        <div className="flex justify-end mt-0">
        <FormRegister />
      </div>
      
        
      
    </div>
  );
};

export default postRecycling;
