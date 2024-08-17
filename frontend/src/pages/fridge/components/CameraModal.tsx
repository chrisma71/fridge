import React from 'react';

interface CameraModalProps {
  onClose: () => void;
}

const CameraModal: React.FC<CameraModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Camera Modal</h2>
        <p>This is a temporary placeholder for the Camera Modal.</p>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraModal;
