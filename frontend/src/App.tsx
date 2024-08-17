import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Goals from './pages/goals&info/goals';

const App: React.FC = () => {
  return (
    <Router>
      <div className="w-full min-h-screen">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/a/goals" element={<Goals />} />
          {/* Add other routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
