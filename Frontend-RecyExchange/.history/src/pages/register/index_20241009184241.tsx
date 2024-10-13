import React, { useState } from "react";
import RadioGroupGlobal from "@/components/radio-group-global";
import Carousel from "@/components/carouse-shadcn";
import Header from "@/components/header";

const RegisterPage = () => {
  const options = [
    { id: "check-recycling", label: "Check Available Recycling", description: "This option allows you to check which recycling is available for collection in your area. Remember that you can communicate with the client through the integrated chat.." },
    { id: "post-recycling", label: "Post Recycling", description: "This option allows you to post your recycling for pickup. If you have questions about what you can recycle, you can enter here.." },
  ];

  const [selectedDescription, setSelectedDescription] = useState<string>("");

  const handleRadioChange = (description: string) => {
    setSelectedDescription(description);
  };


  return (

    <div className="flex flex-col W-full items-center">
      <div className="">
        <Header />
      </div>
      <div className="w-full flex items-center flex-col">
      
      {/* Cuadro de descripción fuera del formulario */}
      <div className="mt-8 w-full max-w-lg bg-white border border-blue-500 p-4 rounded-lg shadow-md transition-opacity duration-300">
        <h3 className="text-lg font-semibold leading-6 text-gray-900">
          
          Description of each option
        </h3>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          {selectedDescription || "Select an option to see the description here."}
        </p>
      </div>
        <RadioGroupGlobal />
        <Carousel />

        </div>
    </div>
  );
};

export default RegisterPage;
