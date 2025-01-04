'use client';

import React from 'react';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import 'leaflet/dist/leaflet.css';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-gradient-to-br from-blue-400 to-green-300 overflow-hidden">
      {/* Elemen Dekoratif Latar */}
      <div className="absolute top-[-50px] left-[-50px] w-96 h-96 bg-yellow-300 rounded-full opacity-70 animate-bounce-slow"></div>
      <div className="absolute bottom-[-50px] right-[-50px] w-72 h-72 bg-pink-400 rounded-full opacity-50 animate-spin-slow"></div>
      <div className="absolute top-[20%] left-[10%] w-20 h-20 bg-white rounded-full opacity-80 animate-pulse"></div>
      <div className="absolute bottom-[15%] right-[15%] w-32 h-32 bg-purple-200 rounded-full opacity-60 animate-bounce"></div>

      <div className="flex items-center justify-center min-h-screen rounded-full">
        <div className="bg-[#F0CEA9] flex flex-col items-center justify-center w-[70%] max-w-3xl h-[70%] max-w-md h-auto shadow-xl rounded-lg relative z-10 p-6">
          <div className="text-center">
            {/* Logo Image */}
            <Image
              src="/images/nusa.png"
              alt="Logo Nusantara Maps"
              width={350}
              height={350}
              className="mb-6 drop-shadow-xl animate-bounce justify-center"
            />

            <h1 className="text-4xl font-bold text-blue-700 mb-5 font-comic tracking-wide">
              <span>Selamat Datang di </span>
              <br />
              <TypeAnimation
                sequence={["Nusantara Maps!", 1000]}
                wrapper="span"
                speed={30}
                repeat={Infinity}
                className="text-yellow-700"
              />
            </h1>

            <p className="text-xl text-gray-700 font-semibold mb-6">
              Temukan petualangan seru bersama kami!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/daftar">
                <button className="px-6 py-4 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold shadow-md transform hover:scale-110 transition-all duration-300">
                  Daftar Dulu
                </button>
              </Link>
              <Link href="/login">
                <button className="px-6 py-4 rounded-full bg-blue-400 hover:bg-blue-500 text-white font-bold shadow-md transform hover:scale-110 transition-all duration-300">
                  Mulai Sekarang
                </button>
              </Link>
            </div>

            <div className="mt-10 text-sm text-gray-600 justify-center">
              <p>Explore the wonders of Nusantara with fun and joy!</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
