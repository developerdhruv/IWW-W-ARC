'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './Components/Navbar';

const HomePage: React.FC = () => {
  const router = useRouter();

  const navigateToPage = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar /> {/* Include the Navbar component */}

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-12">
          Welcome to the Water Management Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Leak Detection Button */}
          <div
            onClick={() => navigateToPage('/LeakDet')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-6 px-8 rounded-lg cursor-pointer shadow-md transition duration-200"
          >
            <h2 className="text-2xl text-center">Leak Detection</h2>
            <p className="text-center mt-2">Navigate to the Leak Detection page.</p>
          </div>

          {/* Irrigation Prediction Button */}
          <div
            onClick={() => navigateToPage('/Irrigation')}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-6 px-8 rounded-lg cursor-pointer shadow-md transition duration-200"
          >
            <h2 className="text-2xl text-center">Irrigation Prediction</h2>
            <p className="text-center mt-2">Navigate to the Irrigation page.</p>
          </div>

          {/* Rainwater Harvesting Prediction Button */}
          <div
            onClick={() => navigateToPage('/RainWater')}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-6 px-8 rounded-lg cursor-pointer shadow-md transition duration-200"
          >
            <h2 className="text-2xl text-center">Rainwater Harvesting</h2>
            <p className="text-center mt-2">Navigate to the Rainwater Harvesting page.</p>
          </div>

          {/* Other Feature Button */}
          <div
            onClick={() => navigateToPage('/ScenerioGen')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-6 px-8 rounded-lg cursor-pointer shadow-md transition duration-200"
          >
            <h2 className="text-2xl text-center">Scenario Generator</h2>
            <p className="text-center mt-2">Navigate to Scenario Generator.</p>
          </div>
        </div>
      </main>
      <footer className="bg-gray-200 text-center p-4">

      <p className='text-black'> © All Rights Reserved to Kendriya Vidyalya President Estate</p>
      </footer>
    </div>
  );
};

export default HomePage;