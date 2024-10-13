import React from "react";

interface CardProps {
  name: string;
  role: string;
  isAdmin: boolean;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ name, role, isAdmin, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md w-80 p-6 text-center">
      <img
        src={imageUrl}
        alt={`${name}'s profile`}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-500 text-sm mb-4">{role}</p>
      {isAdmin && (
        <span className="inline-block bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs mb-4">
          Admin
        </span>
      )}
      <div className="flex justify-around mt-4">
        <a href="#" className="text-gray-600 flex items-center space-x-1">
          <span>📧</span>
          <span>Email</span>
        </a>
        <a href="#" className="text-gray-600 flex items-center space-x-1">
          <span>📞</span>
          <span>Call</span>
        </a>
      </div>
    </div>
  );
};

export default Card;
