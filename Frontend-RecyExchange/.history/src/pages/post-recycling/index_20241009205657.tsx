import React from "react";
import Header from "@/components/header";
import Carousel from "@/components/carousel-shadcn";
import FormRegister from "@/components/formRegister";

const postRecycling = () => {
  return (
    <div>
      <Header />
        <FormRegister />
      
      <div>
        <Carousel />
      </div>
    </div>
  );
};

export default postRecycling;
