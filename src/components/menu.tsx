import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useWalletContext } from "./walletContext";

const DropdownMenu = () => {

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { connected } = useWalletContext(); // Usa el contexto
  

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (option: string) => {
    console.log(`Opción seleccionada: ${option}`);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!connected) return null; // No mostrar el menú si la wallet no está conectada
//mostrar el menu si la wallet esta conectada y se actualiza la pagina

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-x-2 text-lg font-bold leading-50 text-white color-primary rounded-full px-6 py-2 shadow-md transform hover:opacity-70 transition ease-in-out hover:-translate-y-1 hover:scale-110 
          duration-300"
        onClick={toggleMenu}
      >
        <span className="-mx-3 block px-2 text-lg font-bold leading-7 text-white w-full">
          Menu
        </span>
        <svg
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute left-1/2 z-10 mt-5 flex w-screen max-w-xs -translate-x-1/2 px-4 transition-opacity duration-200 ease-in-out ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-screen max-w-xs flex-auto overflow-hidden rounded-3xl bg-blue-100 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              <div
                className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleOptionClick("Analytics")}
              >
                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <Image
                    className="text-gray-600 group-hover:text-white"
                    src="/icons/Person.svg"
                    alt="Analytics"
                    width={24}
                    height={24}
                  />
                </div>
                <a href="/register">
                  <span className="font-semibold text-gray-900">Register</span>

                  <p className="mt-1 text-gray-600">
                    Join us today and be a part of the recycling revolution!
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
