import React, { useState, useEffect } from "react";

const ChatBubble: React.FC<{ message: string; isUser?: boolean }> = ({
  message,
  isUser,
}) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
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
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
  const [isMinimized, setIsMinimized] = useState(false);

  // Recuperar el historial desde localStorage al cargar el componente
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat_${recyclingId}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, [recyclingId]);

  // Guardar el historial en localStorage al cerrar el chat o al minimizarlo
  const handleSaveChat = () => {
    localStorage.setItem(`chat_${recyclingId}`, JSON.stringify(messages));
  };

  const handleSendMessage = async () => {
    if (topic.trim() && message.trim()) {
      const newMessage = { text: message, isUser: true };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);

      // Llama a tu API para crear un nuevo chat
      const response = await fetch(`/api/chats/${recyclingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, message }), // Enviar tanto el tema como el mensaje
      });

      if (response.ok) {
        // Guardar el nuevo mensaje en localStorage
        localStorage.setItem(`chat_${recyclingId}`, JSON.stringify(updatedMessages));
        setMessage(""); // Limpiar campo mensaje
        setTopic("");   // Limpiar campo tema
      } else {
        console.error("Error al enviar el mensaje.");
      }
    }
  };

  return (
    <div
      className={`fixed bottom-0 right-0 mb-4 mr-4 w-80 bg-white rounded-lg shadow-lg border border-gray-300 transition-transform duration-300 ${
        isMinimized ? "transform translate-y-full" : ""
      }`}
    >
      <div className="p-4 border-b bg-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Chat sobre reciclaje {recyclingId}</h2>
        <button
          onClick={() => {
            handleSaveChat(); // Guardar el historial al minimizar
            setIsMinimized(!isMinimized);
          }}
          className="text-gray-500 hover:text-blue-500"
        >
          {isMinimized ? "🡱" : "🡳"}
        </button>
      </div>
      {!isMinimized && (
        <>
          <div className="p-4 h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <ChatBubble key={index} message={msg.text} isUser={msg.isUser} />
            ))}
          </div>
          <div className="p-4">
            <input
              type="text"
              placeholder="Tema"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="border rounded-md p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Mensaje"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border rounded-md p-2 w-full mb-2"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
            >
              Enviar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatComponent;
