import MealDay from './MealDay';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function MealChart({ mealData, updateMeal, deleteMeal }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {days.map(day => (
        <MealDay
          key={day}
          day={day}
          meals={mealData[day]}
          updateMeal={updateMeal}
          deleteMeal={deleteMeal}
        />
      ))}
    </div>
  );
}
