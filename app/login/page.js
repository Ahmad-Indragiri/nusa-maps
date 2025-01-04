'use client';

import React from 'react';
import Link from 'next/link';

export default function Daftar() {
  return (
    <main className="relative flex min-h-screen flex-col bg-gradient-to-r from-blue-400 via-purple-300 to-pink-300 text-white overflow-hidden">
      {/* Animasi Bulat */}
      <div className="absolute top-[-50px] left-[-50px] w-96 h-96 bg-yellow-300 rounded-full opacity-70 animate-bounce-slow"></div>
      <div className="absolute bottom-[-50px] right-[-50px] w-72 h-72 bg-pink-400 rounded-full opacity-50 animate-spin-slow"></div>
      <div className="absolute top-[15%] left-[5%] w-20 h-20 bg-white rounded-full opacity-80 animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[10%] w-32 h-32 bg-purple-200 rounded-full opacity-60 animate-bounce"></div>

      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-[#F0CEA9] p-8 rounded-lg max-w-md w-full shadow-xl border-4 border-blue-600">
          <h2 className="text-4xl font-bold text-center mb-6 text-blue-700 animate-pulse">
            <span>Masuk</span>
          </h2>
          {/* Form login */}
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white text-black placeholder:text-gray-500 shadow-md"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white text-black placeholder:text-gray-500 shadow-md"
            />
            <Link href="/mulai-sekarang">
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Masuk
              </button>
            </Link>
          </form>
          <div className="text-center mt-4">
            <p className="text-xl text-gray-700 font-medium">Lupa Password? Klik Disini</p>
          </div>
        </div>
      </div>
    </main>
  );
}
