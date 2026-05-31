import MealEntry from './MealEntry';

export default function MealDay({ day, meals, updateMeal, deleteMeal }) {
  return (
    <div className="border p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">{day}</h2>
      {['breakfast', 'lunch', 'dinner'].map(mealType => (
        <MealEntry
          key={mealType}
          day={day}
          mealType={mealType}
          value={meals[mealType]}
          updateMeal={updateMeal}
          deleteMeal={deleteMeal}
        />
      ))}
    </div>
  );
}
