import React, { useState } from 'react';
import Sidebar from './components/sidebar'; // Adjust the path based on your structure

const Goals: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0); // Initialized with 0
  const [weight, setWeight] = useState(0); // Initialized with 0
  const [dietaryPreferences, setDietaryPreferences] = useState('');
  const [calorieGoal, setCalorieGoal] = useState(0); // Initialized with 0
  const [proteinGoal, setProteinGoal] = useState(0); // Initialized with 0
  const [goal, setGoal] = useState('');

  const handleChange = (setter: React.Dispatch<React.SetStateAction<number>>, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setter(value);
    }
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
                className="w-full p-4 rounded-lg bg-[#D9D9D9]   focus:outline-none focus:border-blue-400"
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
                className="w-full p-4 rounded-lg bg-[#D9D9D9] border-2  focus:outline-none focus:border-blue-400"
                placeholder="Enter your weight"
                min="0"
                step="10"
              />
            </div>

            {/* Dietary Preferences Input */}
            <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
              <label className="block text-lg font-semibold mb-2">Dietary Preferences</label>
              <input
                type="text"
                value={dietaryPreferences}
                onChange={(e) => setDietaryPreferences(e.target.value)}
                className="w-full p-4 rounded-lg bg-[#D9D9D9] border-2  focus:outline-none focus:border-blue-400"
                placeholder="Enter your dietary preferences"
              />
            </div>

            {/* Daily Calorie Goal Input */}
            <div className="col-span-1 bg-white p-4 rounded-lg shadow-md">
              <label className="block text-lg font-semibold mb-2">Daily Calorie Goal</label>
              <input
                type="number"
                value={calorieGoal}
                onChange={(e) => handleChange(setCalorieGoal, e)}
                className="w-full p-4 rounded-lg bg-[#D9D9D9] border-2  focus:outline-none focus:border-blue-400"
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
                className="w-full p-4 rounded-lg bg-[#D9D9D9] border-2  focus:outline-none focus:border-blue-400"
                placeholder="Enter your daily protein goal"
                min="0"
                step="10"
              />
            </div>
          </div>

          {/* Set a Goal Text Area - Rightmost Column */}
          <div className="col-span-1 bg-white p-4 rounded-lg shadow-md flex flex-col">
            <label className="block text-lg font-semibold mb-2">Set a Goal</label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="flex-grow p-4 rounded-lg bg-[#D9D9D9] border-2  focus:outline-none focus:border-blue-400"
              placeholder="Describe your goal..."
            />
          </div>

          {/* Save Button */}
          <div className="col-span-3 flex justify-center mt-4">
            <button className="w-1/4 p-4 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
