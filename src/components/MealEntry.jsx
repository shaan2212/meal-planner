import { useState } from 'react';

export default function MealEntry({ day, mealType, value, updateMeal, deleteMeal }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    updateMeal(day, mealType, inputValue);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteMeal(day, mealType);
    setInputValue('');
    setIsEditing(false);
  };

  return (
    <div className="mb-2">
      <div className="flex justify-between items-center">
        <span className="capitalize font-medium">{mealType}:</span>
        {isEditing ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border p-1 rounded"
            />
            <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
          </div>
        ) : (
          <div className="flex gap-2">
            {value ? (
              <>
                <span>{value}</span>
                <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-2 py-1 rounded">Add</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
