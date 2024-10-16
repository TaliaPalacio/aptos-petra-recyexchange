import React from "react";
import Carousel from "@/components/carousel-shadcn";
import FormRegister from "@/components/formRegister";
import Table from "@/components/table";
import { useState } from "react";

const postRecycling = () => {
  const [selectedType, setSelectedType] = useState("");

  return (
    <div>
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
      <div className="flex justify-center items-center py-10 w-full mt-4">
        <div className="w-2/5 flex justify-center pb-40">
          <Carousel setSelectedType={setSelectedType} />
        </div>
        <div className="w-2/5 flex justify-start">
          <FormRegister selectedType={selectedType} />
        </div>
      </div>
      {/* Separator Line */}
      <div className="my-12 w-full flex justify-center pt-24 mt-7">
        <hr className="w-[80%] border-t-4 border-gray-500 shadow-md rounded-full opacity-50" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 flex justify-center transition-colors hover:text-violet-600 transform hover:translate-x-2">
        Publication History
      </h2>

      <div className="w-full mx-auto flex justify-center items-center mt-36 pb-20">
        <Table />
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
      </div>
    </div>
  );
};

export default postRecycling;
