'use client';

import React, { useState } from 'react';

export default function Daftar() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Anda dapat menambahkan logika pendaftaran di sini, seperti mengirim data ke server.
    console.log('Form submitted:', formData);
    alert('Pendaftaran berhasil!');
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <div className="bg-[#F0CEA9] p-8 rounded-lg max-w-full w-full max-h-full shadow-xl">
          <div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <h1 className="text-4xl font-bold text-[#1e40af] mb-5 font-serif tracking-wide">
                Daftar Sekarang
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-700">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 mt-2 rounded-lg bg-white text-black"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 mt-2 rounded-lg bg-white text-black"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 mt-2 rounded-lg bg-white text-black"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#1e40af] text-white hover:bg-blue-950 mt-4"
                >
                  Daftar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
