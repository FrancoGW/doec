'use client';

import { useState } from 'react';

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <ul className="list-none flex gap-6 text-sm m-0 p-0">
          <li>
            <a href="#top" className="no-underline text-gray-600 font-medium hover:text-[#0b6623]">
              Inicio
            </a>
          </li>
          <li>
            <a href="#filtros" className="no-underline text-gray-600 font-medium hover:text-[#0b6623]">
              Categorías
            </a>
          </li>
        </ul>
        <button 
          className="rounded-md px-6 py-2 border border-[#0b6623] bg-white text-[#0b6623] font-semibold text-sm cursor-pointer whitespace-nowrap hover:bg-green-50"
        >
          Iniciar sesión
        </button>
      </div>

      {/* Mobile Hamburger Button */}
      {!isOpen && (
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer z-50 p-2"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <span className="block w-6 h-0.5 bg-gray-700"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
        </button>
      )}

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMenu}
        >
          <div 
            className="fixed right-0 top-0 h-full w-[85%] max-w-[360px] bg-white shadow-xl z-50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <button 
                className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-gray-800 w-10 h-10 flex items-center justify-center"
                onClick={closeMenu}
                aria-label="Cerrar menú"
              >
                ×
              </button>
              
              <ul className="list-none p-0 m-0 mt-12">
                <li className="border-b border-gray-100">
                  <a 
                    href="#top" 
                    onClick={closeMenu}
                    className="block py-5 px-4 text-base text-gray-800 font-medium hover:bg-gray-50 hover:text-[#0b6623] no-underline"
                  >
                    Inicio
                  </a>
                </li>
                <li className="border-b border-gray-100">
                  <a 
                    href="#filtros" 
                    onClick={closeMenu}
                    className="block py-5 px-4 text-base text-gray-800 font-medium hover:bg-gray-50 hover:text-[#0b6623] no-underline"
                  >
                    Categorías
                  </a>
                </li>
              </ul>
              
              <button 
                className="mt-8 w-full text-center bg-[#0b6623] text-white py-4 px-8 rounded-lg border border-[#0b6623] font-semibold text-base cursor-pointer hover:bg-[#0a5a1f] hover:border-[#0a5a1f]"
                onClick={closeMenu}
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
