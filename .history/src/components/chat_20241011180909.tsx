import React, { useState } from "react";

const ChatBubble: React.FC<{ message: string; isUser?: boolean }> = ({
  message,
  isUser,
}) => {
  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-2`}
    >
      <div
        className={`p-2 rounded-lg max-w-xs text-white ${
          isUser ? "bg-blue-500" : "bg-gray-500"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

const ChatComponent: React.FC<{ recyclingId: string; onClose: () => void }> = ({
  recyclingId,
  onClose,
}) => {
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);

  const handleSendMessage = async () => {
    if (topic.trim() && message.trim()) {
      const newMessage = { text: message, isUser: true };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Llama a tu API para crear un nuevo chat
      const response = await fetch(`/api/chats/${recyclingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, message }),
      });

      if (response.ok) {
        // Aquí podrías añadir la respuesta del servidor al chat si es necesario
        setMessage(""); // Limpia el campo de mensaje
      } else {
        console.error("Error al enviar el mensaje.");
      }
    }
  };

  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4 w-80 bg-white rounded-lg shadow-lg border border-gray-300">
      <div className="p-4 border-b bg-gray-200 flex justify-between">
        <h2 className="text-lg font-semibold">Chat sobre reciclaje {recyclingId}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-red-500">
          X
        </button>
      </div>
      <div className="p-4 h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.text} isUser={msg.isUser} />
        ))}
      </div>
      <div className="p-4 flex">
        <input
          type="text"
          placeholder="Tema"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border rounded-l-md p-2 flex-1"
        />
        <input
          type="text"
          placeholder="Mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 flex-1 ml-2"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 rounded-md ml-2"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
