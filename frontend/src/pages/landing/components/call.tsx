import React from 'react';
import AppleImage from '../assets/image 1.png'; // Update the path according to your project structure

const Call: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full h-full bg-[#9fbcc7] font-mali">
      <h2 className="text-center text-xl font-semibold mb-4">Reach your Goals with</h2>
      <h1 className="text-center text-[4rem] font-bold mb-8">FRIDGE</h1>

      {/* Blurred Circle Background */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute w-80 h-80 bg-[#07241a] rounded-full blur-[100px]"></div> {/* Blurred circle behind */}
        <img src={AppleImage} alt="Apple" className="relative object-contain z-10" /> {/* Apple Image */}
      </div>

      {/* Button */}
      <div className="cursor-pointer border-2 border-[#EBA8A8] font-bold px-6 py-3 text-2xl bg-[#EBA8A8] text-white rounded-2xl hover:bg-transparent hover:text-[#EBA8A8]">
        Begin Today
      </div>
    </div>
  );
};

export default Call;
