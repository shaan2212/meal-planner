import { useState, useEffect } from 'react';
import MealChart from './components/MealChart';

function App() {
  const [mealData, setMealData] = useState(() => {
    const saved = localStorage.getItem('mealData');
    return saved ? JSON.parse(saved) : {
      Monday: { breakfast: '', lunch: '', dinner: '' },
      Tuesday: { breakfast: '', lunch: '', dinner: '' },
      Wednesday: { breakfast: '', lunch: '', dinner: '' },
      Thursday: { breakfast: '', lunch: '', dinner: '' },
      Friday: { breakfast: '', lunch: '', dinner: '' },
      Saturday: { breakfast: '', lunch: '', dinner: '' },
      Sunday: { breakfast: '', lunch: '', dinner: '' },
    };
  });

  useEffect(() => {
    localStorage.setItem('mealData', JSON.stringify(mealData));
  }, [mealData]);

  const updateMeal = (day, mealType, value) => {
    setMealData(prev => ({
      ...prev,
      [day]: { ...prev[day], [mealType]: value }
    }));
  };

  const deleteMeal = (day, mealType) => {
    setMealData(prev => ({
      ...prev,
      [day]: { ...prev[day], [mealType]: '' }
    }));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Weekly Meal Planner</h1>
      <MealChart
        mealData={mealData}
        updateMeal={updateMeal}
        deleteMeal={deleteMeal}
      />
    </div>
  );
}

export default App;
