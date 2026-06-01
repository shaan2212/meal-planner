import React, { useState } from 'react';

export default function MealDay({ day, meals, updateMeal, deleteMeal }) {
  const mealTypes = ['breakfast', 'lunch', 'dinner'];
  
  // State to track which specific meal input row is currently being edited
  const [editingMeal, setEditingMeal] = useState(null);
  const [tempValue, setTempValue] = useState('');

  const handleStartEdit = (type, currentVal) => {
    setEditingMeal(type);
    setTempValue(currentVal || '');
  };

  const handleSave = (type) => {
    updateMeal(day, type, tempValue);
    setEditingMeal(null);
  };

  const handleCancel = () => {
    setEditingMeal(null);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 border-t-4 border-blue-500 hover:shadow-md transition-all duration-200">
      <h3 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4 capitalize">{day}</h3>
      
      <div className="space-y-4">
        {mealTypes.map((type) => {
          const isEditing = editingMeal === type;
          const hasValue = meals && meals[type];

          return (
            <div key={type} className="flex flex-col gap-1">
              {/* Row Header Label */}
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{type}</span>
              
              <div className="flex items-center gap-2 min-h-[40px]">
                {isEditing ? (
                  /* Active Editing Block: Isolated completely from labels */
                  <div className="flex items-center gap-2 w-full">
                    <input
                      type="text"
                      className="w-full bg-gray-50 border border-blue-400 text-gray-700 text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all z-10"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      placeholder={`What's for ${type}?`}
                      autoFocus
                    />
                    <button 
                      onClick={() => handleSave(type)}
                      className="bg-green-600 hover:bg-green-700 text-white font-medium text-xs rounded-lg px-3 py-2 transition-colors"
                    >
                      Save
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="bg-gray-400 hover:bg-gray-500 text-white font-medium text-xs rounded-lg px-3 py-2 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  /* Display Block: Shows current value or default Add layout */
                  <div className="flex items-center justify-between w-full bg-gray-50/50 rounded-lg p-2 border border-dashed border-gray-200">
                    <span className="text-sm text-gray-700 font-medium truncate max-w-[160px]">
                      {hasValue ? meals[type] : <span className="text-gray-300 italic font-normal">Empty</span>}
                    </span>
                    
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleStartEdit(type, meals ? meals[type] : '')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-md px-3 py-1.5 transition-colors"
                      >
                        {hasValue ? 'Edit' : 'Add'}
                      </button>
                      
                      {hasValue && (
                        <button
                          onClick={() => deleteMeal(day, type)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-md px-2.5 py-1.5 transition-colors"
                          title="Delete meal"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
