import React, { useState } from "react";
import RadioGroupGlobal from "@/components/radio-group-global";
import Carousel from "@/components/carouse-shadcn";
import Header from "@/components/header";

const RegisterPage = () => {

  return (
    <div className="flex flex-col W-full items-center">
      <div className="">
        <Header />
        <Carousel/>
      </div>
      <div className="w-full flex items-center flex-col">
        <RadioGroupGlobal />
      </div>
    </div>
  );
};

export default RegisterPage;
