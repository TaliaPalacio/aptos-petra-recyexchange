import React, { useState } from 'react';
import Chat from "./chat";

interface CardProps {
  type: string;
  price: number;
  imageUrl: string;
  location: string;
  wallet: string; // Wallet del publicador
  recyclingId: string; // Identificador único del reciclaje
}

const Card: React.FC<CardProps> = ({ type, price, imageUrl, location, wallet, recyclingId }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen); // Cambia el estado del chat (abrir/cerrar)
  };

  return (
    <div className="relative">
      <div className="bg-blue-200 border border-gray-300 rounded-lg shadow-lg w-80 p-6 text-center transition-all duration-500 hover:border-blue-400 hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
        <img
          src={imageUrl}
          alt={`${type} image`}
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        />
        <h2 className="text-xl font-semibold">{}</h2>
        <p className="text-gray-700 text-sm mb-2">Price: ${price}</p>
        <p className="text-gray-500 text-sm mb-4">Ubication: {location}</p>
        <div className="flex justify-around mt-4">
          <a href="#" className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center space-x-1 text-sm hover:bg-blue-600 transition-colors">
            <span>👁️</span>
            <span>See</span>
          </a>
          <button
            onClick={toggleChat}
            className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center space-x-1 text-sm hover:bg-blue-600 transition-colors"
          >
            <span>💬</span>
            <span>Chat</span>
          </button>
        </div>
      </div>

       {/* Mostrar el chat si está abierto */}
      {isChatOpen && <Chat recyclingId={recyclingId} onClose={function (): void {
      } } />}
    </div>
  );
};

export default Card;
