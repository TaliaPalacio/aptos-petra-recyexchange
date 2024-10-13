import React, { useState } from 'react';

const ChatPopup: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white shadow-lg rounded-lg overflow-hidden z-50 border-b-green-700">
      <div className="bg-blue-500 text-white p-3 text-center">
        <h3>Chat</h3>
      </div>
      <div className="p-4 h-64 overflow-y-auto">
        {messages.map((message, index) => (
          <p key={index} className="bg-blue-400 p-2 my-2 rounded-md">{message}</p>
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
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatPopup;
