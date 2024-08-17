import React, { useState } from 'react';
import Sidebar from '../goals&info/components/sidebar'; // Adjust the path based on your structure
import SetGoal from './components/setGoal';
import MealList from './components/MealList'; // Import the MealList component
import ProgressBar from './components/ProgressBar'; // Import the ProgressBar component

const NutritionTracker: React.FC = () => {
  // Mock data for meals - you can update this to fetch from state or a database
  const [meals, setMeals] = useState([
    { name: 'Fried Chicken', calories: 500, protein: 500 },
    { name: 'Watermelon', calories: 50, protein: 1 },
    { name: 'Fried Chicken', calories: 500, protein: 500 },
    { name: 'Watermelon', calories: 50, protein: 1 },
    { name: 'Fried Chicken', calories: 500, protein: 500 },
    { name: 'Watermelon', calories: 50, protein: 1 },
    { name: 'Fried Chicken', calories: 500, protein: 500 },
    { name: 'Watermelon', calories: 50, protein: 1 },
  ]);

  // Calculate total calories and protein from meals
  const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);
  const totalProtein = meals.reduce((acc, meal) => acc + meal.protein, 0);

  // Mock goals for calories and protein
  const calorieGoal = 2000;
  const proteinGoal = 100;

  return (
    <div className="flex bg-gradient-to-tr from-[#F5776F] to-[#C1E1C1] min-h-screen w-screen font-mali">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-8 flex flex-row space-x-16 items-start h-screen overflow-hidden">
        {/* Meal List - Display Today's Meals */}
        <MealList meals={meals} />

        {/* Set Goal Component */}
        <div className="flex flex-col space-y-8 h-full">
          <SetGoal />
          <ProgressBar
            calorieGoal={calorieGoal}
            calorieIntake={totalCalories}
            proteinGoal={proteinGoal}
            proteinIntake={totalProtein}
          />
        </div>
      </div>
    </div>
  );
};

export default NutritionTracker;
