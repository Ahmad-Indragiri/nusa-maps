'use client'; // Menandakan bahwa komponen ini hanya berjalan di sisi klien

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const EditProfilePage = () => {
    const [name, setName] = useState('Alice');
    const [bio, setBio] = useState('Loves coding and playing games!');
    const [email, setEmail] = useState('alice@example.com');
    const [favoriteGame, setFavoriteGame] = useState('Minecraft');
    const [profilePic, setProfilePic] = useState('/path/to/profile-pic.jpg');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to save changes can be added here
        alert('Profil berhasil diperbarui!');
    };

    return (
        <main className="container mx-auto p-6 flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-xl">
            <h1 className="text-6xl font-extrabold text-white text-center mb-6 animate__animated animate__fadeIn">
                🌟 Edit Profilmu 🌟
            </h1>

            <div className="flex flex-wrap justify-center items-center space-x-4 mb-8">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl transform hover:scale-110 transition duration-300">
                    <Image
                        src="/images/nusa.png"
                        alt="Profile Picture"
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col items-center">
                    <p className="text-2xl font-semibold text-white">Halo, {name}!</p>
                    <p className="text-lg text-white opacity-80">{bio}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-lg shadow-md max-w-lg text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Update Profil</h2>

                {/* Name Input */}
                <div className="mb-6">
                    <label className="block text-left text-xl font-medium text-gray-800 mb-2">Nama Lengkap</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-black w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Masukkan nama lengkap"
                    />
                </div>

                {/* Bio Input */}
                <div className="mb-6">
                    <label className="block text-left text-xl font-medium text-gray-800 mb-2">Bio</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="text-black w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Masukkan bio singkat"
                        rows="4"
                    />
                </div>

                {/* Email Input */}
                <div className="mb-6">
                    <label className="block text-left text-xl font-medium text-gray-800 mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-black w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Masukkan email"
                    />
                </div>

                {/* Favorite Game Input */}
                <div className="mb-8">
                    <label className="block text-left text-xl font-medium text-gray-800 mb-2">Game Favorit</label>
                    <input
                        type="text"
                        value={favoriteGame}
                        onChange={(e) => setFavoriteGame(e.target.value)}
                        className="text-black w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Masukkan game favorit"
                    />
                </div>

                {/* Submit Button */}
                <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl font-bold rounded-lg shadow-md transform hover:scale-105 transition duration-300"
                    >
                        Simpan Perubahan ✨
                    </button>
                </div>
            </form>

            <div className="mt-6">
                <Link href="/profile">
                    <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg font-bold rounded-lg shadow-md hover:bg-gradient-to-l transition duration-300">
                        Kembali ke Profil
                    </button>
                </Link>
            </div>
        </main>
    );
};

export default EditProfilePage;
