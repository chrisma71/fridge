import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppleImage from '../assets/image 1.png'; // Update the path according to your project structure
import Vector from '../assets/Vector TOP.png';

const Call: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full h-full bg-[#9fbcc7] font-mali">
      <img 
        src={Vector} 
        alt="Top Vector" 
        className="absolute top-0 left-0 w-full object-cover" 
      />
      <h2 className="text-center text-4xl font-normal mb-4 mt-[24rem]">
        Reach your Goals with
      </h2>
      <h1 className="text-center text-[6rem] font-medium mb-8">FRIDGE</h1>
      <div className="relative flex items-center justify-center mb-8">
        <img src={AppleImage} alt="Apple" className="relative object-contain z-10" />
      </div>
      <div
        className="cursor-pointer border-2 border-[#EBA8A8] font-bold px-6 py-3 mb-16 text-2xl bg-[#EBA8A8] text-white rounded-2xl hover:bg-transparent hover:text-[#EBA8A8]"
        onClick={() => navigate('/a/goals')}
      >
        Begin Today
      </div>
    </div>
  );
};

export default Call;
