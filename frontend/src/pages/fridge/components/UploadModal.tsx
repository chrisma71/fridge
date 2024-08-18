import React, { useState } from 'react';
import axios from 'axios';

interface UploadModalProps {
  onClose: () => void;
  userId: string; // User ID to associate the upload with a user
  onAddItem: (item: string) => void; // Function to add the item to the fridge
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, userId, onAddItem }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile && !isSubmitting) {
      try {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('prompt', 'Analyze the food in the image and return a JSON object with the name of the item. If there are multiple food items include all of them in a single name. I.e Burger, fries');
        formData.append('userId', userId);

        const response = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        let description = response.data.description;
        console.log(description)
        description = description.replace(/```json|```/g, '').trim();
        const parsedResponse = JSON.parse(description);

        const itemName = parsedResponse.name || 'Unknown Item';

        await onAddItem(itemName);
        onClose();
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to add item.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Upload Modal</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
        <div className="flex justify-center mt-4">
          <button
            onClick={handleUpload}
            disabled={isSubmitting || !selectedFile}
            className={`px-4 py-2 rounded-lg ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500'} text-white`}
          >
            {isSubmitting ? 'Uploading...' : 'Upload'}
          </button>
          <button
            onClick={onClose}
            className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
