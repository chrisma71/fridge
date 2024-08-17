import React, { useState, useRef } from 'react';
import axios from 'axios';

const TestPage = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [description, setDescription] = useState<string>('');
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
      formData.append('prompt', prompt);

      try {
        const response = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setDescription(response.data.description);
      } catch (error) {
        console.error('Error uploading file or prompt:', error);
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
    <div>
      <video ref={videoRef} width="640" height="480" autoPlay />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <button onClick={startWebcam}>Start Webcam</button>
      <button onClick={captureImage}>Capture Image</button>
      <button onClick={handleUpload}>Upload</button>
      <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter prompt" />
      <div>Description: {description}</div>
    </div> 
  );
};

export default TestPage;
