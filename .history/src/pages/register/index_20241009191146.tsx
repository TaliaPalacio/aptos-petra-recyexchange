import React from "react";
import RadioGroupGlobal from "@/components/radio-group-global";
import Header from "@/components/header";

const RegisterPage = () => {
  return (
    <div className="flex flex-col w-full items-center">
       <div className="w-full ml-10">
        <Header />
      </div>
      <div className="w-full flex justify-center mt-20">
        <div className="w-1/3 ml-96">
          <RadioGroupGlobal />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;


