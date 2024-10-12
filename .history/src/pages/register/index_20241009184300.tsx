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
      
    
        <RadioGroupGlobal />
        <Carousel />

        </div>
    </div>
  );
};

export default RegisterPage;
