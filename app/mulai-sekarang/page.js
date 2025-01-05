'use client';

import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import Navbar from '../NavBar/navbar';
import Image from 'next/image';
import Link from 'next/link';

const Map = () => {
    const mapContainer = useRef(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedContent, setSelectedContent] = useState(null);
    const contentRef = useRef(null);

    const data = {
        jawa: {
            languages: ['Bahasa Jawa', 'Bahasa Sunda', 'Bahasa Madura'],
            foods: ['Gudeg', 'Rawon', 'Soto Lamongan'],
            songs: ['Gundul-Gundul Pacul', 'Bubuy Bulan', 'Tari Topeng'],
            dances: ['Tari Gambyong', 'Tari Topeng', 'Tari Reog'],
            folkTales: ['Legenda Roro Jonggrang', 'Legenda Sangkuriang', 'Legenda Malin Kundang'],
            musicalInstruments: ['Gamelan', 'Angklung', 'Kendang'],
        },
        sumatra: {
            languages: ['Bahasa Minangkabau', 'Bahasa Batak', 'Bahasa Aceh'],
            foods: ['Rendang', 'Pempek', 'Lontong Sayur'],
            songs: ['Ayam Den Lapeh', 'Bapisang-Pisang', 'Lagu Tanjung Katung'],
            dances: ['Tari Piring', 'Tari Tor-Tor', 'Tari Saman'],
            folkTales: ['Legenda Malin Kundang', 'Legenda Danau Toba', 'Cerita Si Pitung'],
            musicalInstruments: ['Saluang', 'Gong', 'Tambur'],
        },
        kalimantan: {
            languages: ['Bahasa Dayak', 'Bahasa Banjar', 'Bahasa Kutai'],
            foods: ['Soto Banjar', 'Ketupat Kandangan', 'Ikan Bakar Manis'],
            songs: ['Lagu Dayak', 'Lagu Banjar', 'Lagu Kalimantan'],
            dances: ['Tari Hudoq', 'Tari Giring-Giring', 'Tari Mandau'],
            folkTales: ['Legenda Batu Menangis', 'Cerita Rakyat Dayak', 'Legenda Putri Junjung Buih'],
            musicalInstruments: ['Sape', 'Gong', 'Kulintang'],
        },
        sulawesi: {
            languages: ['Bahasa Bugis', 'Bahasa Makassar', 'Bahasa Minahasa'],
            foods: ['Coto Makassar', 'Pallu Basa', 'Babi Pongteh'],
            songs: ['Lagu Anging Mammiri', 'Lagu Paduppa', 'Lagu Toraja'],
            dances: ['Tari Tor-Tor', 'Tari Paduppa', 'Tari Ma\'badong'],
            folkTales: ['Legenda Danau Tempe', 'Legenda Bidadari Rante', 'Cerita Si Kancil dan Buaya'],
            musicalInstruments: ['Gamelan Sulawesi', 'Kolintang', 'Tifa'],
        },
        papua: {
            languages: ['Bahasa Papua', 'Bahasa Biak', 'Bahasa Sentani'],
            foods: ['Papeda', 'Ikan Bakar Manokwari', 'Sate Kelinci'],
            songs: ['Lagu Papua', 'Lagu Yosim Pancar', 'Lagu Ayo Mama'],
            dances: ['Tari Cendrawasih', 'Tari Yospan', 'Tari Seka'],
            folkTales: ['Legenda Asmat', 'Cerita Rakyat Papua', 'Legenda Batu Pemisah'],
            musicalInstruments: ['Tifa', 'Pikon', 'Tumpi'],
        },
        nusaTenggara: {
            languages: ['Bahasa Sasak', 'Bahasa Sumbawa', 'Bahasa Mbojo'],
            foods: ['Ayam Taliwang', 'Sate Bulayak', 'Nasi Roti'],
            songs: ['Lagu Sasak', 'Lagu Nusa Tenggara', 'Lagu Sumbawa'],
            dances: ['Tari Gendang Beleq', 'Tari Caci', 'Tari Sajojo'],
            folkTales: ['Legenda Putri Mandalika', 'Cerita Rakyat Sumbawa', 'Legenda Tujuh Laut'],
            musicalInstruments: ['Gendang Beleq', 'Sasando', 'Tifa'],
        },
    };

    useEffect(() => {
        if (mapContainer.current) {
            const map = L.map(mapContainer.current, {
                maxBounds: [
                    [-11, 94],
                    [6, 141],
                ],
                maxBoundsViscosity: 1.0,
                center: [-0.7893, 117.1485],
                zoom: 5,
                zoomControl: false,
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
            }).addTo(map);

            const regions = [
                { name: 'Pulau Jawa', coords: [-7.5, 110], key: 'jawa', icon: '/icons/jawa.png' },
                { name: 'Pulau Sumatra', coords: [-1.5, 102], key: 'sumatra', icon: '/icons/sumatra.png' },
                { name: 'Pulau Kalimantan', coords: [0, 114], key: 'kalimantan', icon: '/icons/kalimantan.png' },
                { name: 'Pulau Sulawesi', coords: [-2, 121], key: 'sulawesi', icon: '/icons/sulawesi.png' },
                { name: 'Pulau Papua', coords: [-4, 135], key: 'papua', icon: '/icons/papua.png' },
                { name: 'Pulau Nusa Tenggara', coords: [-8.5, 118.5], key: 'nusaTenggara', icon: '/icons/bali.png' },
            ];

            const handleMarkerClick = (region) => {
                setSelectedRegion(region);
                setSelectedContent(null); // Reset content on region change
                if (contentRef.current) {
                    contentRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            };

            regions.forEach(({ name, coords, key, icon }) => {
                const customMarker = L.icon({
                    iconUrl: icon,
                    iconSize: [60, 60],
                    iconAnchor: [30, 35],
                    popupAnchor: [0, -15],
                });

                const marker = L.marker(coords, { icon: customMarker }).addTo(map);
                marker.on('click', () => handleMarkerClick({ name, key }));
            });

            return () => {
                map.remove();
            };
        }
    }, []);

    const handleOptionClick = (type) => {
        const key = selectedRegion?.key;
        if (key && data[key]) {
            setSelectedContent(data[key][type]);
        }
    };

    const handleBackClick = () => {
        setSelectedContent(null);
    };

    return (
        <div className="relative">
            <div
                ref={mapContainer}
                className="h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] w-full border-4 border-[#FF4081] rounded-full mx-auto shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r from-[#FF4081] to-[#FF5722] hover:shadow-xl flex items-center justify-center"
            />
            {selectedRegion && (
                <div
                    ref={contentRef}
                    className="mt-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-6 rounded-lg shadow-xl"
                >
                    <h3 className="text-3xl text-blue-800 font-extrabold animate-bounce">{selectedRegion.name}</h3>
                    <p className="mb-4 text-gray-800 text-lg">Ayo Belajar Budaya dari {selectedRegion.name}:</p>
                    {!selectedContent && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 ">
                            <button
                                onClick={() => handleOptionClick('languages')}
                                className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg hover:bg-yellow-300 hover:scale-110 transition-all duration-300 ease-in-out text-center flex items-center justify-center space-x-2"
                            >
                                <Image
                                    src="/icons/language-icon.png"
                                    alt="Bahasa"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                />
                                <span className="font-semibold text-lg">Bahasa Daerah</span>
                            </button>

                            <button
                                onClick={() => handleOptionClick('foods')}
                                className="bg-green-500 text-white p-6 rounded-lg shadow-lg hover:bg-green-300 hover:scale-110 transition-all duration-300 ease-in-out text-center flex items-center justify-center space-x-2"
                            >
                                <Image
                                    src="/icons/food-icon.png"
                                    alt="Makanan"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                />
                                <span className="font-semibold text-lg">Makanan Khas</span>
                            </button>

                            <button
                                onClick={() => handleOptionClick('songs')}
                                className="bg-red-500 text-white p-6 rounded-lg shadow-lg hover:bg-red-300 hover:scale-110 transition-all duration-300 ease-in-out text-center flex items-center justify-center space-x-2"
                            >
                                <Image
                                    src="/icons/music-icon.png"
                                    alt="Lagu"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                />
                                <span className="font-semibold text-lg">Lagu Daerah</span>
                            </button>

                            <button
                                onClick={() => handleOptionClick('dances')}
                                className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-300 hover:scale-110 transition-all duration-300 ease-in-out text-center flex items-center justify-center space-x-2"
                            >
                                <Image
                                    src="/icons/dance-icon.png"
                                    alt="Tari"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                />
                                <span className="font-semibold text-lg">Tari Tradisional</span>
                            </button>

                            <button
                                onClick={() => handleOptionClick('folkTales')}
                                className="bg-purple-500 text-white p-6 rounded-lg shadow-lg hover:bg-purple-300 hover:scale-110 transition-all duration-300 ease-in-out text-center flex items-center justify-center space-x-2"
                            >
                                <Image
                                    src="/icons/tale-icon.png"
                                    alt="Dongeng"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                />
                                <span className="font-semibold text-lg">Dongeng dan Cerita Rakyat</span>
                            </button>

                            <button
                                onClick={() => handleOptionClick('musicalInstruments')}
                                className="bg-teal-500 text-white p-6 rounded-lg shadow-lg hover:bg-teal-300 hover:scale-110 transition-all duration-300 ease-in-out text-center flex items-center justify-center space-x-2"
                            >
                                <Image
                                    src="/icons/instrument-icon.png"
                                    alt="Instrumen Musik"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                />
                                <span className="font-semibold text-lg">Instrumen Musik Tradisional</span>
                            </button>
                        </div>
                    )}

                    {selectedContent && (
                        <div className="mt-4">
                            <h4 className="text-2xl font-semibold text-white">Konten yang dipilih:</h4>
                            <ul className="text-white space-y-2 mt-4">
                                {selectedContent.map((item, index) => (
                                    <li key={index} className="text-lg">{item}</li>
                                ))}
                            </ul>
                            <button
                                onClick={handleBackClick}
                                className="mt-4 bg-gray-800 text-white py-2 px-6 rounded-lg"
                            >
                                Kembali
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const MulaiSekarang = () => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-blue-500 to-green-500">
            <Navbar />
            <div className="bg-[#FFEB99] p-8 w-full h-full min-h-screen shadow-2xl mt-16 rounded-2xl border-4 border-yellow-300">
                <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text mb-8 text-center font-sans tracking-wide animate-bounce shadow-2xl p-6 rounded-3xl bg-gradient-to-r from-pink-700 via-yellow-500 to-orange-600 transform transition-all duration-300 hover:scale-105">
                    Ayo Belajar Budaya Indonesia
                </h1>
                <p className="text-3xl sm:text-4xl font-semibold text-teal-600 mb-8 text-center animate-pulse transition-all duration-500 hover:text-yellow-500">
                    Pilih salah satu pulau di peta untuk melihat lebih lanjut!
                </p>
                <div>
                    <Map className="w-full h-full object-cover rounded-lg transform transition-all duration-300 hover:scale-105" />
                </div>
                <div className="flex justify-center mt-8">
                    {/* Link to the video page */}
                    <Link href="/mulai-petualangan">
                        <button className="bg-pink-500 text-white text-lg font-bold py-3 px-6 rounded-full shadow-md hover:bg-pink-600 transform transition-all duration-300 hover:scale-105">
                            Mulai Petualangan
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default MulaiSekarang;


