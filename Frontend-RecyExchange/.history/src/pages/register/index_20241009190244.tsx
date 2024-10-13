import React from "react";
import RadioGroupGlobal from "@/components/radio-group-global";
import Header from "@/components/header";

const RegisterPage = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <div>
        <Header />
      </div>
      <div className="w-full flex items-center flex-col mt-20 ml-10">
        <RadioGroupGlobal />
      </div>
    </div>
  );
};

export default RegisterPage;

