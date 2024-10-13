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
  const [topic, setTopic] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
  const [isMinimized, setIsMinimized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Recuperar el historial desde localStorage al cargar el componente
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat_${recyclingId}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    const savedTopic = localStorage.getItem(`topic_${recyclingId}`);
    if (savedTopic) {
      setTopic(savedTopic); // Precargar el tema si ya ha sido guardado
    }
  }, [recyclingId]);

  // Guardar el historial en localStorage al cerrar el chat o al minimizarlo
  const handleSaveChat = () => {
    localStorage.setItem(`chat_${recyclingId}`, JSON.stringify(messages));
    if (topic) {
      localStorage.setItem(`topic_${recyclingId}`, topic);
    }
  };

  const handleSendMessage = async () => {
    if (!topic) {
      setError("El campo 'Tema' no puede estar vacío.");
      return;
    }

    if (message.trim()) {
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
        setMessage(""); // Limpiar el campo de mensaje después de enviar
        setError(null); // Limpiar el error
        localStorage.setItem(`chat_${recyclingId}`, JSON.stringify(updatedMessages));
      } else {
        console.error("Error al enviar el mensaje.");
      }
    }
  };

  const handleChatClick = () => {
    setIsMinimized(false);
  };

  return (
    <>
      <div
        className={`fixed bottom-0 right-0 mb-4 mr-4 w-80 bg-white rounded-lg shadow-lg border border-gray-300 transition-transform duration-300 ${
          isMinimized ? "transform translate-y-full" : ""
        } z-50`} // Asegurar que el chat se superponga a otros elementos
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
                value={topic || ""}
                onChange={(e) => setTopic(e.target.value)}
                className="border rounded-md p-2 w-full mb-2"
                disabled={!!topic} // Deshabilitar si ya hay un tema
              />
              <input
                type="text"
                placeholder="Mensaje"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border rounded-md p-2 w-full mb-2"
              />
              {error && <p className="text-red-500 mb-2">{error}</p>}
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

      {/* Botón para maximizar el chat cuando está minimizado */}
      {isMinimized && (
        <div
          className="fixed bottom-0 right-0 mb-4 mr-4 w-20 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer z-50"
          onClick={handleChatClick}
        >
          💬 Chat
        </div>
      )}
    </>
  );
};

export default ChatComponent;
