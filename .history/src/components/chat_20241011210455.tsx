import React, { useState, useEffect } from "react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet } from '@aptos-labs/wallet-adapter-react';

export const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));
const ADDRESS = "0x7ba23f3b116da3871b06133fda6f9ba93339b6714213f643a85d608beeaa9044";

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
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { account, signAndSubmitTransaction } = useWallet();

  // Recuperar el historial desde localStorage al cargar el componente
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat_${recyclingId}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    const savedTopic = localStorage.getItem(`topic_${recyclingId}`);
    if (savedTopic) {
      setTopic(savedTopic);
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
      setMessage(""); // Limpiar el campo de mensaje después de enviar
      setError(null); // Limpiar el error
      handleSaveChat(); // Guardar en localStorage

      // Guardar el mensaje en el contrato inteligente
      const response = await signAndSubmitTransaction({
        sender: account?.address,
        data: {
          function: `${ADDRESS}::recicly::set_chat`,
          typeArguments: [],
          functionArguments: [topic, message], // Envía el tema y el mensaje al contrato
        },
      });

      // Esperar a que la transacción se complete
      try {
        await aptos.waitForTransaction({ transactionHash: response.hash });
      } catch (error) {
        console.error("Error al esperar la transacción:", error);
      }
    } else {
      setError("El mensaje no puede estar vacío.");
    }
  };

  const handleChatClick = () => {
    setIsMinimized(false);
  };

  const getChat = async () => {
    if (!account) {
      console.error("Account is null");
      return;
    }

    const payload: {
      function: `${typeof ADDRESS}::recicly::get_chat`,
      functionArguments: [string, string],
    } = {
      function: `${ADDRESS}::recicly::get_chat`,
      functionArguments: [account.address, recyclingId], // Cambia el argumento según sea necesario
    };
    
    try {
      const result = await aptos.view({ payload });
        console.log("Chat obtenido:", result);
    } catch (error) {
      console.error("Error al obtener el chat:", error);
    }
  };

  return (
    <>
      <div
        className={`fixed bottom-0 right-0 mb-4 mr-4 w-80 bg-white rounded-lg shadow-lg border border-gray-300 transition-transform duration-300 ${
          isMinimized ? "transform translate-y-full" : ""
        } z-50`}
      >
        <div className="p-4 border-b bg-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Chat sobre reciclaje {recyclingId}</h2>
          <button
            onClick={() => {
              handleSaveChat();
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
                className={`border rounded-md p-2 w-full mb-2 ${topic ? 'bg-white' : 'bg-gray-300'}`}
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
              <button onClick={getChat}>Obtener chat</button>
            </div>
          </>
        )}
      </div>

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
