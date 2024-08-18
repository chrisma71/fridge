import React from 'react';
import { useNavigate } from 'react-router-dom';
import Vector from '../assets/Vector.png'; // Adjust the path according to your project structure
import Fridge from '../assets/file.png';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col justify-center min-h-screen w-full h-full bg-[#C1E1C1]">
      <main className="flex items-center justify-between flex-grow font-mali text-black pl-36 pr-36">
        <div className="flex flex-col">
          <h3 className="text-5xl mb-8">Transform Your Health Journey</h3>
          <h1 className="text-[6rem] mb-4">with myFridge</h1>
          <h2 className="text-3xl mb-8">Discover What’s in Your Fridge Today</h2>
          <div
            className="cursor-pointer border-2 border-[#EBA8A8] w-[10rem] text-center font-bold px-6 py-3 mb-16 text-2xl shadow-[0_6px_3px_rgba(0,0,0,0.3)] bg-[#EBA8A8] text-white rounded-2xl transform transition-transform duration-300 hover:-translate-y-2 hover:scale-105"
            onClick={() => navigate('/a/goals')}
          >
            Join Us
          </div>
        </div>
        <div className="flex-shrink-0">
          <img 
            src={Fridge} 
            alt="Fridge" 
            className="object-contain w-[40rem] transform transition-transform duration-300 hover:-translate-y-2 hover:scale-105" 
          />
        </div>
      </main>
      <img 
        src={Vector} 
        alt="Wave" 
        className="absolute bottom-0 left-0 w-full object-contain" 
      />
    </div>
  );
};

export default Home;
