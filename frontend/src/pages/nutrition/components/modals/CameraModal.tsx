import React, { useState, useRef } from 'react';
import axios from 'axios';

interface CameraModalProps {
  onClose: () => void;
  userId: string; // Pass userId to associate the upload with a user
  onAddMeal: (meal: { name: string; calories: number; protein: number }) => void; // Function to add the meal
}

const CameraModal: React.FC<CameraModalProps> = ({ onClose, userId, onAddMeal }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setImageSrc(canvas.toDataURL('image/jpeg'));
      }
    }
  };

  const handleUpload = async () => {
    if (imageSrc) {
      const formData = new FormData();
      formData.append('file', dataURLtoFile(imageSrc, 'webcam.jpg'));
      formData.append('prompt', 'Analyze the food in the image and return a JSON object with the keys "name", "calories", and "protein". do not add the units with the measurements ie if its 1 gram, just write 1');
      formData.append('userId', userId); // Include userId in the upload

      try {
        const response = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response)
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

        alert('Meal added successfully!');
        onClose(); // Close the modal after adding the meal
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to add meal.');
      }
    }
  };

  const dataURLtoFile = (dataUrl: string, filename: string) => {
    const arr = dataUrl.split(',');

    // Decode Base64 string
    const mime = arr[0].match(/:(.*?);/);
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime ? mime[1] : 'application/octet-stream' });
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg flex flex-col items-center">
        <h2 className="text-lg font-semibold">Camera Modal</h2>
        <video ref={videoRef} width="640" height="480" autoPlay />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <div className="mt-4">
          <button onClick={startWebcam} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">Start Webcam</button>
          <button onClick={captureImage} className="px-4 py-2 bg-green-500 text-white rounded mr-2">Capture Image</button>
          <button onClick={handleUpload} className="px-4 py-2 bg-purple-500 text-white rounded">Upload</button>
        </div>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
      </div>
    </div>
  );
};

export default CameraModal;
