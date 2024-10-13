import React, { useState, useEffect } from 'react';

interface ChatPopupProps {
  wallet: string;
  recyclingId: string; // Identificador único para cada reciclaje
}

const ChatPopup: React.FC<ChatPopupProps> = ({ wallet, recyclingId }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  // Crear una clave única para cada chat basado en la wallet y el recyclingId
  const chatKey = `chatMessages_${wallet}_${recyclingId}`;

  // Cargar mensajes desde localStorage cuando el componente se monta
  useEffect(() => {
    const storedMessages = localStorage.getItem(chatKey);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, [chatKey]);

  // Guardar mensajes en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem(chatKey, JSON.stringify(messages));
  }, [messages, chatKey]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white shadow-lg rounded-lg overflow-hidden z-50 border border-blue-600">
      <div className="bg-blue-500 text-white p-3 text-center">
        <h3>Chat - {recyclingId}</h3>
      </div>
      <div className="p-4 h-64 overflow-y-auto">
        {messages.map((message, index) => (
          <p key={index} className="bg-green-200 p-2 my-2 rounded-md text-left">{message}</p>
        ))}
      </div>
      <div className="p-2 border-t">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={handleSendMessage}
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md transition-transform transform hover:scale-105 duration-300"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatPopup;
