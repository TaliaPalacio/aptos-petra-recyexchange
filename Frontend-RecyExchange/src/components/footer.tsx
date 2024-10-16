import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" sticky bg-gradient-to-b from-gray-900 to-gray-700 text-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center p-1">
          {/* Logo o texto de la compañía */}
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-semibold">RecyExchange</h3>
            <p className="text-gray-400">Making recycling easy for Medellín</p>
          </div>

          {/* Redes sociales */}
          <div className=" sm:mt-0 flex space-x-6">
            <a
              href="https://github.com/TaliaPalacio/RecyExchange.git"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/talia-palacio-mira-542871b2/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/alejandro-becerra-acevedo-8ba371226/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        <div className="text-center text-gray-400">
          <p>© {new Date().getFullYear()} RecyExchange. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
