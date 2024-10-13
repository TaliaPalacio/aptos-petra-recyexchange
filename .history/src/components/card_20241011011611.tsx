import React from "react";

interface CardProps {
  imageUrl: string;
  type: string;
  cost: number;
}

const Card: React.FC<CardProps> = ({ imageUrl, type, cost }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
      <img src={imageUrl} alt={type} className="w-24 h-24 rounded-full" />
      <h2 className="text-lg font-semibold mt-2">{type}</h2>
      <p className="text-gray-600">${cost.toFixed(2)}</p>
      <div className="mt-4 flex space-x-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded">Ver</button>
        <button className="bg-green-500 text-white py-2 px-4 rounded">Chat</button>
      </div>
    </div>
  );
};

export default Card;
