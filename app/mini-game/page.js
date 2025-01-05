'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../NavBar/navbar'; // Menambahkan navbar sesuai path yang diinginkan
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

    // Data struktur dengan kategori dan pertanyaan
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
        // Reset state saat memilih region
        setSelectedRegion(region);
        setSelectedCategory(null); // Reset kategori
        setScore(0); // Reset score
        setQuestionIndex(0); // Reset index pertanyaan
        setFeedback(''); // Reset feedback
        setQuestion('Pilih kategori untuk mulai bermain!'); // Pertanyaan awal

        // Scroll konten view ke atas jika tersedia
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

        // Periksa jika kategori data ada dan memiliki pertanyaan
        if (categoryData && categoryData.length > 0) {
            setQuestionIndex(0); // Reset index pertanyaan saat memilih kategori baru
            setQuestion(categoryData[0].question); // Tampilkan pertanyaan pertama dari kategori yang dipilih
            setFeedback(''); // Reset feedback
        } else {
            setFeedback('Kategori tidak memiliki pertanyaan!'); // Jika kategori tidak memiliki pertanyaan
        }
    };

    const handleAnswer = (answer) => {
        if (selectedRegion && selectedCategory) {
            const categoryData = data[selectedRegion.key][selectedCategory]; // Ambil data kategori yang dipilih
            const questionData = categoryData[questionIndex]; // Ambil pertanyaan saat ini

            // Pastikan data pertanyaan ada
            if (questionData) {
                const correctAnswer = questionData.answer;

                // Bandingkan jawaban yang dipilih dengan jawaban yang benar
                if (answer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
                    setScore(prevScore => prevScore + 1); // Tambahkan skor jika jawaban benar
                    setFeedback('Jawaban benar!'); // Feedback jawaban benar
                    setQuestionIndex(prevIndex => prevIndex + 1); // Pindah ke pertanyaan berikutnya

                    // Periksa apakah masih ada pertanyaan lain dalam kategori ini
                    if (questionIndex + 1 < categoryData.length) {
                        setQuestion(categoryData[questionIndex + 1].question); // Tampilkan pertanyaan berikutnya
                    } else {
                        // Jika sudah selesai menjawab semua pertanyaan, tampilkan pesan selesai
                        setQuestion('Selamat! Kamu telah menjawab semua pertanyaan dalam kategori ini.');
                        setTimeout(() => {
                            setSelectedCategory(null); // Reset kategori setelah selesai
                            setQuestion('Pilih kategori berikutnya!');
                            setFeedback('');
                        }, 2000); // Tunggu 2 detik sebelum reset
                    }
                } else {
                    setFeedback('Jawaban salah, coba lagi!'); // Feedback jawaban salah
                }
            } else {
                setFeedback('Pertanyaan tidak ditemukan, coba lagi!'); // Jika data pertanyaan tidak ditemukan
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
    
            // Tambahkan Tile Layer ke peta
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
            // Tambahkan marker untuk setiap region
            regions.forEach(region => {
                const marker = L.marker(region.coords).addTo(map);
                marker.on('click', () => handleMarkerClick(region));
                marker.bindPopup(`<b>${region.name}</b>`);
            });
        }
    }, [mapContainer, selectedRegion]);  // Tambahkan selectedRegion sebagai dependensi
    

    return (
        <div>
            <Navbar />
            <div ref={mapContainer} style={{ height: '500px' }}></div>

            <div ref={contentRef} className="content">
                <h2>{selectedRegion ? `Region: ${selectedRegion.name}` : 'Pilih Region'}</h2>
                <div>
                    {regions.map(region => (
                        <button key={region.key} onClick={() => handleMarkerClick(region)}>
                            {region.name}
                        </button>
                    ))}
                </div>

                {selectedRegion && (
                    <div>
                        <h3>Pilih Kategori</h3>
                        <button onClick={() => handleCategorySelect('languages')}>Bahasa</button>
                        <button onClick={() => handleCategorySelect('foods')}>Makanan</button>
                        <button onClick={() => handleCategorySelect('dances')}>Tari</button>
                        <button onClick={() => handleCategorySelect('folkTales')}>Cerita Rakyat</button>
                    </div>
                )}

                {selectedCategory && question && (
                    <div>
                        <p>{question}</p>
                        <input 
                            type="text" 
                            onChange={(e) => handleAnswer(e.target.value)} 
                            placeholder="Tulis jawaban"
                        />
                    </div>
                )}

                <div>
                    <h3>Skor: {score}</h3>
                    <p>{feedback}</p>
                </div>
            </div>
        </div>
    );
};

export default Map;
