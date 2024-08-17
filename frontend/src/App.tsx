import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Goals from './pages/goals&info/goals';
import NutritionTracker from './pages/nutrition/NutritionTracker';
import Cookies from 'js-cookie';

const App: React.FC = () => {
  useEffect(() => {
    const fetchUserId = async () => {
      let userId = Cookies.get('userId');
      if (!userId) {
        // Fetch userId from the server
        const response = await fetch('http://localhost:5000/api/user-id', {
          method: 'GET',
        });
        const data = await response.json();
        userId = data.userId;
        Cookies.set('userId', userId, { expires: 365 }); // Expires in 1 year

        // Create the user document if it doesn't exist
        await fetch(`http://localhost:5000/api/users/${userId}/create`, {
          method: 'POST',
        });
      } else {
        // Ensure the user document exists if the userId is already present
        await fetch(`http://localhost:5000/api/users/${userId}/create`, {
          method: 'POST',
        });
      }
    };

    fetchUserId();
  }, []);

  return (
    <Router>
      <div className="w-full min-h-screen">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/a/goals" element={<Goals />} />
          <Route path="/a/tracker" element={<NutritionTracker />} />
          {/* Add other routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
