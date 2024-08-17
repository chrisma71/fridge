import React, { useState } from 'react';

const GoalSettingForm: React.FC = () => {
  const [calorieGoal, setCalorieGoal] = useState('');
  const [proteinGoal, setProteinGoal] = useState('');

  const handleSetGoal = () => {
    // Here you can handle saving the goal information, either to a database or state management
    console.log({
      calorieGoal,
      proteinGoal,
    });

    // Clear the form after submission
    setCalorieGoal('');
    setProteinGoal('');
  };

  return (
    <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Set Your Goals</h2>
      <div className="flex flex-row space-x-4">
        <div className="mb-4 w-1/2">
          <label className="block text-lg font-semibold mb-2">Daily Calorie Goal</label>
          <input
            type="number"
            value={calorieGoal}
            onChange={(e) => setCalorieGoal(e.target.value)}
            className="w-full p-4 rounded-lg bg-[#D9D9D9] border-2 focus:outline-none focus:border-blue-400"
            placeholder="Enter calories"
            min="0"
          />
        </div>

        <div className="mb-4 w-1/2">
          <label className="block text-lg font-semibold mb-2">Daily Protein Goal (g)</label>
          <input
            type="number"
            value={proteinGoal}
            onChange={(e) => setProteinGoal(e.target.value)}
            className="w-full p-4 rounded-lg bg-[#D9D9D9] border-2 focus:outline-none focus:border-blue-400"
            placeholder="Enter protein"
            min="0"
          />
        </div>
      </div>

      <button
        onClick={handleSetGoal}
        className="w-full p-4 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600"
      >
        Set Goal
      </button>
    </div>
  );
};

export default GoalSettingForm;
