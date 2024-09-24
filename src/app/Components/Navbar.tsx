'use client'
'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const router = useRouter();

  const navigateToPage = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className='flex items-center justify-between w-36'>
        <img
          src="/favicon.ico"
          alt="Logo"
          className="w-10 h-10 rounded-full my-1"
        />
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigateToPage('/')}
        >
          W-ARC
        </h1>
        </div>
        <div className="space-x-4">
          <button
            onClick={() => navigateToPage('/LeakDet')}
            className="hover:bg-teal-600 px-4 py-2 rounded-md transition duration-200"
          >
            Leak Detection
          </button>
          <button
            onClick={() => navigateToPage('/Irrigation')}
            className="hover:bg-blue-600 px-4 py-2 rounded-md transition duration-200"
          >
            Irrigation Prediction
          </button>
          <button
            onClick={() => navigateToPage('/RainWater')}
            className="hover:bg-indigo-600 px-4 py-2 rounded-md transition duration-200"
          >
            Rainwater Harvesting
          </button>
          <button
            onClick={() => navigateToPage('/ScenerioGen')}
            className="hover:bg-yellow-600 px-4 py-2 rounded-md transition duration-200"
          >
            Scenario Generator
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
