import React from 'react';
import { useNavigate } from 'react-router-dom';
import Target from '../assets/Page-1.png';
import Nutrition from '../assets/Group.png';
import Clipboard from '../assets/Group (1).png';
import FridgeIcon from '../assets/Group 8.png';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-96 h-screen flex justify-center items-center font-mali">
      {/* Outer semi-opaque border */}
      <div className="w-80 h-[90%] bg-white bg-opacity-20 rounded-[2rem] shadow-lg p-6 border border-1">
        {/* Inner main white section */}
        <div className="w-full h-full bg-white rounded-3xl p-4 flex flex-col">
          {/* Title */}
          <h1 className="text-center text-2xl font-semibold mb-8">Fridge</h1>

          {/* Service Options */}
          <div className="flex flex-col space-y-4 flex-grow">
            <button
              onClick={() => navigate('/a/goals')}
              className="flex items-center space-x-2 p-2 rounded-md bg-gray-100 hover:bg-gray-300 border-2 border-transparent hover:border-transparent"
            >
              <img src={Target} alt="Goals & Stats" className="w-6 h-6" />
              <span>Goals & Stats</span>
            </button>
            <button
              onClick={() => navigate('/a/tracker')}
              className="flex items-center space-x-2 p-2 rounded-md bg-gray-100 hover:bg-gray-300 border-2 border-transparent hover:border-transparent"
            >
              <img src={Nutrition} alt="Nutrition Tracker" className="w-6 h-6" />
              <span>Nutrition Tracker</span>
            </button>
            <button
              className="flex items-center space-x-2 p-2 rounded-md bg-gray-100 hover:bg-gray-300 border-2 border-transparent hover:border-transparent"
            >
              <img src={Clipboard} alt="Meal Plan" className="h-6" />
              <span>Meal Plan</span>
            </button>
          </div>

          {/* Fridge Option */}
          <div className="mt-4 flex items-center justify-center">
            <button
              className="flex w-full items-center space-x-2 p-2 rounded-md bg-gray-100 hover:bg-gray-300 border-2 border-transparent hover:border-transparent"
            >
              <img src={FridgeIcon} alt="My Fridge" className="w-6" />
              <span>My Fridge</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
