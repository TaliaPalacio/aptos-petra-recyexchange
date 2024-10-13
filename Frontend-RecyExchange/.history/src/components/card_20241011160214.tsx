import React from "react";

interface CardProps {
  type: string;
  price: number;
  imageUrl: string;
  location: string;
}

const Card: React.FC<CardProps> = ({ type, price, imageUrl, location }) => {
  return (
    <div className="bg-blue-200 rounded-lg shadow-md w-80 p-6 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer">
      <img
        src={imageUrl}
        alt={`${type} image`}
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
      />
      <h2 className="text-xl font-semibold">{type}</h2>
      <p className="text-gray-700 text-sm mb-2">Costo: ${price}</p>
      <p className="text-gray-500 text-sm mb-4">Ubicación: {location}</p>
      <div className="flex justify-around mt-4">
        <a href="#" className="text-black flex items-center space-x-10 bg-blue-600 rounded-lg">
          <span>👁️</span>
          <span>Ver</span>
        </a>
        <a href="#" className="text-gray-600 flex items-center space-x-1">
          <span>💬</span>
          <span>Chat</span>
        </a>
      </div>
    </div>
  );
};

export default Card;
