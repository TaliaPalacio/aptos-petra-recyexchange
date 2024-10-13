import React, { useState } from "react";
import RadioGroupGlobal from "@/components/radio-group-global";
import Carousel from "@/components/carouse-shadcn";
import Header from "@/components/header";

const RegisterPage = () => {
  const options = [
    {
      id: "check-recycling",
      label: "Check Available Recycling",
      description:
        "This option allows you to check which recycling is available for collection in your area. Remember that you can communicate with the client through the integrated chat..",
    },
    {
      id: "post-recycling",
      label: "Post Recycling",
      description:
        "This option allows you to post your recycling for pickup. If you have questions about what you can recycle, you can enter here..",
    },
  ];

  const [selectedDescription, setSelectedDescription] = useState<string>("");

  const handleRadioChange = (description: string) => {
    setSelectedDescription(description);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex justify-start">
        <Header />
      </div>
      <div className="flex items-center flex-row justify-between">
        <div>Izquierda</div>
        <div>
          <form className="w-full max-w-lg bg-green-100 border border-blue-500 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300">
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-center font-semibold leading-6 text-gray-900">
                      Select an Option
                    </legend>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose one of the following options.
                    </p>
                    <div className="mt-6 space-y-6">
                      {options.map((option) => (
                        <div
                          className="flex items-center gap-x-3"
                          key={option.id}
                        >
                          <input
                            id={option.id}
                            name="recycling-options"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            onChange={() =>
                              handleRadioChange(option.description)
                            }
                          />
                          <label
                            htmlFor={option.id}
                            className="block text-lg font-medium leading-6 text-gray-900 transition-transform transform hover:scale-105 duration-300"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900 transition-colors hover:text-indigo-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-transform transform hover:scale-105 duration-300"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Cuadro de descripción fuera del formulario */}
          <div className="mt-8 w-full max-w-lg bg-white border border-blue-500 p-4 rounded-lg shadow-md transition-opacity duration-300">
            <h3 className="text-lg font-semibold leading-6 text-gray-900">
              Description of each option
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {selectedDescription ||
                "Select an option to see the description here."}
            </p>
          </div>
          <RadioGroupGlobal />
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
