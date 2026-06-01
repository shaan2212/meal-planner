import { useState, useEffect } from 'react';
import MealChart from './components/MealChart';
import { supabase } from './supabaseClient';

// Helper to generate a random room ID string
const generateRoomId = () => Math.random().toString(36).substring(2, 9);

const initialMeals = {
  Monday: { breakfast: '', lunch: '', dinner: '' },
  Tuesday: { breakfast: '', lunch: '', dinner: '' },
  Wednesday: { breakfast: '', lunch: '', dinner: '' },
  Thursday: { breakfast: '', lunch: '', dinner: '' },
  Friday: { breakfast: '', lunch: '', dinner: '' },
  Saturday: { breakfast: '', lunch: '', dinner: '' },
  Sunday: { breakfast: '', lunch: '', dinner: '' },
};

function App() {
  const [roomId, setRoomId] = useState('');
  const [mealData, setMealData] = useState(initialMeals);
  const [loading, setLoading] = useState(true);

  // Initialize Room from URL Query Parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let currentRoom = params.get('room');

    if (!currentRoom) {
      currentRoom = generateRoomId();
      params.set('room', currentRoom);
      // Updates the browser URL without refreshing the webpage
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    }

    setRoomId(currentRoom);
    fetchOrCreateRoom(currentRoom);
  }, []);

  // Fetch initial data from the cloud
  const fetchOrCreateRoom = async (id) => {
    const { data, error } = await supabase
      .from('meal_rooms')
      .select('meals')
      .eq('room_id', id)
      .single();

    if (data) {
      setMealData(data.meals);
    } else {
      // If the link is brand new, seed it with the blank slate map
      await supabase.from('meal_rooms').insert([{ room_id: id, meals: initialMeals }]);
    }
    setLoading(false);
  };

  // Real-time Database Subscription: Replaces LocalStorage hooks
  useEffect(() => {
    if (!roomId) return;

    const channel = supabase
      .channel(`room-${roomId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'meal_rooms', filter: `room_id=eq.${roomId}` },
        (payload) => {
          if (payload.new && payload.new.meals) {
            setMealData(payload.new.meals);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  // Update cloud record on change
  const syncToCloud = async (updatedMeals) => {
    setMealData(updatedMeals);
    await supabase
      .from('meal_rooms')
      .update({ meals: updatedMeals, updated_at: new Date() })
      .eq('room_id', roomId);
  };

  const updateMeal = (day, mealType, value) => {
    const updated = {
      ...mealData,
      [day]: { ...mealData[day], [mealType]: value }
    };
    syncToCloud(updated);
  };

  const deleteMeal = (day, mealType) => {
    const updated = {
      ...mealData,
      [day]: { ...mealData[day], [mealType]: '' }
    };
    syncToCloud(updated);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 font-medium">Connecting to sync matrix...</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto flex flex-col min-h-screen justify-between">
      {/* Top Main Section Group */}
      <div>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Weekly Meal Planner</h1>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Sync Link Copied! Open this URL on your laptop to mirror data.");
            }}
            className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-full px-4 py-1.5 transition-colors shadow-sm"
          >
            📋 Copy Sync Link
          </button>
        </div>
        
        <MealChart
          mealData={mealData}
          updateMeal={updateMeal}
          deleteMeal={deleteMeal}
        />
      </div>

      {/* Dynamic Personal Branding Footer Block */}
      <footer className="mt-12 pt-6 border-t border-gray-100 text-center text-sm text-gray-400">
        <p className="font-medium">
          Designed & Built with ❤️ by <span className="text-blue-500 font-semibold hover:underline cursor-pointer">Shantanu Mukherjee</span>
        </p>
        <p className="text-xs mt-1 text-gray-300">
          © {new Date().getFullYear()} All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
