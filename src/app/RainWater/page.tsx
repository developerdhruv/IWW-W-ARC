'use client'
import React, { useState } from 'react';
import Navbar from '../Components/Navbar'; // Import the Navbar component

const RainwaterPrediction: React.FC = () => {
  
  const [formData, setFormData] = useState({
    rainfall: '',
    temperature: '',
    humidity: '',
    windSpeed: '',
    roofArea: '',
    currentStorage: '',
    maxCapacity: '',
  });
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      rainfall,
      temperature,
      humidity,
      windSpeed,
      roofArea,
      currentStorage,
      maxCapacity,
    } = formData;

    // Create 30 days of weather data (using the same values for simplicity)
    const weatherData = Array(30).fill([
      parseFloat(rainfall),
      parseFloat(temperature),
      parseFloat(humidity),
      parseFloat(windSpeed),
      parseFloat(roofArea),
      0,
    ]);

    try {
      const response = await fetch('http://localhost:7956/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weather_data: weatherData,
          current_storage: parseFloat(currentStorage),
          max_capacity: parseFloat(maxCapacity),
        }),
      });

      const data = await response.json();
      setResult(`
        <h2 class="text-xl text-black font-semibold mb-2">Prediction Results:</h2>
        <p class="text-lg text-black mb-1">Predicted Harvestable Water: ${data.predicted_harvestable_water.toFixed(2)} m³</p>
        <p class="text-lg text-black">Suggestion: ${data.suggestion}</p>
      `);
    } catch (error) {
      console.error('Error:', error);
      setResult('<p class="text-red-500">An error occurred. Please try again.</p>');
    }
  };

  return (
    <div>
      <Navbar /> {/* Add Navbar component here */}

      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Rainwater Harvesting Prediction</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full text-black max-w-lg">
          {Object.keys(formData).map((key) => (
            <div key={key} className="mb-4">
              <label htmlFor={key} className="block text-gray-700 font-medium mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1')}: {/* Capitalize and add space before uppercase letters */}
              </label>
              <input
                type="number"
                id={key}
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                required
                step="0.01"
                text-black
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
          >
            Predict
          </button>
        </form>

        {result && (
          <div
            className="mt-8 p-6 bg-white rounded-lg shadow-md w-full max-w-lg"
            dangerouslySetInnerHTML={{ __html: result }}
          />
        )}
      </div>
      <footer className="bg-gray-200 text-center p-4">

      <p className='text-black'> © All Rights Reserved to Kendriya Vidyalya President Estate</p>
      </footer>
    </div>
  );
};

export default RainwaterPrediction;
