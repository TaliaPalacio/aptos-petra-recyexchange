import React from "react";
import RadioGroupGlobal from "@/components/radio-group-global";

const RegisterPage = () => {
  return (
    <div className="flex flex-col w-full items-center  h-screen  ">
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-5" style={{ backgroundImage: "url('/tree.jpg')" }}/>  
      <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ffb3d1] to-[#b0a6f0] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
      <div className="w-full flex justify-center mt-10 items-center"> 
      <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
        <div className="w-1/3">
          <RadioGroupGlobal />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
