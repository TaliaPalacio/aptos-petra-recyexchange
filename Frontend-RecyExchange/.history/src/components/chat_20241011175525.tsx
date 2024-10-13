import React, { useEffect, useState } from "react";

interface Message {
  sender: string;
  message: string;
  timestamp: Date;
}

interface ChatProps {
  recyclingId: string; // ID del reciclaje
  publicadorWallet: string; // Wallet del publicador
}

const ChatComponent: React.FC<ChatProps> = ({ recyclingId, publicadorWallet }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(`/api/chats/recycling/${recyclingId}`);
      const data = await response.json();
      setMessages(data.messages || []); // Asegúrate de que esto coincida con la respuesta de tu API
    };

    fetchMessages();
  }, [recyclingId]);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const sender = "0xYourWalletAddress"; // Wallet del reciclador
      const response = await fetch(`/api/chats/${recyclingId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sender, message: inputMessage }),
      });

      const updatedChat = await response.json();
      setMessages(updatedChat.messages); // Actualiza los mensajes mostrados
      setInputMessage(""); // Limpia el campo de entrada
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat sobre reciclaje {recyclingId}</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === publicadorWallet ? "sent" : "received"}>
            <p>{msg.message}</p>
            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Escribe tu mensaje..."
      />
      <button onClick={handleSendMessage}>Enviar</button>
    </div>
  );
};

export default ChatComponent;
