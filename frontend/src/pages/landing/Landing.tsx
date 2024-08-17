import React from 'react';
import Home from './components/home';
import Features from './components/features';
import Call from './components/call';

const HomePage: React.FC = () => {
  return (
    <div className='w-screen'>
      <Home/>
      <Features/>
      <Call/>
    </div>
  );
};

export default HomePage;
