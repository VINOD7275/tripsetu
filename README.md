# TripTrail — Secure Full-Stack AI Adventure & Budget Travel Planner

**TripTrail** is a production-ready, adventure-themed travel planning application built with React, Vite, TypeScript, Tailwind CSS, Recharts, Leaflet, and Supabase PostgreSQL.

The platform answers critical questions for every traveler:
- *Where can I travel within my available budget?*
- *How can I reach my destination affordably?*
- *Where can I stay and eat?*
- *Which adventure activities can I experience?*
- *How much will my entire trip cost?*
- *How can I plan my itinerary without exceeding my budget?*
- *What alternative destinations can I choose if my preferred destination is too expensive?*

---

## 🚀 Key Features

### 1. Cinematic Adventure UI/UX
- **Design Aesthetic:** Deep navy and charcoal backgrounds (`#080D1A`, `#0D1527`), vibrant sunset-orange primary action buttons (`#FF6B35`), emerald/teal accents (`#10B981`), glassmorphism panels, and editorial typography (`Outfit` + `Plus Jakarta Sans`).
- **Currency Switcher:** Live multi-currency conversions between INR (₹), USD ($), EUR (€), and GBP (£).
- **Price Transparency:** Clear disclaimers distinguishing live tariff estimates from certified operator rates.

### 2. Smart Trip Planner (`/plan`)
- **5-Step Interactive Wizard:** Starting city, destination preference (or AI *Surprise Me* budget matcher), travel dates, group type (solo, couple, friends, family), comfort level (backpacker, standard, comfort, luxury), transport mode (train, bus, flight, road trip), accommodation style, and specific adventure thrills.
- **Dynamic Cost Engine:** Visual budget breakdown using **Recharts** donut chart and line-item estimates (Transport, Base Camp, Food, Activities, 10% Emergency Buffer).
- **Automated Day-by-Day Itinerary:** Hour-by-hour schedules (morning, afternoon, evening activities, meal recommendations, and local travel tips).
- **Affordable Alternatives:** Suggests 3 alternative destinations if the user's dream trip exceeds their target budget.
- **Trip Persistence:** Save to "My Trips", duplicate, edit, and print/export PDF-friendly view with celebratory confetti.

### 3. Destination Explorer (`/destinations`)
- **Multi-Dimensional Filters:** Filter by landscape (Mountains, Beaches, Forests, Deserts, Islands), budget cap slider, domestic vs international, trip duration, difficulty level (Easy, Moderate, Challenging, Extreme), and adventure activities.
- **Interactive Adventure Map:** Built with **Leaflet** featuring custom orange pins, popups, and coordinate pins for all destinations.

### 4. Interactive Budget Calculator (`/budget-calculator`)
- Interactive sliders for travelers, days, comfort tier, transport preference, and thrill intensity.
- **Recharts Analytics:** Category breakdown pie chart + Daily expenditure curve bar chart.
- **TripTrail Cost-Cutting Hacks:** 8 field-tested budget masterclasses (Tatkal bookings, shared local Sumos, homestays, local gear rentals).

### 5. Adventures Thrill Catalog (`/adventures`)
- Catalog of extreme sports (Whitewater Rafting, Fixed Platform Bungee Jumping, Tandem Paragliding, Alpine Skiing, Coral Scuba Diving, Living Root Bridge Treks).
- Certified instructor guidelines, gear checklists, and direct booking into custom itineraries.

### 6. Travel Guides & Survival Kits (`/guides`)
- Field-tested survival guides (High-altitude sickness & Diamox protocols, Rishikesh weekend under ₹6,000, Monsoon root bridge trekking).
- Interactive gear checklists with clickable packing checkboxes.

### 7. My Trips & Expense Tracker (`/my-trips`)
- Dashboard of all saved journeys categorized by status (Planning, Booked, Completed).
- **Live Expense Tracker:** Add itemized expenses (Transport, Stay, Food, Activity, Gear, Misc) and observe real-time budget vs. actual spending progress bars.

---

## 🛡️ Supabase Architecture & Security

TripTrail strictly utilizes **Supabase** as its backend platform:
- **No MongoDB / Mongoose.**
- **No redundant Express microservices.**
- **PostgreSQL Database:** Tables for `profiles`, `destinations`, `activities`, `trips`, `trip_itinerary_days`, `trip_expenses`, and `travel_guides`.
- **Row Level Security (RLS):** All user-specific tables (`profiles`, `trips`, `trip_expenses`, `trip_itinerary_days`) have strict RLS policies ensuring users can only read and mutate their own data.
- **Automated Profile Trigger:** `on_auth_user_created` trigger creates public profile rows upon Supabase Auth signup.
- **Resilient Fallback Mode:** The app includes a persistent offline/local storage engine with a 1-Click Demo Traveler account (`Arjun Verma`), allowing instant testing before adding live Supabase credentials.

### Connecting Live Supabase
1. Run the database migration script in your Supabase SQL editor:
   ```sql
   -- Found at:
   supabase/schema.sql
   ```
2. Create `.env` in the project root:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
3. Restart the dev server or rebuild!

---

## 🛠️ Technology Stack
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4 (`@tailwindcss/vite`), React Router v7, Framer Motion, Lucide React, Recharts, Leaflet, Canvas Confetti.
- **Backend:** Supabase Auth, Supabase PostgreSQL, Row Level Security (RLS).

---

## 🏃 Running Locally

```bash
# Install dependencies
npm install

# Run Vite development server
npm run dev

# Run production build validation
npm run build
```
