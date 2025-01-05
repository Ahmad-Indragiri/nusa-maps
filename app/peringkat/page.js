"use client";

import React from "react";
import Navbar from "../NavBar/navbar";

const PeringkatPage = () => {
  // Data dummy untuk peringkat
  const dataPeringkat = [
    { nama: "Alice", poin: 120 },
    { nama: "Bob", poin: 110 },
    { nama: "Charlie", poin: 100 },
    { nama: "Diana", poin: 90 },
    { nama: "Ethan", poin: 80 },
  ];

  return (
    <main className="bg-gradient-to-r from-[#F6C6EA] via-[#D4C1FF] to-[#FFEDD5] min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-6">
          🎉 Daftar Peringkat Anak-anak 🎉
        </h1>
        <p className="text-center text-lg text-gray-700 mb-4">
          Siapa yang jadi juara minggu ini? Ayo lihat daftar peringkatnya!
        </p>

        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                <th className="px-6 py-3 text-left text-xl">🏅 Peringkat</th>
                <th className="px-6 py-3 text-left text-xl">😊 Nama</th>
                <th className="px-6 py-3 text-left text-xl">🌟 Poin</th>
              </tr>
            </thead>
            <tbody>
              {dataPeringkat.map((anak, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-purple-100" : "bg-blue-100"
                  } hover:bg-yellow-200 transition duration-300 transform hover:scale-105`}
                >
                  <td className="border px-6 py-4 text-lg font-semibold text-center">
                    <span className="text-2xl">
                      {index === 0
                        ? "🥇"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : "🎖️"}
                    </span>
                    <span className="ml-2">{index + 1}</span>
                  </td>
                  <td className="border px-6 py-4 font-medium text-lg text-gray-800">
                    {anak.nama}
                  </td>
                  <td className="border px-6 py-4 text-lg font-bold text-purple-700">
                    {anak.poin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xl font-semibold text-gray-600">
            Jangan lupa, terus semangat dan raih peringkat lebih tinggi!
          </p>
          <button className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition duration-300">
            Mulai Tantangan Baru 🚀
          </button>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex justify-center items-center text-white font-bold text-xl transform hover:scale-125 transition duration-200">
            🌟
          </div>
        </div>
      </div>
    </main>
  );
};

export default PeringkatPage;
