import React, { useState } from 'react';
import axios from 'axios';

interface UploadModalProps {
  onClose: () => void;
  userId: string;
  onAddItem: (item: string) => void;
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
        formData.append('prompt', 'Analyze the food in the image and return a JSON array with the names of the items. Each item should be a separate entry.');
        formData.append('userId', userId);

        const response = await axios.post('https://myfridge-0q77.onrender.com/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        let description = response.data.description;
        description = description.replace(/```json|```/g, '').trim();
        const parsedResponse = JSON.parse(description);

        if (Array.isArray(parsedResponse)) {
          for (const itemName of parsedResponse) {
            await onAddItem(itemName);
          }
        } else {
          console.error('Response is not an array:', parsedResponse);
          alert('Unexpected response format.');
        }

        onClose();
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to add items.');
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
