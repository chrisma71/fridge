import React from 'react';
import { useNavigate } from 'react-router-dom';
import FridgeImage from '../assets/file (2).png'; // Replace with the actual image path
import BroccoliImage from '../assets/file (4).png'; // Replace with the actual image path
import Vector from '../assets/Vector TOP.png';

const Call: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen bg-[#CDE2EA] font-mali">
            <img 
        src={Vector} 
        alt="Top Vector" 
        className="absolute top-0 left-0 w-full object-cover" 
      />

      {/* Section 1 */}
      <div className="flex items-center justify-between w-full max-w-5xl py-12 px-8 mt-96">
        <img
          src={FridgeImage}
          alt="Fridge"
          className="w-80 h-auto transform transition-transform duration-300 hover:-translate-y-2 hover:scale-105"
        />
        <div className="text-right">
          <h2 className="text-4xl font-bold mb-4">Transform Your Health Journey with myFridge!</h2>
          <p className="text-xl">
            Welcome to myFridge, the ultimate app designed to make healthy eating easy, personalized, and fun. 
            Our innovative features empower you to take control of your diet and health goals, all from the comfort of your kitchen.
          </p>
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex items-center justify-between w-full max-w-5xl py-6 px-8">
        <div className="text-left">
          <h2 className="text-4xl font-bold mb-4">Discover What’s in Your Fridge Today</h2>
          <p className="text-xl">
            myFridge isn't just another food app—it’s your personal nutrition assistant. 
            With myFridge, you can effortlessly manage your food, plan meals, and achieve your health goals. 
            Here’s what makes us stand out:
          </p>
        </div>
        <img
          src={BroccoliImage}
          alt="Broccoli"
          className="w-80 h-auto transform transition-transform duration-300 hover:-translate-y-2 hover:scale-105"
        />
      </div>

      {/* Section 3 */}
      <div className="flex justify-center w-full py-12">
        <div
          className="cursor-pointer bg-[#6BBDFF] text-white text-xl px-8 py-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:scale-105"
          onClick={() => navigate('/a/goals')}
        >
          Begin Today
        </div>
      </div>
    </div>
  );
};

export default Call;
