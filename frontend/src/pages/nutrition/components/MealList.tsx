import React from 'react';
import Camera from '../assets/Group 22.png';
import Add from '../assets/Vector.png';
import Upload from '../assets/Upload.png';
import Reset from '../assets/Reload.png';

interface Meal {
  name: string;
  calories: number;
  protein: number;
}

interface MealListProps {
  meals: Meal[];
  onOpenCamera: () => void;
  onOpenUpload: () => void;
  onOpenText: () => void;
  onClearMeals: () => void; // Add this prop
}

const MealList: React.FC<MealListProps> = ({ meals, onOpenCamera, onOpenUpload, onOpenText, onClearMeals }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-semibold">Today's Meals</h2>
          <img
            src={Reset}
            alt="Reset Meals Icon"
            className="w-6 h-6 cursor-pointer object-contain"
            onClick={onClearMeals} // Attach the clear meals handler
          />
        </div>
        <div className="flex space-x-4 border-2">
          <img src={Camera} alt="Camera Icon" className="w-6 h-6 cursor-pointer object-contain" onClick={onOpenCamera} />
          <img src={Add} alt="Add Icon" className="w-6 h-6 cursor-pointer object-contain" onClick={onOpenText} />
          <img src={Upload} alt="Upload Icon" className="w-6 h-6 cursor-pointer object-contain" onClick={onOpenUpload} />
        </div>
      </div>

      <div className="overflow-y-auto flex-grow">
        {meals.map((meal, index) => (
          <div key={index} className="bg-gray-300 p-4 rounded-lg shadow-[0_3px_3px_rgba(0,0,0,0.3)] mb-4">
            <h3 className="text-xl font-semibold">{meal.name}</h3>
            <p className="text-sm mt-2">
              Calories: {meal.calories} <span className="font-sans">•</span> Protein: {meal.protein}g
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default MealList;
