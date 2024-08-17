import React from 'react';
import Fruits from '../assets/fruits.png';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen w-screen h-full bg-[#C1E1C1]">
      <header className="flex justify-end p-4 font-mali">
        <p className="mx-2 text-lg cursor-pointer mr-16">Login</p>
        <p className="mx-2 text-lg cursor-pointer">Sign Up</p>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow font-mali text-black">
        <h3 className="text-2xl mb-20">Begin your journey to a healthier life</h3>
        <h1 className="text-[6rem] mb-8">FRIDGE</h1>
        <h2 className="text-3xl mb-8">What’s in your fridge today?</h2>
        <div className="cursor-pointer border-2 border-[#EBA8A8] font-bold px-6 py-3 text-lg bg-[#EBA8A8] text-white rounded-2xl hover:bg-transparent hover:text-[#EBA8A8]">Join Us</div>
      </main>
      <footer className="w-full flex justify-center">
        <img src={Fruits} alt="Bottom Image" className="object-contain max-w-7xl" />
      </footer>
    </div>
  );
};

export default Home;
