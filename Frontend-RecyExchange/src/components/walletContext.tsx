import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface WalletContextProps {
  connected: boolean;
  setConnected: (value: boolean) => void;
}
const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    const checkWalletConnection = async () => {
      // Verifica si estamos en el lado del cliente
      if (typeof window !== 'undefined') {
        // Verifica el estado de conexión en la wallet Petra directamente
        const petraWallet = (window as any)?.aptos; // Accede a la API de Petra
        if (petraWallet) {
          try {
            const isConnected = await petraWallet.isConnected(); // Método que verifica si la wallet está conectada
            if (isConnected) {
              setConnected(true);
              localStorage.setItem('walletConnected', 'true');
            } else {
              setConnected(false);
              localStorage.setItem('walletConnected', 'false');
            }
          } catch (error) {
            console.error('Error verificando la conexión con la wallet Petra', error);
          }
        } else {
          const storedConnected = localStorage.getItem('walletConnected');
          if (storedConnected) {
            setConnected(storedConnected === 'true');
          }
        }
      }
    };

    checkWalletConnection();
  }, []);

  useEffect(() => {
    // Guardar el estado de conexión en localStorage cuando cambie
    if (typeof window !== 'undefined') {
      localStorage.setItem('walletConnected', connected.toString());
    }
  }, [connected]);

  return (
    <WalletContext.Provider value={{ connected, setConnected }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};
