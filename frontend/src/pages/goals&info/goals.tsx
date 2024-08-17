import React, { useState } from 'react';
import Sidebar from './components/sidebar'; // Adjust the path based on your structure
import axios from 'axios';

const Goals: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [goals, setGoals] = useState('');
  const [calorieGoal, setCalorieGoal] = useState<number | ''>('');
  const [proteinGoal, setProteinGoal] = useState<number | ''>('');
  const [preferences, setPreferences] = useState(''); // Add preferences state

  const handleChange = (setter: React.Dispatch<React.SetStateAction<number | ''>>, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setter(value);
    } else {
      setter('');
    }
  };

  const handleSubmit = async () => {
    try {
      const userId = getCookie('userId');
      console.log('User ID from cookie:', userId);
      if (userId) {
        await axios.post(`http://localhost:5000/api/users/${userId}/goals`, {
          name,
          age,
          weight,
          goals,
          calorieGoal,
          proteinGoal,
          preferences, // Include preferences in the POST request
        });
        alert('Goals saved successfully!');
      } else {
        alert('User ID not found in cookies.');
      }
    } catch (error) {
      console.error('Error saving goals:', error);
    }
  };

  // Function to get cookies
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return '';
  };

  return (
    <div className="flex bg-gradient-to-tr from-[#F5776F] to-[#C1E1C1] min-h-screen w-screen font-mali">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-8 flex justify-center items-center">
        <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
          {/* Left and Middle Columns */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            {/* Name Input */}
            <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
              <label className="block text-lg font-semibold mb-2">What’s your name?</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 rounded-lg bg-[#D9D9D9] focus:outline-none focus:border-blue-400"
                placeholder="Enter your name"
              />
            </div>

            {/* Age Input */}
            <div className="col-span-1 bg-white p-4 rounded-lg shadow-md">
              <label className="block text-lg font-semibold mb-2">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => handleChange(setAge, e)}
                className="w-full p-4 rounded-lg bg-[#D9D9D9] border-2 focus:outline-none focus:border-blue-400"
                placeholder="Enter your age"
                min="0"
              />
            </div>

            {/* Weight Input */}
            <div className="col-span-1 bg-white p-4 rounded-lg shadow-md">
              <label className="block text-lg font-semibold mb-2">Weight (lbs)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => handleChange(setWeight, e)}
                className="w-full p-4 rounded-lg bg-[#D9D9D9] border-2 focus:outline-none focus:border-blue-400"
                placeholder="Enter your weight"
                min="0"
                step="10"
              />
            </div>

            {/* Goals Input */}
            <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
              <label className="block text-lg font-semibold mb-2">Goals</label>
              <input
                type="text"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="w-full p-4 rounded-lg bg-[#D9D9D9] border-2 focus:outline-none focus:border-blue-400"
                placeholder="Enter your goals"
              />
            </div>

            {/* Daily Calorie Goal Input */}
            <div className="col-span-1 bg-white p-4 rounded-lg shadow-md">
              <label className="block text-lg font-semibold mb-2">Daily Calorie Goal</label>
              <input
                type="number"
                value={calorieGoal}
                onChange={(e) => handleChange(setCalorieGoal, e)}
                className="w-full p-4 rounded-lg bg-[#D9D9D9] border-2 focus:outline-none focus:border-blue-400"
                placeholder="Enter your daily calorie goal"
                min="0"
                step="100"
              />
            </div>

            {/* Daily Protein Goal Input */}
            <div className="col-span-1 bg-white p-4 rounded-lg shadow-md">
              <label className="block text-lg font-semibold mb-2">Daily Protein Goal</label>
              <input
                type="number"
                value={proteinGoal}
                onChange={(e) => handleChange(setProteinGoal, e)}
                className="w-full p-4 rounded-lg bg-[#D9D9D9] border-2 focus:outline-none focus:border-blue-400"
                placeholder="Enter your daily protein goal"
                min="0"
                step="10"
              />
            </div>

            {/* Preferences Input */}
            <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
              <label className="block text-lg font-semibold mb-2">Preferences</label>
              <input
                type="text"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                className="w-full p-4 rounded-lg bg-[#D9D9D9] border-2 focus:outline-none focus:border-blue-400"
                placeholder="Enter your dietary preferences"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="col-span-3 flex justify-center mt-4">
            <button
              onClick={handleSubmit}
              className="w-1/4 p-4 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
