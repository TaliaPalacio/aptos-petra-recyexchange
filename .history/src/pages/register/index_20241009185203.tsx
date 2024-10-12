import React from "react";
import RadioGroupGlobal from "@/components/radio-group-global";
import Header from "@/components/header";

const RegisterPage = () => {

  return (
    <div className="flex flex-col items-center">
      <div>
        <Header />
      </div>
      <div className="w-full flex justify-center items-start mt-20">
        <RadioGroupGlobal />
      </div>
    </div>
  );
};

export default RegisterPage;
