"use client";

import React, { useState } from "react";
import Navbar from "../NavBar/navbar";
import Link from 'next/link';
import Image from "next/image";  // Import Image from next/image

const ProfilePage = () => {
    const [userData] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        profilePicture: "/path/to/profile-pic.jpg", // ganti dengan path gambar profil
    });

    return (
        <main className="bg-gradient-to-r from-[#F6C6EA] via-[#D4C1FF] to-[#FFEDD5] min-h-screen">
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-6">
                    Profil Pengguna
                </h1>

                <div className="container flex justify-center items-center">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
                        <Image
                            src="/images/nusa.png" // Path gambar profil
                            alt="Profile Picture"
                            width={192} // Lebar gambar
                            height={192} // Tinggi gambar
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="flex justify-center text-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
                        <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
                        <p className="text-xl text-gray-600 mt-2">{userData.email}</p>

                        <div className="mt-6">
                            <Link href="/edit-profil">
                                <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg font-bold rounded-lg shadow-md hover:bg-gradient-to-l transition duration-300">
                                    Edit Profil
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
