import React from 'react';
import Home from './components/home';
import Features from './components/features';
import Call from './components/call';
import NavBar from './components/navbar'; // Import the NavBar component

const HomePage: React.FC = () => {
  return (
    <div className="w-screen">
      <NavBar /> {/* Add the NavBar component here */}
      
      {/* Sections with IDs */}
      <section id="home" className=""> {/* Offset to account for fixed navbar */}
        <Home />
      </section>
      <section id="features" className="">
        <Features />
      </section>
      <section id="call" className="">
        <Call />
      </section>
    </div>
  );
};

export default HomePage;
