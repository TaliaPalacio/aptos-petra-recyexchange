import React from "react";

interface CardProps {
  type: string;
  price: number;
  imageUrl: string;
  location: string;
}

const Card: React.FC<CardProps> = ({ type, price, imageUrl, location }) => {
  return (
    <div className="bg-blue-200 border border-blue-400 rounded-lg shadow-2xl w-80 p-6 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer">
      <img
        src={imageUrl}
        alt={`${type} image`}
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
      />
      <h2 className="text-xl font-semibold">Type{type}</h2>
      <p className="text-gray-700 text-sm mb-2">Costo: ${price}</p>
      <p className="text-gray-500 text-sm mb-4">Ubicación: {location}</p>
      <div className="flex justify-around mt-4">
        <a href="#" className=" bg-orange-500 text-white px-4 py-2 rounded-md flex items-center space-x-1 text-sm hover:bg-blue-600 transition-colors">
          <span>👁️</span>
          <span>Ver</span>
        </a>
        <a href="#" className=" bg-orange-500 text-white px-4 py-2 rounded-md flex items-center space-x-1 text-sm hover:bg-blue-600 transition-colors">
          <span>💬</span>
          <span>Chat</span>
        </a>
      </div>
    </div>
  );
};

export default Card;
