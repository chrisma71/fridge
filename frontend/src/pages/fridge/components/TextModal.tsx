import React, { useState } from 'react';

interface TextModalProps {
  onClose: () => void;
  onAddMeal: (item: string) => void;
}

const TextModal: React.FC<TextModalProps> = ({ onClose, onAddMeal }) => {
  const [item, setItem] = useState('');

  const handleAdd = () => {
    if (item.trim()) {
      onAddMeal(item.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Add Item</h2>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="w-full p-2 mb-4 rounded-lg bg-gray-300 focus:outline-none"
          placeholder="Enter item name"
        />
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextModal;
