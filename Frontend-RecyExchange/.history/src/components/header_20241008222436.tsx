import React from "react";
import Button from "./button";
import ButtonCreateWallet from "./buttonCreateWallet";
import Image from "next/image";
import Menu from "./menu";

const header = () => {
  return (
    <div className="w-10/12">
        <nav
          className="flex items-center justify-between p-3 lg:px-8"
          aria-label="Global"
        >

          <div className="flex flex-row w-screen justify-between">
            <div className="">
              <Image
                className="rounded-xl"
                src="/Logo_RecyExchange.jpg"
                alt="Logo"
                width={80}
                height={80}
              />
            </div>

            <div className="hidden lg:flex lg:gap-x-12 lg:items-center pr-80">
              <ButtonCreateWallet />
              <a
                href="#"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                ¿Qué puedes reciclar?
              </a>
              <Menu />
            </div>
          </div>
        </nav>
    
    </div>
  );
};

export default header;
