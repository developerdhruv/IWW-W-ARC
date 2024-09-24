'use client'
import { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar'; // Import the Navbar component

const WaterConservation = () => {
  const [numScenarios, setNumScenarios] = useState<number>(10);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<string | null>(null); // Modal state

  interface Scenario {
    Irrigation_Efficiency: number;
    Rainfall: number;
    Temperature: number;
    Soil_Moisture: number;
    Crop_Type: string;
    Water_Saved: number;
    Water_Conservation_Efficiency: number;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error before submission

    try {
      const response = await axios.post('http://127.0.0.1:5000/generate_scenarios', {
        num_scenarios: numScenarios,
      });
      setScenarios(response.data);
    } catch (error) {
      setError('Error generating scenarios. Please try again.');
    }
  };

  const columnDescriptions: Record<string, string> = {
    Irrigation_Efficiency: 'The efficiency of water delivery in irrigation systems, typically expressed as a percentage.',
    Rainfall: 'The amount of rain received during a specific period, measured in millimeters.',
    Temperature: 'The average temperature in degrees Celsius over the growing period.',
    Soil_Moisture: 'The amount of moisture present in the soil, essential for plant growth.',
    Crop_Type: 'The type of crop being grown, which may affect water needs.',
    Water_Saved: 'The total amount of water saved through conservation efforts, measured in liters.',
    Water_Conservation_Efficiency: 'The overall efficiency of water conservation methods, often expressed as a percentage.',
  };

  const handleCellClick = (columnName: string) => {
    setModalContent(columnDescriptions[columnName]);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div>
      <Navbar /> {/* Add Navbar component here */}

      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-md p-6 w-full max-w-lg">
          <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
            Water Conservation Scenario Generator
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Number of Scenarios:</span>
              <input
                type="number"
                value={numScenarios}
                onChange={(e) => setNumScenarios(parseInt(e.target.value))}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
                required
              />
            </label>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
            >
              Generate Scenarios
            </button>
          </form>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {scenarios.length > 0 && (
            <div className="mt-6 text-black">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Scenarios:</h2>
              <div className="overflow-auto max-h-96">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      {Object.keys(columnDescriptions).map((key) => (
                        <th key={key} className="px-4 py-2">{key.replace('_', ' ')}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((scenario, index) => (
                      <tr key={index} className="bg-gray-100 odd:bg-white">
                        {Object.keys(columnDescriptions).map((key) => (
                          <td
                            key={key}
                            className="border px-4 py-2 text-center cursor-pointer"
                            onClick={() => handleCellClick(key)}
                          >
                            {scenario[key as keyof Scenario]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal for displaying the column description */}
      {modalContent && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Column Description</h2>
            <p className="text-gray-700">{modalContent}</p>
            <button
              onClick={closeModal}
              className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaterConservation;
