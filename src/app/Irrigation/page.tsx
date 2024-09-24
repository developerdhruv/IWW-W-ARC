'use client'
import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';
import axios from 'axios';
import Navbar from '../Components/Navbar';

// Navbar component


const IrrigationRecommendation = () => {
  const [formData, setFormData] = useState({
    date: '',
    temperature: '',
    humidity: '',
    soil_moisture: '',
    rainfall_last_7days: '',
    crop_type: 'wheat',
    growth_stage: 'vegetative',
    soil_type: 'loam',
    area_hectares: '',
    sunlight_hours: '',
    wind_speed: ''
  });

  const [recommendation, setRecommendation] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:9082/predict', formData);
      setRecommendation(response.data.irrigation_amount_liters);
    } catch (err) {
      setError('Error fetching recommendation. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { name: 'Previous', amount: recommendation ? recommendation * 0.9 : 0 },
    { name: 'Current', amount: recommendation || 0 },
    { name: 'Projected', amount: recommendation ? recommendation * 1.1 : 0 },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Irrigation Recommendation System</h1>
        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date:</label>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Temperature (°C):</label>
              <input type="number" name="temperature" value={formData.temperature} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Humidity (%):</label>
              <input type="number" name="humidity" value={formData.humidity} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Soil Moisture (%):</label>
              <input type="number" name="soil_moisture" value={formData.soil_moisture} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rainfall (last 7 days, mm):</label>
              <input type="number" name="rainfall_last_7days" value={formData.rainfall_last_7days} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Crop Type:</label>
              <select name="crop_type" value={formData.crop_type} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded">
                <option value="wheat">Wheat</option>
                <option value="rice">Rice</option>
                <option value="corn">Corn</option>
                <option value="cotton">Cotton</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Growth Stage:</label>
              <select name="growth_stage" value={formData.growth_stage} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded">
                <option value="seedling">Seedling</option>
                <option value="vegetative">Vegetative</option>
                <option value="flowering">Flowering</option>
                <option value="fruiting">Fruiting</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Soil Type:</label>
              <select name="soil_type" value={formData.soil_type} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded">
                <option value="clay">Clay</option>
                <option value="loam">Loam</option>
                <option value="sandy">Sandy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Area (hectares):</label>
              <input type="number" name="area_hectares" value={formData.area_hectares} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sunlight Hours:</label>
              <input type="number" name="sunlight_hours" value={formData.sunlight_hours} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Wind Speed (km/h):</label>
              <input type="number" name="wind_speed" value={formData.wind_speed} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" required />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600" disabled={loading}>
            {loading ? 'Loading...' : 'Get Recommendation'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {recommendation !== null && (
          <div className="mt-8 text-black">
            <h2 className="text-xl font-semibold mb-2">Recommendation:</h2>
            <p className="text-lg">Recommended irrigation amount: <span className="font-bold">{recommendation.toFixed(2)} liters</span></p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Irrigation Trend</h3>
              <AreaChart width={500} height={300} data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </div>
          </div>
        )}
      </div>9
      
    </div>
    
  );
};

export default IrrigationRecommendation;
