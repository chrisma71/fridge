import React, { useState, useEffect } from 'react';
import Sidebar from '../goals&info/components/sidebar';
import SetGoal from './components/setGoal';
import MealList from './components/MealList';
import ProgressBar from './components/ProgressBar';
import CameraModal from './components/modals/CameraModal';
import UploadModal from './components/modals/UploadModal';
import TextModal from './components/modals/TextModal';
import Cookies from 'js-cookie';
import axios from 'axios';

const NutritionTracker: React.FC = () => {
  const [meals, setMeals] = useState<{ name: string; calories: number; protein: number }[]>([]);
  const [isCameraModalOpen, setCameraModalOpen] = useState(false);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [isTextModalOpen, setTextModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = Cookies.get('userId');
    if (id) {
      setUserId(id);
      fetchMeals(id); // Fetch meals when userId is available
    }
  }, []);

  const fetchMeals = async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}/meals`);
      setMeals(response.data.meals || []);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  const handleAddMeal = async (meal: { name: string; calories: number; protein: number }) => {
    try {
      // Add the meal to the database
      await axios.post(`http://localhost:5000/api/users/${userId}/meals`, meal);
      
      // Re-fetch the meals to update the list
      await fetchMeals(userId as string);
    } catch (error) {
      console.error('Error adding meal:', error);
      alert('Failed to add meal.');
    }
  };

  const openCameraModal = () => setCameraModalOpen(true);
  const closeCameraModal = () => setCameraModalOpen(false);

  const openUploadModal = () => setUploadModalOpen(true);
  const closeUploadModal = () => setUploadModalOpen(false);

  const openTextModal = () => setTextModalOpen(true);
  const closeTextModal = () => setTextModalOpen(false);

  const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);
  const totalProtein = meals.reduce((acc, meal) => acc + meal.protein, 0);

  const calorieGoal = 2000;
  const proteinGoal = 100;

  return (
    <div className="flex bg-gradient-to-tr from-[#FE94FF] to-[#FFB794] min-h-screen w-screen font-mali">
      <Sidebar />

      <div className="flex-1 p-8 flex flex-row space-x-16 items-start h-screen overflow-hidden">
        <MealList 
          meals={meals} 
          onOpenCamera={openCameraModal} 
          onOpenUpload={openUploadModal} 
          onOpenText={openTextModal} 
        />

        <div className="flex flex-col space-y-8 h-full">
          <SetGoal />
          <ProgressBar
            calorieGoal={calorieGoal}
            calorieIntake={totalCalories}
            proteinGoal={proteinGoal}
            proteinIntake={totalProtein}
          />
        </div>
      </div>

      {isCameraModalOpen && userId && (
        <CameraModal
          onClose={closeCameraModal}
          userId={userId}
          onAddMeal={handleAddMeal}
        />
      )}
      {isUploadModalOpen && <UploadModal onClose={closeUploadModal} />}
      {isTextModalOpen && userId && (
        <TextModal onClose={closeTextModal} onAddMeal={handleAddMeal} userId={userId} />
      )}
    </div>
  );
};

export default NutritionTracker;
