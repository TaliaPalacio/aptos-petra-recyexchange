import React from "react";
import Header from "@/components/header";
import Carousel from "@/components/carousel-shadcn";
import FormRegister from "@/components/formRegister";

const postRecycling = () => {
  return (
    <div>
      <Header />
      <div>
        <FormRegister />
      </div>
      <div className="m-10">
        <Carousel />
      </div>
    </div>
  );
};

export default postRecycling;
