import React from "react";
import RadioGroupGlobal from "@/components/radio-group-global";
import Header from "@/components/header";

const RegisterPage = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <div>
        <Header />
      </div>
      <div className="w-full flex justify-end mt-20">
        <div className="w-1/3 w-2/3 ml-10">
          <RadioGroupGlobal />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;


