import React, { useState } from 'react';
import Sidebar from '../goals&info/components/sidebar'; // Adjust the path based on your structure
import Search from './assets/Vector.png';

const RecipeMaker: React.FC = () => {
  const [purchaseExtra, setPurchaseExtra] = useState(false);
  const [dietaryRestrictions, setDietaryRestrictions] = useState(false);

  const togglePurchaseExtra = () => setPurchaseExtra(!purchaseExtra);
  const toggleDietaryRestrictions = () => setDietaryRestrictions(!dietaryRestrictions);

  return (
    <div className="flex bg-gradient-to-tr from-[#9C9AF3] to-[#FDD1E2] min-h-screen w-screen font-mali">
      <Sidebar />
      <div className="flex-1 p-8 flex flex-col">
        {/* Main Heading */}
        <div className='flex flex-row space-x-16'>
          {/* Top Section: Search and Settings */}
          <div className="w-full bg-white rounded-lg shadow-lg p-6 mb-8 flex justify-between items-center space-x-4">
            
            {/* Search Bar with Button Inside */}
            <div className="flex flex-1 items-center relative">
              <input
                type="text"
                placeholder="Make a Recipe for..."
                className="w-full p-3 rounded-lg border border-gray-300 pr-12 bg-[#D9D9D9]"
              />
              <div className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-4 py-2 border-l border-l-[#9B9B9B]">
                <img src={Search} alt="Search Icon" className='w-6 object-contain' />
              </div>
            </div>

            {/* Purchase Extra and Dietary Restrictions Toggles */}
            <div className="flex flex-col items-end space-y-2">
              <div className="flex items-center justify-between space-x-2">
                <span>Purchase Extra</span>
                <div
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                    purchaseExtra ? 'bg-[#019C96]' : 'bg-gray-600'
                  }`}
                  onClick={togglePurchaseExtra}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                      purchaseExtra ? 'translate-x-6' : ''
                    }`}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <span>Dietary Restrictions</span>
                <div
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                    dietaryRestrictions ? 'bg-[#019C96]' : 'bg-gray-600'
                  }`}
                  onClick={toggleDietaryRestrictions}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                      dietaryRestrictions ? 'translate-x-6' : ''
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Combined Middle Section: Ingredients and Steps */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 flex-grow flex">
          <div className="grid grid-cols-2 gap-8 w-full">
            {/* Ingredients */}
            <div className='flex flex-col justify-center items-center h-full'>
              <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
              <ul className="list-disc pl-5 space-y-2 w-full bg-[#D9D9D9] p-6 rounded-lg flex-grow">
                <div className='p-4'>
                  <li>4 boneless chicken breasts</li>
                  <li>2 cups of all-purpose flour</li>
                  <li>1/2 cup of cornmeal</li>
                  <li>1/4 cup of cornstarch</li>
                  {/* Add more ingredients here */}
                </div>
              </ul>
            </div>

            {/* Steps */}
            <div className='flex flex-col justify-center items-center h-full'>
              <h2 className="text-2xl font-semibold mb-4">Steps</h2>
              <ol className="list-decimal pl-5 space-y-2 w-full bg-[#D9D9D9] p-6 rounded-lg flex-grow">
                <div className='p-4'>
                  <li>Whisk together buttermilk and hot sauce in a large bowl.</li>
                  <li>Submerge chicken breasts in the marinade, cover, and refrigerate for at least 2 hours.</li>
                  <li>Combine flour, cornmeal, cornstarch, and seasonings in a shallow dish.</li>
                  {/* Add more steps here */}
                </div>
              </ol>
            </div>
          </div>
        </div>

        {/* Bottom Section: Add to Nutrition Tracker */}
        <div className="flex justify-center">
            <button className="bg-blue-500 text-white px-8 py-3 rounded-lg">
              Add to Nutrition Tracker
            </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeMaker;
