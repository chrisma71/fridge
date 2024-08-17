import React, { useState } from 'react';
import Sidebar from '../goals&info/components/sidebar';
import CameraModal from './components/CameraModal';
import UploadModal from './components/UploadModal';
import TextModal from './components/TextModal';
import CameraIcon from './assets/Group 22.png';
import UploadIcon from './assets/Upload.png';
import AddIcon from './assets/Vector.png';

const Fridge: React.FC = () => {
  const [isCameraModalOpen, setCameraModalOpen] = useState(false);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [isTextModalOpen, setTextModalOpen] = useState(false);

  const [fridgeItems, setFridgeItems] = useState<string[]>([
    'Cabbage',
    'Carrots',
    'Tomatoes',
    'Lettuce',
    'Spinach',
    'Broccoli',
    'Cauliflower',
    'Bell Peppers',
    'Onions',
    'Garlic',
    'Ginger',
    'Mushrooms',
    'Zucchini',
    'Cucumbers',
    'Potatoes',
    'Sweet Potatoes',
    'Beets',
    'Radishes',
    'Eggplant',
    'Asparagus',
    'Green Beans',
    'Peas',
    'Corn',
    'Avocados',
    'Bananas',
    'Apples',
    'Oranges',
    'Strawberries',
    'Blueberries',
    'Raspberries',
    'Blackberries',
    'Cherries',
    'Grapes',
    'Watermelon',
    'Pineapple',
    'Mangoes',
    'Papayas',
    'Kiwis',
    'Lemons',
    'Limes',
    'Peaches',
    'Plums',
    'Nectarines',
    'Pears',
    'Grapefruit',
    'Pomegranate',
    'Coconut',
    'Milk',
    'Cheese',
    'Yogurt',
    'Butter',
    'Eggs',
    'Chicken',
    'Beef',
    'Pork',
    'Fish',
    'Shrimp',
    'Tofu',
    'Tempeh',
    'Lentils',
    'Chickpeas',
    'Kidney Beans',
    'Black Beans',
    'Peanuts',
    'Almonds',
    'Cashews',
    'Walnuts',
    'Hazelnuts',
    'Pecans',
    'Sunflower Seeds',
    'Pumpkin Seeds',
    'Oats',
    'Rice',
    'Pasta',
    'Quinoa',
    'Barley',
    'Bread',
    'Tortillas',
    'Bagels',
    'Croissants',
    'Cereal',
    'Granola',
    'Olive Oil',
    'Coconut Oil',
    'Vinegar',
    'Soy Sauce',
    'Honey',
    'Maple Syrup',
    'Peanut Butter',
    'Jam',
    'Pickles',
    'Mustard',
    'Ketchup',
    'Mayonnaise',
    'Hot Sauce',
    'Salt',
    'Pepper',
    'Sugar',
    'Flour',
    'Baking Soda',
    'Baking Powder',
    'Cinnamon',
    'Nutmeg',
    'Ginger',
    'Vanilla Extract',
    'Chocolate Chips',
    'Cocoa Powder',
  ]);

  const openCameraModal = () => setCameraModalOpen(true);
  const closeCameraModal = () => setCameraModalOpen(false);

  const openUploadModal = () => setUploadModalOpen(true);
  const closeUploadModal = () => setUploadModalOpen(false);

  const openTextModal = () => setTextModalOpen(true);
  const closeTextModal = () => setTextModalOpen(false);

  const handleAddItem = (item: string) => {
    setFridgeItems([...fridgeItems, item]);
  };

  const handleRemoveItem = (itemToRemove: string) => {
    setFridgeItems(fridgeItems.filter(item => item !== itemToRemove));
  };

  return (
    <div className="flex bg-gradient-to-tr from-[#9C9AF3] to-[#FDD1E2] min-h-screen w-screen font-mali">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="w-full h-full bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold">Fridge</h1>
            <div className="flex space-x-4">
              <img src={UploadIcon} alt="Upload Icon" className="w-8 h-8 cursor-pointer" onClick={openUploadModal} />
              <img src={CameraIcon} alt="Camera Icon" className="w-8 h-8 cursor-pointer" onClick={openCameraModal} />
              <img src={AddIcon} alt="Add Icon" className="w-8 h-8 cursor-pointer" onClick={openTextModal} />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {fridgeItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-300 px-3 py-1 rounded-full shadow-[0_3px_3px_rgba(0,0,0,0.3)] transition-transform transform hover:translate-y-[-2px]"
              >
                <span>{item}</span>
                <div onClick={() => handleRemoveItem(item)} className="cursor-pointer ml-2 text-gray-600 hover:text-gray-900">
                  ×
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isCameraModalOpen && <CameraModal onClose={closeCameraModal} />}
      {isUploadModalOpen && <UploadModal onClose={closeUploadModal} />}
      {isTextModalOpen && <TextModal onClose={closeTextModal} onAddMeal={handleAddItem} />}
    </div>
  );
};

export default Fridge;
