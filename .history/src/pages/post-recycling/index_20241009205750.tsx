import React from "react";
import Header from "@/components/header";
import Carousel from "@/components/carousel-shadcn";
import FormRegister from "@/components/formRegister";

const postRecycling = () => {
  return (
    <div>
      <Header />
        <div className="flex justify-center mt-0">
        <FormRegister />
      </div>
      
        <Carousel />
      
    </div>
  );
};

export default postRecycling;
