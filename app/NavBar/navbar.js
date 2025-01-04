import React, { useState } from 'react';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-yellow-400 via-pink-400 to-pink-400 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo dan Judul */}
        <div className="flex items-center space-x-2 text-white font-bold text-xl sm:text-2xl">
          <Image
            src="/images/nusa.png"
            alt="Logo"
            width={350}
            height={350}
            className="w-12 h-12 object-cover object-center rounded-full"
          />
          <a href="" className="text-2xl">Nusa Maps</a>
        </div>

        {/* Button dan Dropdown Menu */}
        <div className="relative">
          <button
            className="text-white focus:outline-none hover:text-yellow-400 transition-all duration-300"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          {/* Mobile menu dengan animasi */}
          {isMenuOpen && (
            <ul className="absolute right-0 mt-2 bg-yellow-400 text-black rounded-lg shadow-lg py-2 w-40 transition-all duration-500 transform scale-95 hover:scale-100">
              <li className="hover:bg-yellow-300 px-4 py-2 transition-colors duration-200">
                <a href="/home" className="block flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12l-6-6m0 0l-6 6m6-6v12"
                    />
                  </svg>
                  <span>Mini Game</span>
                </a>
              </li>
              <li className="hover:bg-yellow-300 px-4 py-2 transition-colors duration-200">
                <a href="/about" className="block flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 19.5L12 12l8.25 7.5"
                    />
                  </svg>
                  <span>Peringkat</span>
                </a>
              </li>
              <li className="hover:bg-yellow-300 px-4 py-2 transition-colors duration-200">
                <a href="/contact" className="block flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l9-9m0 0l-9-9m9 9H3"
                    />
                  </svg>
                  <span>Akun</span>
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
