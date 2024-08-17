import React from 'react';
import Vector from '../assets/Vector.png'; // Make sure to adjust the path according to your project structure

const Home: React.FC = () => {
  return (
    <div className="relative flex flex-col justify-center min-h-screen w-full h-full bg-[#C1E1C1]">
      <main className="flex flex-col items-start justify-center flex-grow font-mali text-black pl-36"> {/* Moved pl-36 to main for text alignment */}
        <h3 className="text-5xl mb-8">Begin your journey to a healthier life</h3>
        <h1 className="text-[6rem] mb-4">with FRIDGE</h1>
        <h2 className="text-3xl mb-8">What’s in your fridge today?</h2>
        <div className="cursor-pointer border-2 border-[#EBA8A8] font-bold px-6 py-3 mb-16 text-2xl bg-[#EBA8A8] text-white rounded-2xl hover:bg-transparent hover:text-[#EBA8A8]">
        Join Us 
      </div>
      </main>
      <img 
        src={Vector} 
        alt="Wave" 
        className="absolute bottom-0 left-0 w-full object-contain" 
      /> {/* Ensured the wave image is at the bottom without being pushed by padding */}
    </div>
  );
};

export default Home;
