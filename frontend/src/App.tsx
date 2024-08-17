import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Goals from './pages/goals&info/goals';
import NutritionTracker from './pages/nutrition/NutritionTracker'; // Import the new page

const App: React.FC = () => {
  return (
    <Router>
      <div className="w-full min-h-screen">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/a/goals" element={<Goals />} />
          <Route path="/a/tracker" element={<NutritionTracker />} /> {/* Add the new route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;