'use client';

import React, { useState } from 'react';
import Navbar from '../NavBar/navbar';
import Image from 'next/image';
import Link from 'next/link';

const MulaiPetualangan = () => {
    const [selectedRegion, setSelectedRegion] = useState(null);

    const handleSelectRegion = (region) => {
        setSelectedRegion(region);
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
            <Navbar />
            <div className="bg-[#FFEB99] p-8 w-full h-full min-h-screen shadow-2xl mt-16 rounded-2xl border-4 border-yellow-300 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text mb-8 text-center font-sans tracking-wide animate-bounce shadow-2xl p-6 rounded-3xl bg-gradient-to-r from-pink-700 via-yellow-500 to-orange-600 transition-all duration-500 hover:rotate-3">
                    Mulai Petualangan Budaya Indonesia!
                </h1>

                <div className="container bg-[#FFEB99] p-8 max-w-screen-lg mx-auto shadow-2xl mt-16 rounded-2xl border-4 border-yellow-300 relative group">
                    <p className="text-3xl sm:text-4xl font-semibold text-teal-600 mb-8 text-center animate-pulse transition-all duration-500 hover:text-yellow-500">
                        Pilih Pulau untuk Petualangan Seru!
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                        {['jawa', 'sumatra', 'kalimantan', 'sulawesi', 'papua', 'nusaTenggara'].map((region) => (
                            <button
                                key={region}
                                onClick={() => handleSelectRegion(region)}
                                className={`bg-gradient-to-r ${region === 'jawa' ? 'from-yellow-500 to-yellow-400' : region === 'sumatra' ? 'from-green-500 to-green-300' : region === 'kalimantan' ? 'from-teal-500 to-teal-300' : region === 'sulawesi' ? 'from-pink-500 to-pink-300' : region === 'papua' ? 'from-indigo-500 to-indigo-300' : 'from-purple-500 to-purple-300'} text-white p-6 rounded-lg shadow-lg hover:bg-opacity-80 hover:scale-110 hover:rotate-6 transition-all duration-300 ease-in-out text-center flex items-center justify-center space-x-2 transform`}>
                                <Image
                                    src={`/icons/${region}.png`}
                                    alt={region}
                                    width={50}
                                    height={50}
                                    className="w-12 h-12 transform transition-all duration-300 hover:rotate-45"
                                />
                                <span className="font-semibold text-lg">{`Pulau ${region.charAt(0).toUpperCase() + region.slice(1)}`}</span>
                            </button>
                        ))}
                    </div>

                    {selectedRegion && (
                        <div className="mt-8 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105">
                            <h2 className="text-2xl text-white font-extrabold mb-4">Informasi {selectedRegion}</h2>
                            <p className="text-lg text-white">
                                Kamu memilih {selectedRegion}. Di sini kamu bisa menemukan berbagai budaya dan informasi menarik lainnya.
                            </p>
                            <button
                                onClick={() => alert(`Mulai petualangan di Pulau ${selectedRegion}`)}
                                className="mt-4 bg-pink-500 text-white text-lg font-bold py-3 px-6 rounded-full shadow-md hover:bg-pink-600 transform transition-all duration-300 hover:scale-105">
                                Mulai Petualangan {selectedRegion}
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-8 flex justify-center">
                    <iframe
                        width="800"
                        height="450"
                        src="https://www.youtube.com/embed/BDy2ChJusqU?si=crQ11tbrVg-jgTMs"
                        title="Video Petualangan Budaya Indonesia"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-xl shadow-lg transform hover:scale-105 transition-all duration-500"
                    ></iframe>
                </div>
            </div>
        </main>
    );


};

export default MulaiPetualangan;
