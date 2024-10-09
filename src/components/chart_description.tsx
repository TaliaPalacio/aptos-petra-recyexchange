
import React, { useState } from "react";

const [selectedDescription, setSelectedDescription] = useState<string>("");

// Especificar el tipo del parámetro 'description' como string


const chart_description = () => {
  return (
    <div>
        <div className="mt-8 w-full max-w-lg bg-white border border-orange-500 p-4 rounded-lg shadow-md transition-opacity duration-300">
        <h3 className="text-lg font-semibold leading-6 text-gray-900">
          Description
        </h3>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          {selectedDescription || "Select an option to see the description here."}
        </p>
      </div>
    </div>
  )
}

export default chart_description