import React from 'react';

const CameraModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-4 rounded-lg">
      <h2 className="text-lg font-semibold">Camera Modal</h2>
      <p>Camera modal content goes here.</p>
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
    </div>
  </div>
);

export default CameraModal;
