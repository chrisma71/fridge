import React from 'react';
import { Helmet } from 'react-helmet-async'; // Import Helmet
import Home from './components/home';
import Features from './components/features';
import Call from './components/call';
import NavBar from './components/navbar';

const HomePage: React.FC = () => {
  return (
    <div className="w-screen">
      <Helmet>
        <title>myFridge</title> {/* Set the page title here */}
      </Helmet>
      
      <NavBar /> {/* Add the NavBar component here */}
      
      {/* Sections with IDs */}
      <section id="home" className="">
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
