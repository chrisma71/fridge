import React, { useState } from 'react';
import axios from 'axios';

interface UploadModalProps {
  onClose: () => void;
  userId: string; // Pass userId to associate the upload with a user
  onAddMeal: (meal: { name: string; calories: number; protein: number }) => void; // Function to add the meal
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, userId, onAddMeal }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('prompt', 'Analyze the food in the image and return a JSON object with the keys "name", "calories", and "protein". Do not add the units with the measurements i.e., if it’s 1 gram, just write 1. Also include ALL food in the image ie if theres a burger and fries include both of them in the title and in the calories and proteins (combined)');
      formData.append('userId', userId); // Include userId in the upload

      try {
        const response = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Extract the description and parse the JSON
        let description = response.data.description;

        // Remove the code block markers
        description = description.replace(/```json|```/g, '').trim();

        // Parse the JSON string
        const mealData = JSON.parse(description);

        const meal = {
          name: mealData.name || 'Unknown Food',
          calories: mealData.calories || 0,
          protein: mealData.protein || 0,
        };

        onAddMeal(meal);
        onClose(); // Close the modal after adding the meal
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to add meal.');
      }
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg flex flex-col items-center">
        <h2 className="text-lg font-semibold">Upload Modal</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} className="mt-4" />
        <div className="mt-4">
          <button onClick={handleUpload} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
            Upload
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
