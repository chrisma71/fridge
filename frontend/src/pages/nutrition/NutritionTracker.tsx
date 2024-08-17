import React, { useState } from 'react';
import Sidebar from '../goals&info/components/sidebar';
import SetGoal from './components/setGoal';
import MealList from './components/MealList';
import ProgressBar from './components/ProgressBar';
import CameraModal from './components/modals/CameraModal';
import UploadModal from './components/modals/UploadModal';
import TextModal from './components/modals/TextModal';

const NutritionTracker: React.FC = () => {
  const [meals, setMeals] = useState([
    { name: 'Fried Chicken', calories: 500, protein: 500 },
    { name: 'Watermelon', calories: 50, protein: 1 },
  ]);

  const [isCameraModalOpen, setCameraModalOpen] = useState(false);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [isTextModalOpen, setTextModalOpen] = useState(false);

  const openCameraModal = () => setCameraModalOpen(true);
  const closeCameraModal = () => setCameraModalOpen(false);

  const openUploadModal = () => setUploadModalOpen(true);
  const closeUploadModal = () => setUploadModalOpen(false);

  const openTextModal = () => setTextModalOpen(true);
  const closeTextModal = () => setTextModalOpen(false);

  const handleAddMeal = (meal: { name: string; calories: number; protein: number }) => {
    setMeals([...meals, meal]);
  };

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

      {isCameraModalOpen && <CameraModal onClose={closeCameraModal} />}
      {isUploadModalOpen && <UploadModal onClose={closeUploadModal} />}
      {isTextModalOpen && <TextModal onClose={closeTextModal} onAddMeal={handleAddMeal} />}
    </div>
  );
};

export default NutritionTracker;
