import React from 'react';
import Landing from './pages/landing/Landing';
import TestPage from './pages/TestPage/TestPage';


const App: React.FC = () => {
  return (
    <div className="w-full min-h-screen">
      <Landing />
      <TestPage />
    </div>
  );
};

export default App;
