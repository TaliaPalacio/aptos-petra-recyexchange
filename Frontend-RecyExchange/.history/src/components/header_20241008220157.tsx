import React from "react";
import Button from "./button";
import ButtonCreateWallet from "./buttonCreateWallet";
import Image from "next/image";
import Menu from "./menu";

const header = () => {
  return (
    <div>
        <nav
          className="flex items-center justify-between p-3 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:hidden text-black">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Hola</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

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

            <div className="hidden lg:flex lg:gap-x-12 lg:items-center">
              <ButtonCreateWallet />
              <a
                href="#"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                ¿Qué puedes reciclar?
              </a>
              <Menu />
            </div>
            <div>
              <Button />
            </div>
          </div>
        </nav>
    
    </div>
  );
};

export default header;
