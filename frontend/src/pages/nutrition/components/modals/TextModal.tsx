import React, { useState } from 'react';
import Close from '../../assets/Close.png'; // Ensure the correct path to your Close image

interface TextModalProps {
  onClose: () => void;
  userId: string; // Pass userId to identify the user
  onAddMeal: (meal: { name: string; calories: number; protein: number }) => Promise<void>; // Pass function to handle meal addition
}

const TextModal: React.FC<TextModalProps> = ({ onClose, userId, onAddMeal }) => {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState<number | ''>('');
  const [protein, setProtein] = useState<number | ''>('');

  const handleAddMeal = async () => {
    if (name && calories && protein) {
      try {
        const meal = { name, calories: Number(calories), protein: Number(protein) };
        
        // Use the onAddMeal function passed from the parent component
        await onAddMeal(meal);

        alert("Meal added successfully!");
        onClose(); // Close the modal after adding the meal
      } catch (error) {
        console.error("Error adding meal:", error);
        alert("Failed to add meal.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white p-6 rounded-lg">
        {/* Close Icon */}
        <img 
          src={Close} 
          alt="Close Icon" 
          className="absolute top-2 right-2 w-6 h-6 cursor-pointer"
          onClick={onClose}
        />

        <h2 className="text-lg font-semibold mb-4">Add a Meal</h2>

        <div className="mb-4">
          <label className="block text-sm mb-2">Name of the Meal</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-300 focus:outline-none"
            placeholder="Name of the Meal"
          />
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm mb-2">Calories</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-gray-300 focus:outline-none"
              placeholder="Calories"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-2">Protein</label>
            <input
              type="number"
              value={protein}
              onChange={(e) => setProtein(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-gray-300 focus:outline-none"
              placeholder="Protein"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleAddMeal}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Meal
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextModal;
