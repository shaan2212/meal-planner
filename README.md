# 🥗 Real-Time Weekly Meal Planner

A modern, responsive, and collaborative weekly meal planner built with **React**, **Vite**, and **Tailwind CSS**. This application features cloud-backed **Supabase Realtime** synchronization, allowing multiple devices (like your phone and laptop) to update and view the same schedule instantly using a single shared room link.

---

## ✨ Features
* **7-Day Dashboard Matrix:** A clean, card-based responsive layout optimized for mobile and desktop screens.
* **Instant Cloud Sync:** Real-time data streaming—type on your phone, see it on your laptop instantly without reloading.
* **Link-Based Rooms:** No tedious signup or authentication required. Generate a room link, share it, and coordinate meals together.
* **Persistent Cache:** Safe-guards entries via cloud document records.

---

## 🛠️ Project Structure
```text
meal-planner/
├── src/
│   ├── components/
│   │   ├── MealChart.jsx       # Grid controller
│   │   └── MealDay.jsx         # Isolated day-card and input handling
│   ├── App.jsx                 # Global state & synchronization hub
│   ├── main.jsx                # Application entry point
│   ├── styles.css              # Tailwind base styles directive
│   └── supabaseClient.js       # Cloud database instance router
├── index.html
├── package.json
├── postcss.config.js           # PostCSS compiler configurations
├── tailwind.config.js          # Tailwind class scanner blueprints
└── vite.config.js              # Vite packaging engine defaults
