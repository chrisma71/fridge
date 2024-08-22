import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface GoalSettingFormProps {
  onGoalUpdate: (newCalorieGoal: number, newProteinGoal: number) => void;
}

const GoalSettingForm: React.FC<GoalSettingFormProps> = ({ onGoalUpdate }) => {
  const [calorieGoal, setCalorieGoal] = useState('');
  const [proteinGoal, setProteinGoal] = useState('');

  const handleSetGoal = async () => {
    const userId = Cookies.get('userId');
    if (!userId) {
      alert('User not found');
      return;
    }

    const newCalorieGoal = parseInt(calorieGoal, 10);
    const newProteinGoal = parseInt(proteinGoal, 10);

    // Validate that both goals are numbers and greater than 0
    if (isNaN(newCalorieGoal) || newCalorieGoal <= 0 || isNaN(newProteinGoal) || newProteinGoal <= 0) {
      alert('Please enter valid numbers for both calorie and protein goals.');
      return;
    }

    try {
      // Make a POST request to update the user's goals
      await axios.post(`https://myfridge-0q77.onrender.com/api/users/${userId}/goals`, {
        calorieGoal: newCalorieGoal,
        proteinGoal: newProteinGoal,
      });

      // Call the callback function to update the goals in the parent component
      onGoalUpdate(newCalorieGoal, newProteinGoal);

      // Clear the form after submission
      setCalorieGoal('');
      setProteinGoal('');
      alert('Goals updated successfully!');
    } catch (error) {
      console.error('Error updating goals:', error);
      alert('Failed to update goals.');
    }
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
            step="100"
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
            step="10"
          />
        </div>
      </div>

      <div
        onClick={handleSetGoal}
        className="cursor-pointer text-center w-full p-4 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600"
      >
        Set Goal
      </div>
    </div>
  );
};

export default GoalSettingForm;
