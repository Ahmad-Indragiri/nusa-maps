'use client';

import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../NavBar/navbar';
import Image from 'next/image';
import Link from 'next/link';

const Map = () => {
    const mapContainer = useRef(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [score, setScore] = useState(0);
    const [question, setQuestion] = useState('');
    const [questionIndex, setQuestionIndex] = useState(0);
    const [feedback, setFeedback] = useState('');
    const contentRef = useRef(null);


    // Data structure with categories and questions
    const data = {
        jawa: {
            languages: [
                { question: "Apa bahasa utama yang digunakan di Jawa?", answer: "Bahasa Jawa" },
                { question: "Bahasa lain yang umum digunakan di Jawa?", answer: "Bahasa Sunda" },
            ],
            foods: [
                { question: "Makanan khas Jawa yang terkenal?", answer: "Gudeg" },
                { question: "Makanan khas Jawa yang terbuat dari daging sapi?", answer: "Rawon" },
            ],
            dances: [
                { question: "Tari tradisional dari Jawa yang terkenal?", answer: "Tari Gambyong" },
                { question: "Tari tradisional yang digunakan di acara pernikahan?", answer: "Tari Topeng" },
            ],
            folkTales: [
                { question: "Legenda populer dari Jawa?", answer: "Legenda Roro Jonggrang" },
                { question: "Cerita rakyat dari Jawa yang terkenal?", answer: "Legenda Sangkuriang" },
            ]
        },
        sumatra: {
            languages: [
                { question: "Bahasa utama di Sumatra?", answer: "Bahasa Minangkabau" },
                { question: "Bahasa yang digunakan oleh orang Batak?", answer: "Bahasa Batak" },
            ],
            foods: [
                { question: "Makanan khas Sumatra yang terkenal?", answer: "Rendang" },
                { question: "Makanan yang terbuat dari ikan khas Sumatra?", answer: "Pempek" },
            ],
            dances: [
                { question: "Tari tradisional dari Sumatra?", answer: "Tari Piring" },
                { question: "Tari tradisional yang digunakan di pesta adat?", answer: "Tari Tor-Tor" },
            ],
            folkTales: [
                { question: "Cerita rakyat dari Sumatra?", answer: "Legenda Malin Kundang" },
                { question: "Legenda terkenal dari Sumatra?", answer: "Legenda Danau Toba" },
            ]
        },
        kalimantan: {
            languages: [
                { question: "Bahasa apa yang digunakan oleh suku Dayak?", answer: "Bahasa Dayak" },
                { question: "Bahasa apa yang digunakan oleh suku Banjar?", answer: "Bahasa Banjar" },
                { question: "Bahasa apa yang digunakan oleh suku Kutai?", answer: "Bahasa Kutai" },
            ],
            foods: [
                { question: "Makanan khas Kalimantan yang terkenal?", answer: "Soto Banjar" },
                { question: "Makanan khas Kalimantan yang terbuat dari ketupat?", answer: "Ketupat Kandangan" },
                { question: "Makanan khas Kalimantan yang terbuat dari ikan?", answer: "Ikan Bakar Manis" },
            ],
            songs: [
                { question: "Lagu tradisional khas Kalimantan?", answer: "Lagu Dayak" },
                { question: "Lagu tradisional dari suku Banjar?", answer: "Lagu Banjar" },
                { question: "Lagu yang mewakili Kalimantan?", answer: "Lagu Kalimantan" },
            ],
            dances: [
                { question: "Tari tradisional Kalimantan yang terkenal?", answer: "Tari Hudoq" },
                { question: "Tari yang digunakan dalam upacara adat Banjar?", answer: "Tari Giring-Giring" },
                { question: "Tari tradisional Kalimantan yang menggunakan mandau?", answer: "Tari Mandau" },
            ],
            folkTales: [
                { question: "Legenda terkenal dari Kalimantan?", answer: "Legenda Batu Menangis" },
                { question: "Cerita rakyat dari suku Dayak?", answer: "Cerita Rakyat Dayak" },
                { question: "Legenda yang berasal dari Kalimantan?", answer: "Legenda Putri Junjung Buih" },
            ],
            musicalInstruments: [
                { question: "Alat musik tradisional Kalimantan yang digunakan oleh suku Dayak?", answer: "Sape" },
                { question: "Alat musik tradisional Kalimantan yang terbuat dari logam?", answer: "Gong" },
                { question: "Alat musik tradisional Kalimantan yang dimainkan dengan cara dipukul?", answer: "Kulintang" },
            ],
        },
        sulawesi: {
            languages: [
                { question: "Bahasa utama yang digunakan oleh suku Bugis?", answer: "Bahasa Bugis" },
                { question: "Bahasa yang digunakan oleh suku Makassar?", answer: "Bahasa Makassar" },
                { question: "Bahasa yang digunakan oleh suku Minahasa?", answer: "Bahasa Minahasa" },
            ],
            foods: [
                { question: "Makanan khas Sulawesi yang terkenal?", answer: "Coto Makassar" },
                { question: "Makanan khas Sulawesi yang berbahan dasar daging?", answer: "Pallu Basa" },
                { question: "Makanan khas Sulawesi yang menggunakan daging babi?", answer: "Babi Pongteh" },
            ],
            songs: [
                { question: "Lagu tradisional dari Sulawesi?", answer: "Lagu Anging Mammiri" },
                { question: "Lagu khas dari daerah Toraja?", answer: "Lagu Paduppa" },
                { question: "Lagu tradisional yang berasal dari Sulawesi?", answer: "Lagu Toraja" },
            ],
            dances: [
                { question: "Tari tradisional dari Sulawesi?", answer: "Tari Tor-Tor" },
                { question: "Tari yang sering digunakan dalam acara adat?", answer: "Tari Paduppa" },
                { question: "Tari tradisional yang berasal dari Toraja?", answer: "Tari Ma'badong" },
            ],
            folkTales: [
                { question: "Legenda yang berasal dari Danau Tempe?", answer: "Legenda Danau Tempe" },
                { question: "Cerita rakyat dari Sulawesi?", answer: "Legenda Bidadari Rante" },
                { question: "Cerita Si Kancil dari Sulawesi?", answer: "Cerita Si Kancil dan Buaya" },
            ],
            musicalInstruments: [
                { question: "Alat musik tradisional Sulawesi yang dimainkan dengan cara dipukul?", answer: "Gamelan Sulawesi" },
                { question: "Alat musik tradisional Sulawesi yang dimainkan dengan cara dipukul?", answer: "Kolintang" },
                { question: "Alat musik tradisional Sulawesi yang terbuat dari kayu?", answer: "Tifa" },
            ],
        },
        papua: {
            languages: [
                { question: "Bahasa utama yang digunakan oleh suku Papua?", answer: "Bahasa Papua" },
                { question: "Bahasa yang digunakan oleh suku Biak?", answer: "Bahasa Biak" },
                { question: "Bahasa yang digunakan oleh suku Sentani?", answer: "Bahasa Sentani" },
            ],
            foods: [
                { question: "Makanan khas Papua yang terkenal?", answer: "Papeda" },
                { question: "Makanan khas Manokwari?", answer: "Ikan Bakar Manokwari" },
                { question: "Makanan khas Papua yang terbuat dari kelinci?", answer: "Sate Kelinci" },
            ],
            songs: [
                { question: "Lagu tradisional Papua?", answer: "Lagu Papua" },
                { question: "Lagu yang populer dari Papua?", answer: "Lagu Yosim Pancar" },
                { question: "Lagu yang mewakili Papua?", answer: "Lagu Ayo Mama" },
            ],
            dances: [
                { question: "Tari tradisional dari Papua?", answer: "Tari Cendrawasih" },
                { question: "Tari yang digunakan dalam acara adat?", answer: "Tari Yospan" },
                { question: "Tari yang digunakan di upacara adat?", answer: "Tari Seka" },
            ],
            folkTales: [
                { question: "Legenda yang berasal dari suku Asmat?", answer: "Legenda Asmat" },
                { question: "Cerita rakyat yang berasal dari Papua?", answer: "Cerita Rakyat Papua" },
                { question: "Legenda dari Papua yang terkenal?", answer: "Legenda Batu Pemisah" },
            ],
            musicalInstruments: [
                { question: "Alat musik tradisional Papua yang terbuat dari kayu?", answer: "Tifa" },
                { question: "Alat musik tradisional Papua yang dimainkan dengan cara dipukul?", answer: "Pikon" },
                { question: "Alat musik yang terbuat dari logam yang dimainkan di Papua?", answer: "Tumpi" },
            ],
        },
        nusaTenggara: {
            languages: [
                { question: "Bahasa utama yang digunakan di Nusa Tenggara?", answer: "Bahasa Sasak" },
                { question: "Bahasa yang digunakan oleh suku Sumbawa?", answer: "Bahasa Sumbawa" },
                { question: "Bahasa yang digunakan oleh suku Mbojo?", answer: "Bahasa Mbojo" },
            ],
            foods: [
                { question: "Makanan khas Nusa Tenggara yang terkenal?", answer: "Ayam Taliwang" },
                { question: "Makanan khas Nusa Tenggara yang menggunakan sate?", answer: "Sate Bulayak" },
                { question: "Makanan khas Nusa Tenggara yang berupa roti?", answer: "Nasi Roti" },
            ],
            songs: [
                { question: "Lagu tradisional dari Nusa Tenggara?", answer: "Lagu Sasak" },
                { question: "Lagu yang berasal dari Nusa Tenggara?", answer: "Lagu Nusa Tenggara" },
                { question: "Lagu yang berasal dari Sumbawa?", answer: "Lagu Sumbawa" },
            ],
            dances: [
                { question: "Tari tradisional Nusa Tenggara?", answer: "Tari Gendang Beleq" },
                { question: "Tari yang sering digunakan dalam upacara adat?", answer: "Tari Caci" },
                { question: "Tari yang terkenal di Nusa Tenggara?", answer: "Tari Sajojo" },
            ],
            folkTales: [
                { question: "Legenda terkenal dari Nusa Tenggara?", answer: "Legenda Putri Mandalika" },
                { question: "Cerita rakyat yang berasal dari Nusa Tenggara?", answer: "Cerita Rakyat Sumbawa" },
                { question: "Legenda yang terkenal dari Nusa Tenggara?", answer: "Legenda Tujuh Laut" },
            ],
            musicalInstruments: [
                { question: "Alat musik tradisional Nusa Tenggara yang terbuat dari kayu?", answer: "Gendang Beleq" },
                { question: "Alat musik yang berasal dari Nusa Tenggara?", answer: "Sasando" },
                { question: "Alat musik yang digunakan oleh masyarakat Nusa Tenggara?", answer: "Tifa" },
            ],
        }
    };

    const regions = [
        { name: 'Pulau Jawa', coords: [-7.5, 110], key: 'jawa', icon: '/icons/jawa.png' },
        { name: 'Pulau Sumatra', coords: [-1.5, 102], key: 'sumatra', icon: '/icons/sumatra.png' },
        { name: 'Pulau Kalimantan', coords: [0, 114], key: 'kalimantan', icon: '/icons/kalimantan.png' },
        { name: 'Pulau Sulawesi', coords: [-2, 121], key: 'sulawesi', icon: '/icons/sulawesi.png' },
        { name: 'Pulau Papua', coords: [-4, 135], key: 'papua', icon: '/icons/papua.png' },
        { name: 'Pulau Nusa Tenggara', coords: [-8.5, 118.5], key: 'nusaTenggara', icon: '/icons/bali.png' },
    ];

    const handleMarkerClick = (region) => {
        // Reset state when changing region
        setSelectedRegion(region);
        setSelectedCategory(null); // Reset category on region change
        setScore(0); // Reset score when changing region
        setQuestionIndex(0); // Reset question index
        setFeedback(''); // Reset feedback
        setQuestion('Pilih kategori untuk mulai bermain!'); // Initial question

        // Scroll content view into view if available
        if (contentRef.current) {
            contentRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        const categoryData = data[selectedRegion.key][category];

        // Check if category data exists and has questions
        if (categoryData && categoryData.length > 0) {
            setQuestionIndex(0); // Reset question index to 0 when selecting a new category
            setQuestion(categoryData[0].question); // Show first question of selected category
            setFeedback(''); // Reset feedback
        } else {
            setFeedback('Kategori tidak memiliki pertanyaan!'); // Handle case if no questions are available
        }
    };


    const handleAnswer = (answer) => {
        if (selectedRegion && selectedCategory) {
            const categoryData = data[selectedRegion.key][selectedCategory]; // Get selected category data
            const questionData = categoryData[questionIndex]; // Get current question

            // Ensure question data exists
            if (questionData) {
                const correctAnswer = questionData.answer;

                // Compare the selected answer with the correct answer
                if (answer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
                    setScore(prevScore => prevScore + 1); // Increase score if answer is correct
                    setFeedback('Jawaban benar!'); // Correct answer feedback
                    setQuestionIndex(prevIndex => prevIndex + 1); // Move to next question

                    // Check if there are more questions in the category
                    if (questionIndex + 1 < categoryData.length) {
                        setQuestion(categoryData[questionIndex + 1].question); // Show next question
                    } else {
                        // If all questions have been answered, show completion message
                        setQuestion('Selamat! Kamu telah menjawab semua pertanyaan dalam kategori ini.');
                        setTimeout(() => {
                            setSelectedCategory(null); // Reset category after completion
                            setQuestion('Pilih kategori berikutnya!');
                            setFeedback('');
                        }, 2000); // Wait 2 seconds before resetting
                    }
                } else {
                    setFeedback('Jawaban salah, coba lagi!'); // Incorrect answer feedback
                }
            } else {
                setFeedback('Pertanyaan tidak ditemukan, coba lagi!'); // Handle case where question data is missing
            }
            const nextIndex = questionIndex + 1;
            if (nextIndex < data[selectedRegion.key][selectedCategory].length) {
                setQuestionIndex(nextIndex);
                setQuestion(data[selectedRegion.key][selectedCategory][nextIndex].question);
            } else {
                setFeedback('Quiz selesai!');
            }
        }
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
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenstreetMap contributors',
            }).addTo(map);

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

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#F6C6EA] via-[#D4C1FF] to-[#FFEDD5]">
            <Navbar />
            <div
                ref={mapContainer}
                className="h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] w-full border-4 border-[#FF4081] rounded-full mx-auto shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r from-[#FF4081] to-[#FF5722] hover:shadow-xl flex items-center justify-center"
            />
            {selectedRegion && (
                <div
                    ref={contentRef}
                    className="mt-8 bg-gradient-to-r from-[#FF6F61] to-[#FF9800] p-8 rounded-3xl shadow-2xl w-full max-w-2xl mx-auto"
                >
                    <h3 className="text-5xl font-bold text-[#FFFFFF] mb-6 text-center animate__animated animate__fadeInUp">
                        Ayo Jelajahi {selectedRegion.name}! Pilih Kategori untuk Bermain
                    </h3>
    
                    {selectedCategory === null && (
                        <div className="space-y-4">
                            {['languages', 'foods', 'dances', 'folkTales', 'songs', 'musicInstruments'].map((category, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleCategorySelect(category)}
                                    className="w-full py-3 px-6 bg-gradient-to-r from-[#03A9F4] to-[#00BCD4] text-white text-xl font-semibold rounded-lg shadow-lg hover:scale-110 transition-all duration-300 ease-in-out transform hover:rotate-3"
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </button>
                            ))}
                        </div>
                    )}
    
                    {selectedCategory !== null && data[selectedRegion.key] && data[selectedRegion.key][selectedCategory] && data[selectedRegion.key][selectedCategory].length > 0 && (
                        <div className="space-y-6">
                            <p className="text-white text-2xl font-semibold mb-4">{question}</p>
                            {data[selectedRegion.key][selectedCategory].map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(item.answer)}
                                    className="w-full py-4 px-6 bg-gradient-to-r from-[#8BC34A] to-[#4CAF50] text-white text-lg font-semibold rounded-full shadow-lg hover:bg-[#388E3C] hover:scale-105 transition-all duration-300 ease-in-out"
                                >
                                    {item.answer}
                                </button>
                            ))}
                        </div>
                    )}
    
                    {/* If no questions are available for the selected category */}
                    {selectedCategory !== null && (!data[selectedRegion.key] || !data[selectedRegion.key][selectedCategory] || data[selectedRegion.key][selectedCategory].length === 0) && (
                        <p className="text-white font-semibold text-2xl text-center">Oops, tidak ada pertanyaan di kategori ini!</p>
                    )}
    
                    {feedback && (
                        <div className="mt-4 text-white text-center font-italic text-lg animate__animated animate__bounceInUp">
                            {feedback}
                        </div>
                    )}
    
                    {/* Score and Feedback Section */}
                    <div className="mt-6 text-center">
                        <h4 className="text-4xl font-extrabold text-[#FFEB3B]">
                            {question}
                        </h4>
                        {feedback && (
                            <p
                                className={`text-3xl font-semibold text-center ${feedback.includes('benar') ? 'text-[#388E3C]' : 'text-[#F44336]'} animate__animated animate__fadeIn`}
                            >
                                {feedback} {feedback.includes('benar') ? '🎉' : '😢'}
                            </p>
                        )}
                        <p className="text-2xl font-bold text-[#FFEB3B]">
                            Poin Kamu: {score} ⭐
                        </p>
                    </div>
    
                    <button
                        onClick={() => setSelectedRegion(null)}
                        className="mt-8 py-4 px-6 bg-gradient-to-r from-[#FF5722] to-[#D32F2F] text-white text-2xl font-bold rounded-3xl shadow-md hover:bg-red-700 hover:scale-105 transition-transform duration-300 ease-in-out"
                    >
                        Kembali ke Peta
                    </button>
                </div>
            )}
        </main>
    );
    
      
};

export default Map;
