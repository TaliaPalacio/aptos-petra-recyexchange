import React from "react";
import Button from "./button";
import ButtonCreateWallet from "./buttonCreateWallet";
import Image from "next/image";
import Menu from "./menu";
import { useWalletContext } from "./walletContext";
import { useEffect } from "react";

const Header = () => {
  const { connected } = useWalletContext();
  // Usa el contexto
  useEffect(() => {
    // Forzar la actualización del estado del menú basado en la conexión
    if (connected) {
      console.log("Wallet conectada, mostrar el menú");
    } else {
      console.log("Wallet desconectada, ocultar el menú");
    }
  }, [connected]);

  return (
    <>
      <nav
       className=" sticky top-0 z-50 flex items-center p-3 lg:px-8 w-full justify-center bg-gradient-to-br from-blue-300 via-white to-green-300"
       aria-label="Global"
      >
        <div className="flex flex-row w-screen justify-between">
          <a
          href="/">
          <div className="">
            <Image
              className="rounded-xl"
              src="/Logo_RecyExchange.jpg"
              alt="Logo"
              width={80}
              height={80}
            />
          </div>
          </a>
          <div className="hidden lg:flex lg:gap-x-12 lg:items-center">
            <ButtonCreateWallet />
            <button
              className="color-primary w-56 h-11 text-white font-bold text-base rounded-full 
              shadow-xl hover:opacity-70 transition ease-in-out hover:-translate-y-1 hover:scale-110 
              duration-300">
              what can you recycle?
            </button>
            <Menu />
          </div>
          <div className="flex items-center">
            <Button />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
