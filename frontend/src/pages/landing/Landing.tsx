import React from 'react';
import Home from './components/home';
import Features from './components/features';
import Call from './components/call';

const HomePage: React.FC = () => {
  return (
    <>
      <Home/>
      <Features/>
      <Call/>
    </>
  );
};

export default HomePage;
