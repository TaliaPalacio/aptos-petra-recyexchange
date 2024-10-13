import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Header from './header';  

interface WalletContextProps {
  connected: boolean;
  setConnected: (value: boolean) => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    // Solo acceder a localStorage en el cliente
    if (typeof window !== 'undefined') {
      const storedConnected = localStorage.getItem('walletConnected');
      if (storedConnected) {
        setConnected(storedConnected === 'true');
      }
    }
  }, []);

  useEffect(() => {
    // Guardar el estado de conexión en localStorage cuando cambie
    if (typeof window !== 'undefined') {
      localStorage.setItem('walletConnected', connected.toString());
    }
  }, [connected]);

  return (
    <WalletContext.Provider value={{ connected, setConnected }}>
      <Header />
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
