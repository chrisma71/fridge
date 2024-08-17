import React from 'react';
import Camera from '../assets/Group 22.png';
import Add from '../assets/Vector.png';

interface Meal {
  name: string;
  calories: number;
  protein: number;
}

interface MealListProps {
  meals: Meal[];
}

const MealList: React.FC<MealListProps> = ({ meals }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-full flex flex-col">
      {/* Title and Icons */}
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h2 className="text-2xl font-semibold">Today's Meals</h2>
        <div className="flex space-x-4">
          <img src={Camera} alt="Camera Icon" className="w-6 h-6 cursor-pointer object-contain" />
          <img src={Add} alt="Add Icon" className="w-6 h-6 cursor-pointer object-contain" />
        </div>
      </div>

      {/* Meal List - Scrollable Area */}
      <div className="overflow-y-auto flex-grow">
        {meals.map((meal, index) => (
          <div key={index} className="bg-gray-300 p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-xl font-semibold">{meal.name}</h3>
            <p className="text-sm mt-2">Calories: {meal.calories} <span className='font-sans'>•</span> Protein: {meal.protein}g</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealList;
