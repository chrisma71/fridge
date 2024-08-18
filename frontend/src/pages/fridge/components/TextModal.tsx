import React, { useState } from 'react';

interface TextModalProps {
  onClose: () => void;
  onAddItem: (item: string) => Promise<void>; 
  userId: string;
}

const TextModal: React.FC<TextModalProps> = ({ onClose, onAddItem, userId }) => {
  const [item, setItem] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddItem = async () => {
    if (item.trim() && !isSubmitting) {
      try {
        setIsSubmitting(true);
        await onAddItem(item.trim()); 
        alert('Item added successfully!');
        onClose(); 
      } catch (error) {
        console.error('Error adding item:', error);
        alert('Failed to add item.');
      } finally {
        setIsSubmitting(false); 
      }
    } else {
      alert('Please enter an item.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Add an Item</h2>

        <div className="mb-4">
          <label className="block text-sm mb-2">Name of the Item</label>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-300 focus:outline-none"
            placeholder="Name of the Item"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleAddItem}
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-lg ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500'} text-white`}
          >
            {isSubmitting ? 'Adding...' : 'Add Item'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextModal;
