import React, { useState } from "react";

interface ChatProps {
  recyclingId: string; // ID del reciclaje
  onClose: () => void; // Función para manejar el cierre del chat
}

const ChatComponent: React.FC<ChatProps> = ({ recyclingId, onClose }) => {
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (topic.trim() && message.trim()) {
      try {
        // Llama a tu API para crear un nuevo chat
        const response = await fetch(`/api/chats/${recyclingId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topic, message }),
        });

        if (response.ok) {
          // Limpia los campos de entrada
          setTopic("");
          setMessage("");
          // Aquí puedes manejar la lógica adicional si es necesario
        } else {
          // Manejo de errores
          console.error("Error al enviar el mensaje.");
        }
      } catch (error) {
        console.error("Error en la comunicación con el servidor:", error);
      }
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat sobre reciclaje {recyclingId}</h2>
      <div>
        <input
          type="text"
          placeholder="Tema"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <textarea
          placeholder="Mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border rounded p-2 w-full mt-2"
        />
      </div>
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Enviar
      </button>
      <button
        onClick={onClose}
        className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2"
      >
        Cerrar
      </button>
    </div>
  );
};

export default ChatComponent;
