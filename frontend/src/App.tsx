import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Goals from './pages/goals&info/goals';
import NutritionTracker from './pages/nutrition/NutritionTracker';
import Fridge from './pages/fridge/Fridge';
import RecipeMaker from './pages/recipeMaker/recipeMaker';
import Cookies from 'js-cookie';

const App: React.FC = () => {
  useEffect(() => {
    const fetchUserId = async () => {
      let userId = Cookies.get('userId');

      if (!userId) {
        try {
          const response = await fetch('http://localhost:5000/api/user-id', {
            method: 'GET',
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user ID');
          }

          const data = await response.json();
          userId = data.userId;

          if (userId) {
            Cookies.set('userId', userId, { expires: 365 }); // Expires in 1 year

            await fetch(`http://localhost:5000/api/users/${userId}/create`, {
              method: 'POST',
            });
          }
        } catch (error) {
          console.error('Error fetching or creating user:', error);
        }
      } else {
        try {
          await fetch(`http://localhost:5000/api/users/${userId}/create`, {
            method: 'POST',
          });
        } catch (error) {
          console.error('Error creating user:', error);
        }
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
          <Route path="/a/fridge" element={<Fridge />} />
          <Route path="/a/meal-planner" element={<RecipeMaker />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
