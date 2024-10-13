import React from "react";
import Header from "@/components/header";
import Carousel from "@/components/carousel-shadcn";
import FormRegister from "@/components/formRegister";

const postRecycling = () => {
  return (
    <div>
      <Header />
      <div className="mt-20">
      <Carousel />
      </div>
        <div className="flex mt-0">
        <FormRegister />
      </div>
      
        
      
    </div>
  );
};

export default postRecycling;
