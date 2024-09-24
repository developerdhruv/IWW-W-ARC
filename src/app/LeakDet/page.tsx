'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '../Components/Navbar';
// Navbar component

const LeakDetectionSystem = () => {
  interface FormData {
    pressure: string;
    flow_rate: string;
    vibration: string;
    temperature: string;
    acoustic_signal: string;
    pipe_age: string;
    distance: string;
  }

  const [formData, setFormData] = useState<FormData>({
    pressure: '',
    flow_rate: '',
    vibration: '',
    temperature: '',
    acoustic_signal: '',
    pipe_age: '',
    distance: '',
  });

  interface Prediction {
    leak_detected: boolean;
    leak_probability: number;
    leak_location: number;
  }

  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputFields = [
    { name: 'pressure', label: 'Pressure (PSI)', description: 'The current pressure in the pipeline, measured in pounds per square inch (PSI). Normal range: 50-100 PSI.' },
    { name: 'flow_rate', label: 'Flow Rate (GPM)', description: 'The rate of water flow through the pipeline, measured in gallons per minute (GPM). Normal range: 100-500 GPM.' },
    { name: 'vibration', label: 'Vibration (mm/s)', description: 'The amount of vibration detected in the pipeline, measured in millimeters per second (mm/s). Normal range: 0-10 mm/s.' },
    { name: 'temperature', label: 'Temperature (°C)', description: 'The temperature of the water or surrounding environment, measured in degrees Celsius (°C). Normal range: 10-30°C.' },
    { name: 'acoustic_signal', label: 'Acoustic Signal (dB)', description: 'The strength of acoustic signals detected in the pipeline, measured in decibels (dB). Normal range: 20-100 dB.' },
    { name: 'pipe_age', label: 'Pipe Age (years)', description: 'The age of the pipeline section being monitored, measured in years. Range: 0-50 years.' },
    { name: 'distance', label: 'Distance (m)', description: 'The distance along the pipeline where the measurements are taken, measured in meters (m). Range: 0-1000 m.' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:9052/predict', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setPrediction(response.data);
    } catch (err) {
      setError('Error fetching prediction. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderPipelineVisualization = () => {
    if (!prediction || !prediction.leak_detected) return null;

    const pipelineLength = 1000; // Assume 1000 units total length
    const leakLocation = prediction.leak_location;
    const data = [
      { distance: 0, value: 0 },
      { distance: leakLocation, value: 1 },
      { distance: pipelineLength, value: 0 },
    ];

    return (
      <div className="mt-4 text-black">
        <h3 className="text-lg font-semibold mb-2">Pipeline Visualization</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="distance" label={{ value: 'Distance along pipeline (m)', position: 'bottom' }} />
            <YAxis hide={true} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-center mt-2">Leak detected at {leakLocation.toFixed(2)} meters along the pipeline</p>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen text-black">
      <Navbar />
      <div className="max-w-3xl mx-auto p-4 items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 ml-20">Water Pipeline Leak Detection System</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {inputFields.map((field) => (
              <div key={field.name} className="border p-4 rounded-lg bg-white shadow-sm">
                <label className="block font-semibold text-gray-800">{field.label}:</label>
                <input 
                  type="number" 
                  name={field.name} 
                  value={formData[field.name]} 
                  onChange={handleInputChange} 
                  className="w-full p-2 border border-gray-300 rounded mt-1" 
                  required 
                />
                <p className="text-sm text-gray-600 mt-1">{field.description}</p>
              </div>
            ))}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" disabled={loading}>
            {loading ? 'Loading...' : 'Detect Leak'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {prediction && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Prediction Results:</h2>
            <p className="text-lg">
              Leak Detected: <span className={`font-bold ${prediction.leak_detected ? 'text-red-500' : 'text-green-500'}`}>
                {prediction.leak_detected ? 'Yes' : 'No'}
              </span>
            </p>
            <p className="text-lg">Leak Probability: <span className="font-bold">{(prediction.leak_probability * 100).toFixed(2)}%</span></p>
            {prediction.leak_detected && (
              <p className="text-lg">Leak Location: <span className="font-bold">{prediction.leak_location.toFixed(2)} meters</span></p>
            )}
            {renderPipelineVisualization()}
          </div>
        )}
      </div>
      <footer className="bg-gray-200 text-center p-4">

      <p className='text-black'> © All Rights Reserved to Kendriya Vidyalya President Estate</p>
      </footer>
    </div>
  );
};

export default LeakDetectionSystem;
