import { Destination, Activity, TravelGuide, Trip } from '../types';

export const CURRENCIES = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateToInr: 1 },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rateToInr: 86.5 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rateToInr: 93.2 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rateToInr: 110.4 },
} as const;

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: 'rishikesh-adventures',
    name: 'Rishikesh',
    slug: 'rishikesh',
    stateCountry: 'Uttarakhand, India',
    isInternational: false,
    category: 'mountains',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1000&q=80'
    ],
    tagline: 'The World Capital of Yoga & Whitewater Rapids',
    description: 'Carved through the Himalayan foothills along the emerald Ganges, Rishikesh is India’s premier budget adventure hub with legendary Grade III & IV river rapids, 83m bungee jumps, and riverside campfires.',
    minBudgetInr: 4500,
    avgCostPerDayInr: 1500,
    recommendedDurationDays: 3,
    bestSeason: 'September to June',
    bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
    difficultyLevel: 'Moderate',
    adventureActivities: ['Whitewater Rafting', 'Bungee Jumping', 'Cliff Jumping', 'Riverside Camping', 'Zip-lining'],
    coordinates: { lat: 30.0869, lng: 78.2676 },
    transportOptions: [
      { mode: 'train', name: 'Jan Shatabdi to Haridwar + Shared Cab', estimatedCostInr: 750, durationHours: 5.5, notes: 'Most economical option from Delhi' },
      { mode: 'bus', name: 'Volvo AC Semi-Sleeper from ISBT Delhi', estimatedCostInr: 850, durationHours: 6.5, notes: 'Direct overnight bus dropping at Tapovan' },
      { mode: 'flight', name: 'Flight to Dehradun Airport (DED) + Taxi', estimatedCostInr: 3200, durationHours: 1.5, notes: 'Fastest connection, 45 min drive to Rishikesh' },
      { mode: 'road_trip', name: 'Self Drive / Bike via NH334', estimatedCostInr: 1200, durationHours: 6, notes: 'Smooth 4-lane highway with food stops at Cheetal Grand' }
    ],
    stayOptions: [
      { type: 'hostel', title: 'Backpacker Bunk in Tapovan (Zostel / goSTOPS)', pricePerNightInr: 550, highlights: ['Fast WiFi', 'Café overlooking hills', 'Community yoga'] },
      { type: 'camping', title: 'Shivpuri Riverside Dome Tents with Bonfire', pricePerNightInr: 1200, highlights: ['All 3 meals included', 'River beach access', 'Volleyball'] },
      { type: 'budget_hotel', title: 'Mountain View Guesthouse Near Laxman Jhula', pricePerNightInr: 1400, highlights: ['Private balcony', 'Hot water', 'Walk to cafes'] }
    ],
    foodGuide: {
      avgDailyCost: 550,
      famousDishes: ['Aloo Puri at Chotiwala', 'Nutella Crepes at Beatles Cafe', 'Fresh Falafel Platters', 'Garhwali Kaphuli & Chai']
    },
    safetyTips: ['Wear certified life jackets during rafting', 'Avoid swimming in deep currents without guides', 'Book jump slots via certified jump masters only'],
    popularityScore: 98,
    isTrending: true,
    tags: ['Under ₹5K', 'Weekend Getaway', 'Extreme Sports', 'Riverside']
  },
  {
    id: 'manali-himalayas',
    name: 'Manali & Solang',
    slug: 'manali',
    stateCountry: 'Himachal Pradesh, India',
    isInternational: false,
    category: 'mountains',
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1597044141240-410a08e67894?auto=format&fit=crop&w=1000&q=80'
    ],
    tagline: 'Snow Peaks, High Passes & Pine Valley Adventures',
    description: 'Surrounded by towering Pir Panjal peaks, Manali blends alpine adrenaline with Bohemian mountain charm. From paragliding over Solang Valley to trekking to alpine lakes, it is a budget backpacker haven.',
    minBudgetInr: 7200,
    avgCostPerDayInr: 1800,
    recommendedDurationDays: 4,
    bestSeason: 'Year Round (Winter for Snow, Summer for Treks)',
    bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    difficultyLevel: 'Moderate',
    adventureActivities: ['Paragliding', 'Skiing & Snowboarding', 'Bhrigu Lake Trek', 'Atal Tunnel Ride', 'Rock Climbing'],
    coordinates: { lat: 32.2432, lng: 77.1892 },
    transportOptions: [
      { mode: 'bus', name: 'Overnight Volvo AC from Delhi/Chandigarh', estimatedCostInr: 1200, durationHours: 13, notes: 'Comfortable sleeper departing late evening' },
      { mode: 'road_trip', name: 'Self Drive / Royal Enfield via Mandi Bypass', estimatedCostInr: 2800, durationHours: 11, notes: 'Stunning highway through Pandoh Dam & Kullu' },
      { mode: 'flight', name: 'Fly to Kullu-Bhuntar Airport (KUU)', estimatedCostInr: 5800, durationHours: 1.5, notes: 'Weather dependent, 1 hour taxi to Old Manali' }
    ],
    stayOptions: [
      { type: 'hostel', title: 'Old Manali Bohemian Dorm (Hosteller / Madpackers)', pricePerNightInr: 600, highlights: ['Apple orchard views', 'Live music nights', 'Co-working setup'] },
      { type: 'budget_hotel', title: 'Wooden Cedar Homestay with Beas River view', pricePerNightInr: 1600, highlights: ['Homecooked Siddu', 'Heater included', 'Trek assistance'] },
      { type: 'camping', title: 'Solang Valley Alpine Dome Tents', pricePerNightInr: 1300, highlights: ['Bonfire & Stargazing', 'Trek guides', 'Buffet dinner'] }
    ],
    foodGuide: {
      avgDailyCost: 650,
      famousDishes: ['Himachali Siddu with Ghee', 'Trout Fish at Old Manali', 'Woodfired Pizzas at Cafe 1947', 'Thukpa & Momos']
    },
    safetyTips: ['Check Rohtang / Atal Tunnel snow alerts', 'Acclimatize before undertaking high-altitude passes', 'Dress in windproof layers'],
    popularityScore: 97,
    isTrending: true,
    tags: ['Snow & Peaks', 'Under ₹10K', 'Biking Loops', 'Summer Chill']
  },
  {
    id: 'leh-ladakh-expedition',
    name: 'Leh & Ladakh',
    slug: 'ladakh',
    stateCountry: 'Ladakh, India',
    isInternational: false,
    category: 'deserts',
    imageUrl: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1000&q=80'
    ],
    tagline: 'High Mountain Passes, Azure Lakes & Buddhist Monasteries',
    description: 'The Land of High Passes sits at 11,500 ft, featuring the surreal turquoise expanse of Pangong Tso, sand dunes of Nubra Valley, dramatic cliffside monasteries, and the world’s highest motorable roads.',
    minBudgetInr: 22000,
    avgCostPerDayInr: 3200,
    recommendedDurationDays: 7,
    bestSeason: 'May to September',
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    difficultyLevel: 'Challenging',
    adventureActivities: ['Khardung La High Pass Ride', 'Pangong Lake Camping', 'Nubra Double-Hump Camel Safari', 'Zanskar River Rafting', 'Chadar Ice Trek'],
    coordinates: { lat: 34.1526, lng: 77.5771 },
    transportOptions: [
      { mode: 'flight', name: 'Fly directly into Leh Kushok Bakula Airport (IXL)', estimatedCostInr: 6800, durationHours: 1.5, notes: 'Requires strict 24-48h rest for acclimatization' },
      { mode: 'road_trip', name: 'Manali to Leh Highway Expedition', estimatedCostInr: 4500, durationHours: 18, notes: 'Crosses Baralacha La and Tanglang La with overnight stay in Keylong' },
      { mode: 'bus', name: 'HRTC Ordinary & Semi-Deluxe Bus via Srinagar or Manali', estimatedCostInr: 2200, durationHours: 24, notes: 'Ultra budget route with unbelievable vistas' }
    ],
    stayOptions: [
      { type: 'hostel', title: 'Leh Main Bazaar Nomad Hostel', pricePerNightInr: 700, highlights: ['Oxygen support ready', 'Rooftop cafe', 'Bike rental desks'] },
      { type: 'camping', title: 'Pangong Tso Lakeside Luxury Swiss Tents', pricePerNightInr: 2400, highlights: ['Lakefront views', 'Warm insulated bedding', 'Star photography'] },
      { type: 'budget_hotel', title: 'Traditional Ladakhi Mud-Brick Eco Homestay', pricePerNightInr: 1500, highlights: ['Organic garden meals', 'Warm family hospitality'] }
    ],
    foodGuide: {
      avgDailyCost: 700,
      famousDishes: ['Butter Tea (Gur Gur Chai)', 'Tingmo with spicy curry', 'Skyu pasta soup', 'Yak Cheese momos']
    },
    safetyTips: ['Mandatory 48-hour acclimatization in Leh before traveling to Pangong/Nubra', 'Carry Diamox & drink 4L water daily', 'Obtain Inner Line Permits (ILP)'],
    popularityScore: 99,
    isTrending: true,
    tags: ['Bucket List', 'High Altitude', 'Road Trip', 'Under ₹25K']
  },
  {
    id: 'meghalaya-wonderland',
    name: 'Meghalaya (Cherrapunji & Mawlynnong)',
    slug: 'meghalaya',
    stateCountry: 'Meghalaya, India',
    isInternational: false,
    category: 'forests',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    tagline: 'Abode of Clouds, Living Root Bridges & Crystal Waters',
    description: 'Venture into primordial rainforests, descend 3,000 steps to the UNESCO Double Decker Living Root Bridge in Nongriat, kayak on the glass-clear waters of Umngot River in Dawki, and explore secret cave systems.',
    minBudgetInr: 13500,
    avgCostPerDayInr: 2200,
    recommendedDurationDays: 5,
    bestSeason: 'October to April',
    bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    difficultyLevel: 'Challenging',
    adventureActivities: ['Double Decker Living Root Trek', 'Krem Mawmluh Caving', 'Umngot River Kayaking', 'Rainbow Falls Hike', 'Cliff Jumping in Krang Shuri'],
    coordinates: { lat: 25.2702, lng: 91.7323 },
    transportOptions: [
      { mode: 'train', name: 'Train to Guwahati Railway Station + Shared Sumo', estimatedCostInr: 1200, durationHours: 7, notes: 'Shared cabs leave every 15 min from Paltan Bazaar to Shillong' },
      { mode: 'flight', name: 'Fly to Guwahati Airport (GAU) + Shared Taxi', estimatedCostInr: 4500, durationHours: 3.5, notes: '3-hour scenic drive along the Umiam Lake highway' }
    ],
    stayOptions: [
      { type: 'hostel', title: 'Shillong Pine Backpacker Hub', pricePerNightInr: 650, highlights: ['Close to Police Bazaar', 'Shared tours desk', 'Guitar jamming'] },
      { type: 'budget_hotel', title: 'Nongriat Village Bamboo Homestay', pricePerNightInr: 800, highlights: ['Directly near root bridge', 'Local Khasi home food', 'Natural pool bath'] },
      { type: 'camping', title: 'Dawki River Island Eco Camp', pricePerNightInr: 1400, highlights: ['Riverside bonfires', 'Barbecue under stars', 'Free morning kayaking'] }
    ],
    foodGuide: {
      avgDailyCost: 600,
      famousDishes: ['Jadoh (Rice cooked in herbs)', 'Dohneiiong (Pork with black sesame)', 'Bamboo shoot curry', 'Pukhlein sweet bread']
    },
    safetyTips: ['Wear shoes with deep grip for slippery mossy steps', 'Always hire a certified local Khasi guide for wild cave exploration', 'Pack waterproof dry bags for electronics'],
    popularityScore: 94,
    isTrending: false,
    tags: ['Nature & Treks', 'Waterfalls', 'Offbeat', 'Under ₹25K']
  },
  {
    id: 'goa-beyond-beaches',
    name: 'Goa Coastal Adventure',
    slug: 'goa',
    stateCountry: 'Goa, India',
    isInternational: false,
    category: 'beaches',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    tagline: 'Coral Reef Scuba, Mangrove Kayaking & Dudhsagar Waterfalls',
    description: 'Beyond the beach parties lies India’s favorite coastal adventure playground. Discover Grande Island scuba diving, backwater kayak trails along the Sal river, sunset surf lessons, and trekking the majestic four-tiered Dudhsagar Falls.',
    minBudgetInr: 8900,
    avgCostPerDayInr: 2100,
    recommendedDurationDays: 4,
    bestSeason: 'November to May',
    bestMonths: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    difficultyLevel: 'Easy',
    adventureActivities: ['Grande Island Scuba Diving', 'Sal River Mangrove Kayaking', 'Dudhsagar Trek & Jeep Safari', 'Surf Lessons in Arambol', 'Parasailing in Calangute'],
    coordinates: { lat: 15.2993, lng: 74.1240 },
    transportOptions: [
      { mode: 'train', name: 'Konkan Railway to Madgaon or Thivim', estimatedCostInr: 1100, durationHours: 12, notes: 'Spectacular tunnels and waterfalls along Western Ghats' },
      { mode: 'flight', name: 'Fly to Mopa (GOX) or Dabolim (GOI)', estimatedCostInr: 3600, durationHours: 2, notes: 'Frequent direct budget flights from all metros' },
      { mode: 'bus', name: 'Overnight AC Sleeper from Mumbai/Bangalore/Pune', estimatedCostInr: 1200, durationHours: 11, notes: 'Arrives early morning right at Panaji or Mapusa' }
    ],
    stayOptions: [
      { type: 'hostel', title: 'Anjuna or Palolem Beach Hostel (Hostel Crowd / Woke)', pricePerNightInr: 650, highlights: ['Walk to beach', 'Pool & Bar', 'Scooter rentals'] },
      { type: 'budget_hotel', title: 'Portuguese Villa Guesthouse in Fontainhas', pricePerNightInr: 1800, highlights: ['Heritage architecture', 'Historic quarter', 'Bakeries nearby'] },
      { type: 'camping', title: 'Agonda Beach Eco Wooden Hut', pricePerNightInr: 1600, highlights: ['Quiet turtle beach', 'Hammocks', 'Sea breeze'] }
    ],
    foodGuide: {
      avgDailyCost: 750,
      famousDishes: ['Goan Fish Thali with Kokum Kadi', 'Chicken Xacuti', 'Poi bread with Chorizo', 'Bebinca dessert']
    },
    safetyTips: ['Only dive with PADI certified dive centers', 'Observe red beach safety flags during heavy swells', 'Always wear helmets on rented two-wheelers'],
    popularityScore: 96,
    isTrending: true,
    tags: ['Beaches & Water', 'Scuba Thrills', 'Under ₹10K', 'Scooter Trails']
  },
  {
    id: 'spiti-valley-wilderness',
    name: 'Spiti Valley',
    slug: 'spiti-valley',
    stateCountry: 'Himachal Pradesh, India',
    isInternational: false,
    category: 'mountains',
    imageUrl: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80'
    ],
    tagline: 'The Middle Land: Ancient Monasteries & Lunar Landscapes',
    description: 'An untouched high-altitude cold desert nestled between Tibet and India. Experience 1,000-year-old Key Monastery, camp near crescent-shaped Chandratal Lake at 14,000 ft, and send a postcard from the world’s highest post office at Hikkim.',
    minBudgetInr: 16500,
    avgCostPerDayInr: 2500,
    recommendedDurationDays: 7,
    bestSeason: 'June to October',
    bestMonths: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    difficultyLevel: 'Challenging',
    adventureActivities: ['Chandratal Lake High Trek', 'Pin Valley National Park Safari', 'Fossil Hunting in Langza', 'Biking through Kunzum Pass', 'Stargazing in Kaza'],
    coordinates: { lat: 32.2276, lng: 78.0710 },
    transportOptions: [
      { mode: 'road_trip', name: 'Shimla - Kinnaur - Kaza Circuit (Gradual Altitude)', estimatedCostInr: 4500, durationHours: 20, notes: 'Recommended route for natural acclimatization' },
      { mode: 'bus', name: 'HRTC Ordinary Bus from Manali to Kaza via Rohtang & Kunzum', estimatedCostInr: 650, durationHours: 10, notes: 'Operates only summer months (late June - Oct)' }
    ],
    stayOptions: [
      { type: 'hostel', title: 'Kaza Nomad Bunkhouse', pricePerNightInr: 750, highlights: ['Warm common room', 'Star telescope', 'High-altitude tea'] },
      { type: 'camping', title: 'Chandratal Swiss Camp under Milky Way', pricePerNightInr: 2200, highlights: ['10 min walk to lake', 'Insulated quilts', 'Hot buffet food'] },
      { type: 'budget_hotel', title: 'Langza Village Family Homestay', pricePerNightInr: 900, highlights: ['Overlooks giant Buddha statue', 'Direct fossil walks'] }
    ],
    foodGuide: {
      avgDailyCost: 550,
      famousDishes: ['Spitian Thukpa', 'Local Barley Porridge (Tsampa)', 'Tibetan Bread with Seabuckthorn Jam', 'Steamed Veg Momos']
    },
    safetyTips: ['Gradual ascent via Kinnaur route prevents AMS', 'Carry cash as ATMs in Kaza frequently run dry', 'Stay insulated against night sub-zero temperatures'],
    popularityScore: 93,
    isTrending: false,
    tags: ['Off-Grid', 'Extreme Landscapes', 'Under ₹25K', 'High Altitude']
  },
  {
    id: 'bali-indonesia-escape',
    name: 'Bali & Nusa Islands',
    slug: 'bali',
    stateCountry: 'Indonesia',
    isInternational: true,
    category: 'islands',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80'
    ],
    tagline: 'Volcanic Sunrises, Manta Ray Dives & Rice Terraces',
    description: 'The world’s favorite island adventure with accessible pricing. Hike active volcano Mount Batur at dawn, swim with wild manta rays in Nusa Penida, surf famous waves in Canggu, and canyon through lush jungle gorges in Ubud.',
    minBudgetInr: 42000,
    avgCostPerDayInr: 3800,
    recommendedDurationDays: 6,
    bestSeason: 'April to October',
    bestMonths: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    difficultyLevel: 'Moderate',
    adventureActivities: ['Mount Batur Volcano Sunrise Trek', 'Manta Point Scuba Diving', 'Ayung River Whitewater Rafting', 'Nusa Penida Kelingking Cliff Hike', 'Jungle Swing & Canyoning'],
    coordinates: { lat: -8.4095, lng: 115.1889 },
    transportOptions: [
      { mode: 'flight', name: 'Return flights to Denpasar Ngurah Rai (DPS)', estimatedCostInr: 24000, durationHours: 7.5, notes: 'Budget carriers operate regular flights from major Indian hubs' },
      { mode: 'road_trip', name: 'Scooter Rental in Ubud / Canggu', estimatedCostInr: 450, durationHours: 24, notes: 'Costs ~₹450/day. Best way to explore local beaches & trails' }
    ],
    stayOptions: [
      { type: 'hostel', title: 'Ubud Jungle Pool Villa Hostel', pricePerNightInr: 950, highlights: ['Infinity pool over rice fields', 'Free breakfast', 'Yoga deck'] },
      { type: 'budget_hotel', title: 'Traditional Balinese Compound with Garden', pricePerNightInr: 1900, highlights: ['Balinese architecture', 'Tropical breakfast', 'Quiet streets'] },
      { type: 'boutique', title: 'Eco Bamboo Cottage near Campuhan Ridge', pricePerNightInr: 3800, highlights: ['100% natural bamboo', 'Outdoor stone bath'] }
    ],
    foodGuide: {
      avgDailyCost: 850,
      famousDishes: ['Nasi Goreng with fried egg', 'Chicken Satay with peanut sauce', 'Fresh dragonfruit smoothie bowls', 'Babi Guling / Vegetarian Gado-Gado']
    },
    safetyTips: ['International driving permit required for scooter riding', 'Watch out for aggressive macaques in monkey forests', 'Always follow rip-current surf safety advice'],
    popularityScore: 99,
    isTrending: true,
    tags: ['International', 'Under ₹50K', 'Volcano Trek', 'Surfing & Coral']
  },
  {
    id: 'vietnam-adventure-loop',
    name: 'Vietnam (Da Nang & Ha Long)',
    slug: 'vietnam',
    stateCountry: 'Vietnam',
    isInternational: true,
    category: 'islands',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    tagline: 'Emerald Karsts, Hidden Sea Caves & Golden Bridges',
    description: 'An affordable Southeast Asian adventure dream. Kayak between 1,600 limestone islands in Ha Long Bay, hike through Marble Mountains in Da Nang, explore the glowing lantern alleys of Hoi An, and ride motorbikes through Hai Van Pass.',
    minBudgetInr: 34000,
    avgCostPerDayInr: 3200,
    recommendedDurationDays: 6,
    bestSeason: 'March to May & September to November',
    bestMonths: ['Mar', 'Apr', 'May', 'Sep', 'Oct', 'Nov'],
    difficultyLevel: 'Moderate',
    adventureActivities: ['Ha Long Bay Sea Kayaking & Caving', 'Hai Van Pass Motorbike Ride', 'Marble Mountains Rock Trek', 'Phong Nha Cave Exploration', 'Basket Boat Ride in Coconut Forest'],
    coordinates: { lat: 16.0544, lng: 108.2022 },
    transportOptions: [
      { mode: 'flight', name: 'Direct Budget Flight to Hanoi or Da Nang (DAD)', estimatedCostInr: 18000, durationHours: 4.5, notes: 'Very competitive fares on VietJet / Vietnam Airlines' },
      { mode: 'train', name: 'Reunification Express Sleeper Train', estimatedCostInr: 1800, durationHours: 12, notes: 'Comfortable air-conditioned soft sleeper cabin' }
    ],
    stayOptions: [
      { type: 'hostel', title: 'Hoi An Lantern Rooftop Backpacker Hostel', pricePerNightInr: 750, highlights: ['Free bicycle rental', 'Swimming pool', 'Social events'] },
      { type: 'budget_hotel', title: 'Da Nang My Khe Beachside Hotel', pricePerNightInr: 1600, highlights: ['200m from surf beach', 'Rooftop sea view'] },
      { type: 'camping', title: 'Lan Ha Bay Overnight Junk Boat Cabin', pricePerNightInr: 3900, highlights: ['All meals & kayak included', 'Sleep in quiet karst bay'] }
    ],
    foodGuide: {
      avgDailyCost: 650,
      famousDishes: ['Authentic Pho Bo (Beef Noodle Soup)', 'Crispy Banh Mi Baguettes', 'Vietnamese Egg Coffee (Ca Phe Trung)', 'Fresh Spring Rolls (Goi Cuon)']
    },
    safetyTips: ['E-visa is easily acquired online in 3 working days', 'Cross busy motorcycle streets with confident, steady pace', 'Drink boiled or filtered water only'],
    popularityScore: 97,
    isTrending: true,
    tags: ['International', 'Under ₹50K', 'Limestone Karsts', 'Cave Expeditions']
  },
  {
    id: 'andaman-scuba-paradise',
    name: 'Andaman (Havelock & Neil)',
    slug: 'andaman',
    stateCountry: 'Andaman & Nicobar Islands, India',
    isInternational: false,
    category: 'islands',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    tagline: 'World-Class Coral Reefs, Bioluminescent Waters & Radhanagar Beach',
    description: 'Untouched island paradise in the Bay of Bengal. Dive with sea turtles and dugongs at Havelock Island, paddle through glowing bioluminescent mangroves at midnight, and trek through virgin rainforests to Elephant Beach.',
    minBudgetInr: 26000,
    avgCostPerDayInr: 3400,
    recommendedDurationDays: 6,
    bestSeason: 'October to May',
    bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
    difficultyLevel: 'Moderate',
    adventureActivities: ['PADI Coral Reef Scuba Diving', 'Night Bioluminescent Kayaking', 'Elephant Beach Jungle Trek', 'Sea Walking at North Bay', 'Snorkeling at Neil Island'],
    coordinates: { lat: 11.9761, lng: 92.9876 },
    transportOptions: [
      { mode: 'flight', name: 'Fly to Port Blair Veer Savarkar Airport (IXZ)', estimatedCostInr: 9500, durationHours: 2.5, notes: 'Direct flights from Chennai, Kolkata, Delhi, Bangalore' },
      { mode: 'bus', name: 'Makruzz / Green Ocean High-Speed Catamaran', estimatedCostInr: 1600, durationHours: 1.5, notes: 'AC Ferry connecting Port Blair to Havelock Island' }
    ],
    stayOptions: [
      { type: 'hostel', title: 'Havelock Diver Dorm & Social Bunk', pricePerNightInr: 850, highlights: ['On-site dive center', 'Hammock lounge', 'Scooter hire'] },
      { type: 'camping', title: 'Radhanagar Jungle Eco Wooden Hut', pricePerNightInr: 2200, highlights: ['Walk to sunset beach #7', 'Surrounded by palms'] }
    ],
    foodGuide: {
      avgDailyCost: 800,
      famousDishes: ['Fresh grilled red snapper', 'Coconut crab curry', 'Banana flower cutlets', 'Tender king coconuts']
    },
    safetyTips: ['Do not touch corals or marine wildlife', 'Book catamaran ferries in advance during peak months', 'Carry cash as mobile network can be intermittent'],
    popularityScore: 95,
    isTrending: false,
    tags: ['Coral Dives', 'Islands', 'Under ₹50K', 'Bioluminescence']
  },
  {
    id: 'bir-billing-paragliding',
    name: 'Bir Billing',
    slug: 'bir-billing',
    stateCountry: 'Himachal Pradesh, India',
    isInternational: false,
    category: 'mountains',
    imageUrl: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80'
    ],
    tagline: 'Soar Like an Eagle at the World’s 2nd Highest Paragliding Site',
    description: 'Take off from Billing at 8,000 ft and soar above the Kangra Valley before touching down smoothly in Tibetan refugee colony Bir. An affordable haven for paragliders, mountain bikers, and cafe lovers.',
    minBudgetInr: 5500,
    avgCostPerDayInr: 1400,
    recommendedDurationDays: 3,
    bestSeason: 'September to November & March to June',
    bestMonths: ['Sep', 'Oct', 'Nov', 'Mar', 'Apr', 'May', 'Jun'],
    difficultyLevel: 'Moderate',
    adventureActivities: ['Tandem Paragliding flight (30 min)', 'Billing Take-off Camping', 'Kangra Valley Downhill Mountain Biking', 'Gunehar Waterfall Hike', 'Chokling Monastery Meditation'],
    coordinates: { lat: 32.0425, lng: 76.7179 },
    transportOptions: [
      { mode: 'bus', name: 'Direct Volvo Sleeper from Delhi to Bir Tibetan Colony', estimatedCostInr: 1100, durationHours: 11, notes: 'Drops directly at Bir landing site' },
      { mode: 'train', name: 'Train to Pathankot / Chakki Bank + Toy Train', estimatedCostInr: 600, durationHours: 8, notes: 'Scenic narrow-gauge toy train to Ahju station' }
    ],
    stayOptions: [
      { type: 'hostel', title: 'Bir Landing View Hostel (The Hosteller / goSTOPS)', pricePerNightInr: 550, highlights: ['Watch gliders land from terrace', 'Cafe', 'Bonfires'] },
      { type: 'camping', title: 'Billing High Peak Ridge Tents', pricePerNightInr: 1400, highlights: ['Watch sunrise over gliders', 'Dinner included'] }
    ],
    foodGuide: {
      avgDailyCost: 500,
      famousDishes: ['Tibetan Laphing & Momos', 'Himachali Dhaam', 'Woodfired sourdough pizza at Glider Cafe', 'Ginger lemon honey tea']
    },
    safetyTips: ['Check wind velocity and pilot license before flight', 'Wear sturdy sports shoes with ankle support for landing', 'Use helmet camera mount for HD flight footage'],
    popularityScore: 94,
    isTrending: true,
    tags: ['Under ₹10K', 'Under ₹5K', 'Paragliding', 'Weekend Getaway']
  }
];

export const ACTIVITIES_DATA: Activity[] = [
  {
    id: 'act-rishikesh-rafting',
    title: 'Grade III & IV Ganga Whitewater Rafting (26 KM)',
    slug: 'rishikesh-whitewater-rafting',
    category: 'rafting',
    destinationName: 'Rishikesh',
    destinationId: 'rishikesh-adventures',
    costInr: 1200,
    durationHours: 4,
    thrillLevel: 'High',
    gearProvided: ['High-buoyancy life vest', 'Safety helmet', 'Paddle', 'Dry bag for essentials'],
    gearRequired: ['Quick-dry synthetic clothing', 'River sandals with straps', 'Sunscreen'],
    bestTime: 'October to May',
    minAge: 14,
    safetyGuidelines: ['Follow captain commands during rapids: Roller Coaster & Golf Course', 'Never let go of the safety tethers'],
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 340
  },
  {
    id: 'act-rishikesh-bungee',
    title: '83m India’s Highest Fixed Platform Bungee Jump',
    slug: 'rishikesh-bungee-jump',
    category: 'paragliding',
    destinationName: 'Rishikesh',
    destinationId: 'rishikesh-adventures',
    costInr: 3700,
    durationHours: 2.5,
    thrillLevel: 'Extreme',
    gearProvided: ['Full body harness', 'Elastic cords inspected by New Zealand experts', 'Safety briefings'],
    gearRequired: ['Snug fitting sneakers', 'Comfortable sportswear'],
    bestTime: 'September to June',
    minAge: 18,
    safetyGuidelines: ['Weight limit: 40kg to 110kg', 'Medical disclosure required for blood pressure or spinal conditions'],
    imageUrl: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 512
  },
  {
    id: 'act-bir-paragliding',
    title: 'Tandem High-Glide Flight over Kangra Valley',
    slug: 'bir-billing-tandem-flight',
    category: 'paragliding',
    destinationName: 'Bir Billing',
    destinationId: 'bir-billing-paragliding',
    costInr: 2500,
    durationHours: 1.5,
    thrillLevel: 'High',
    gearProvided: ['Certified pilot harness', 'Aero helmet', 'GoPro HD video stick'],
    gearRequired: ['Windbreaker jacket', 'Running shoes'],
    bestTime: 'October to November & March to May',
    minAge: 12,
    safetyGuidelines: ['Take a continuous running stride off the Billing cliff edge', 'Do not sit down until in mid-air'],
    imageUrl: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 290
  },
  {
    id: 'act-manali-solang-skiing',
    title: 'Solang Valley Skiing & Snowboarding Lessons',
    slug: 'manali-solang-skiing',
    category: 'skiing',
    destinationName: 'Manali & Solang',
    destinationId: 'manali-himalayas',
    costInr: 1800,
    durationHours: 3,
    thrillLevel: 'Moderate',
    gearProvided: ['Skis & poles', 'Ski boots', 'Goggles', 'Winter snowsuit'],
    gearRequired: ['Thermal innerwear', 'Waterproof gloves', 'Woolen cap'],
    bestTime: 'December to February',
    minAge: 10,
    safetyGuidelines: ['Learn the snowplow stop before attempting steep slopes'],
    imageUrl: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 198
  },
  {
    id: 'act-meghalaya-root-trek',
    title: 'Double Decker Living Root Bridge & Rainbow Falls Trek',
    slug: 'meghalaya-living-root-bridge-trek',
    category: 'trekking',
    destinationName: 'Meghalaya',
    destinationId: 'meghalaya-wonderland',
    costInr: 800,
    durationHours: 6,
    thrillLevel: 'High',
    gearProvided: ['Bamboo hiking pole', 'Local Khasi guide'],
    gearRequired: ['Trail running shoes with deep rubber lugs', 'Electrolyte packs', 'Rain poncho'],
    bestTime: 'October to April',
    minAge: 12,
    safetyGuidelines: ['Ascend 3,200 stone steps with steady breathing rhythm', 'Carry sufficient water'],
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 420
  },
  {
    id: 'act-goa-scuba',
    title: 'Grande Island Coral Reef Scuba Diving with Photos & Videos',
    slug: 'goa-grande-island-scuba',
    category: 'scuba',
    destinationName: 'Goa Coastal Adventure',
    destinationId: 'goa-beyond-beaches',
    costInr: 2800,
    durationHours: 5,
    thrillLevel: 'Moderate',
    gearProvided: ['Wetsuit', 'Scuba tank & BCD', 'Fins & mask', 'Underwater photography'],
    gearRequired: ['Swimwear', 'Dry towel', 'Motion sickness tablets if needed'],
    bestTime: 'November to April',
    minAge: 12,
    safetyGuidelines: ['Equalize ears every meter of descent', 'Never hold your breath on compressed air'],
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 380
  },
  {
    id: 'act-bali-batur-trek',
    title: 'Mount Batur Active Volcano Sunrise Hike with Hot Springs',
    slug: 'mount-batur-sunrise-trek',
    category: 'trekking',
    destinationName: 'Bali & Nusa Islands',
    destinationId: 'bali-indonesia-escape',
    costInr: 2200,
    durationHours: 5.5,
    thrillLevel: 'Moderate',
    gearProvided: ['Headlamp flashlight', 'Walking stick', 'Breakfast steamed over volcanic steam vents', 'Natural hot spring entry'],
    gearRequired: ['Layered warm fleece', 'Hiking shoes', 'Camera'],
    bestTime: 'May to September',
    minAge: 10,
    safetyGuidelines: ['Climb starts at 3:30 AM; maintain single-file line on volcanic ash tracks'],
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 650
  },
  {
    id: 'act-halong-kayak',
    title: 'Ha Long Bay Hidden Cave Sea Kayaking Expedition',
    slug: 'halong-bay-sea-kayak',
    category: 'rafting',
    destinationName: 'Vietnam',
    destinationId: 'vietnam-adventure-loop',
    costInr: 1600,
    durationHours: 3.5,
    thrillLevel: 'Moderate',
    gearProvided: ['Tandem ocean kayak', 'Life jackets', 'Waterproof phone pouch'],
    gearRequired: ['Sun protection hat', 'Rashguard shirt'],
    bestTime: 'September to November & March to May',
    minAge: 8,
    safetyGuidelines: ['Low ceiling in Luon Cave during high tide; duck heads as instructed by lead boat'],
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 310
  }
];

export const TRAVEL_GUIDES_DATA: TravelGuide[] = [
  {
    id: 'guide-high-altitude-survival',
    title: 'High Altitude Acclimatization in Ladakh & Spiti: A Survival Guide',
    slug: 'high-altitude-acclimatization-guide',
    destinationName: 'Leh & Ladakh',
    category: 'Safety & Altitude',
    readTime: '6 min read',
    author: 'Dr. Kabir Sen & TripTrail Medical Team',
    heroImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    summary: 'Everything you must know before landing at 11,500 ft: Acute Mountain Sickness (AMS) stages, hydration regimens, Diamox protocols, and life-saving ascent rules.',
    sections: [
      {
        heading: 'Why Altitude Hits Even Athletes',
        content: 'Atmospheric pressure drops dramatically at 10,000+ feet. Every breath delivers 30-40% fewer oxygen molecules. Physical fitness does not prevent AMS; proper gradual acclimatization does.'
      },
      {
        heading: 'The 48-Hour Golden Rule',
        content: 'If flying directly to Leh, spend Day 1 and Day 2 doing minimal activity in Leh town. Do NOT travel directly to Khardung La (17,982 ft) or Pangong Tso (14,270 ft) on the first two days.'
      },
      {
        heading: 'Hydration and Nutrition',
        content: 'High-altitude air is extremely dry. Drink 4 to 5 liters of water and electrolyte solutions daily. Avoid alcohol, smoking, and heavy oily food for the first 72 hours.'
      }
    ],
    gearChecklist: [
      'Portable pulse oximeter',
      'Acetazolamide (Diamox) after physician consult',
      'Electrolyte powders (ORS)',
      'UV 400 polarized sunglasses',
      'SPF 50+ broad-spectrum sunscreen',
      'Thermos flask for warm water'
    ],
    safetyAlerts: [
      'If suffering from persistent vomiting, disorientation, or rattling cough, descend immediately',
      'Leh SNM Hospital has dedicated 24/7 high-altitude hyperbaric chambers'
    ],
    budgetTips: [
      'Share taxi cabs with fellow travelers from the main market notice board to cut Pangong transport costs by 75%',
      'Eat at local Tibetan dhabas serving hot Thukpa and butter tea for ₹150 instead of tourist cafes'
    ],
    featured: true
  },
  {
    id: 'guide-rishikesh-budget-weekend',
    title: 'The Ultimate Backpacker’s Guide to Rishikesh Under ₹6,000',
    slug: 'rishikesh-under-6000-budget-guide',
    destinationName: 'Rishikesh',
    category: 'Budget Hacks',
    readTime: '5 min read',
    author: 'Aarav Mehta, Budget Expedition Lead',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    summary: 'A step-by-step masterplan for an action-packed 3-day weekend: Rafting Grade IV rapids, cliff jumping, sunset Ganga aarti, and staying in scenic riverside dorms.',
    sections: [
      {
        heading: 'Transportation from Delhi Under ₹800',
        content: 'Take the overnight UTC Janrath AC bus from Kashmiri Gate or the morning Dehradun Jan Shatabdi Express to Haridwar, followed by a ₹50 shared auto-rickshaw to Tapovan.'
      },
      {
        heading: 'Where to Stay for Community & Views',
        content: 'Stay in Tapovan or Upper Tapovan hostels (Zostel, goSTOPS, Bunk Stay). Dorm beds cost between ₹450-₹700 per night and feature clean lockers and rooftop cafes.'
      },
      {
        heading: 'Negotiating Adventure Packages',
        content: 'Book your 16km or 26km rafting in Tapovan directly with Uttarakhand Tourism Development Board (UTDB) certified operators. Combined packages of Rafting + Cliff Jump + Camp often save 30%.'
      }
    ],
    gearChecklist: [
      'Quick-dry microfiber towel',
      'Waterproof phone lanyard',
      'River-safe sandals with backstraps',
      'Cotton harem pants for temple visits',
      'Refillable metal water bottle'
    ],
    safetyAlerts: [
      'Do not jump into the river from unauthorized suspension bridges or cliffs',
      'Avoid unauthorized solo camping along forest tracks'
    ],
    budgetTips: [
      'Rent a Honda Activa scooter for ₹400/day to explore Neer Garh Waterfall, Beatles Ashram, and Vashishta Cave cheaply',
      'Attend the Parmarth Niketan Ganga Aarti for free instead of paid boat tours'
    ],
    featured: true
  },
  {
    id: 'guide-meghalaya-monsoon-trekking',
    title: 'Meghalaya Living Root Bridges: Trekking Guide & Packing List',
    slug: 'meghalaya-root-bridges-trek-guide',
    destinationName: 'Meghalaya',
    category: 'Trekking & Nature',
    readTime: '7 min read',
    author: 'Priya Nongrum & TripTrail Explorers',
    heroImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    summary: 'Descend into the emerald gorges of Nongriat to marvel at 200-year-old bio-engineered living rubber tree bridges and natural turquoise lagoons.',
    sections: [
      {
        heading: 'The 3,200 Steps Descent',
        content: 'Starting from Tyrna village, you will descend roughly 3,200 steep stone steps across two suspension bridges over raging river gorges. Take steady paces and carry bamboo walking sticks.'
      },
      {
        heading: 'Staying Overnight in Nongriat',
        content: 'Do not rush this as a day trip! Staying in a local Khasi bamboo homestay in Nongriat for ₹700 allows you to explore Rainbow Falls and swim in secluded blue pools in the morning mist.'
      }
    ],
    gearChecklist: [
      'Trail shoes with Vibram or deep rubber tread',
      'Breathable rain jacket or poncho',
      'Knee support braces for the descent',
      'Dry bag for phone and passport',
      'Natural citronella mosquito repellent'
    ],
    safetyAlerts: [
      'Rocks around the waterfalls are extremely slippery due to heavy mist and algae',
      'Do not carve or pluck roots from the Living Root Bridges; they are sacred tribal heritage'
    ],
    budgetTips: [
      'Take a shared Tata Sumo from Shillong Bara Bazaar to Sohra (Cherrapunji) for ₹120 instead of a ₹2,500 private cab'
    ],
    featured: false
  }
];

export const SAMPLE_USER_TRIPS: Trip[] = [
  {
    id: 'trip-rishikesh-demo',
    userId: 'demo-user-123',
    title: 'Rishikesh Rapids & Cliff Weekend',
    destinationId: 'rishikesh-adventures',
    destinationName: 'Rishikesh',
    destinationImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-11-14',
    endDate: '2026-11-16',
    durationDays: 3,
    startingCity: 'New Delhi',
    travelersCount: 2,
    travelGroupType: 'friends',
    totalBudget: 12000,
    currency: 'INR',
    comfortLevel: 'standard',
    travelStyle: 'adventure',
    transportMode: 'train',
    accommodationType: 'hostel',
    dietaryPreference: 'mixed',
    estimatedCosts: {
      transport: 2800,
      stay: 3000,
      food: 2600,
      activities: 2800,
      buffer: 800,
      total: 12000
    },
    actualTotalCost: 7450,
    status: 'booked',
    itinerary: [
      {
        id: 'day-1',
        tripId: 'trip-rishikesh-demo',
        dayNumber: 1,
        date: '2026-11-14',
        title: 'Arrival, Tapovan Exploration & Ganga Sunset Aarti',
        theme: 'Arrival & Chill Vibes',
        schedule: [
          { time: '06:45 AM', title: 'Board Jan Shatabdi from New Delhi', description: 'Scenic train journey reaching Haridwar at 11:15 AM', estimatedCostInr: 450, category: 'transport', tip: 'Sit on the right side for morning sun' },
          { time: '12:00 PM', title: 'Check in to Tapovan Hostel', description: 'Drop backpacks, freshen up and grab lunch at Little Buddha Cafe', estimatedCostInr: 350, category: 'food' },
          { time: '03:30 PM', title: 'Neer Garh Waterfall Hike', description: '2 km moderate uphill hike through pine woods to cascading natural pools', estimatedCostInr: 100, category: 'activity' },
          { time: '06:00 PM', title: 'Triveni Ghat Evening Aarti', description: 'Witness sacred chants and floating brass oil lamps on the Ganges', estimatedCostInr: 0, category: 'leisure' }
        ],
        meals: { breakfast: 'Train breakfast & Chai', lunch: 'Nutella pancakes & hummus platter at Little Buddha', dinner: 'Garhwali Thali at Tapovan Dhabas', costInr: 850 },
        stayNotes: 'Tapovan Backpacker Bunkhouse, bed #4',
        dayBudgetInr: 3800
      },
      {
        id: 'day-2',
        tripId: 'trip-rishikesh-demo',
        dayNumber: 2,
        date: '2026-11-15',
        title: 'Whitewater Rapids & 83m Adrenaline Bungee',
        theme: 'High Adventure & Thrills',
        schedule: [
          { time: '08:30 AM', title: 'Drive to Marine Drive for 26km Whitewater Rafting', description: 'Navigate roller-coaster rapids, Three Blind Mice & Golf Course with certified captain', estimatedCostInr: 1400, category: 'activity', tip: 'Secure waterproof camera to lifejacket' },
          { time: '01:00 PM', title: 'Cliff Jump at Magpie Beach', description: '25-foot cliff plunge into clean emerald mountain water', estimatedCostInr: 0, category: 'activity' },
          { time: '03:30 PM', title: '83m Fixed Platform Bungee Jump', description: 'Jump from India’s highest cantilever platform at Mohan Chatti', estimatedCostInr: 3700, category: 'activity' },
          { time: '08:00 PM', title: 'Riverside Campfire & Acoustic Jam', description: 'Gather around bonfire under starry skies by the riverbank', estimatedCostInr: 300, category: 'leisure' }
        ],
        meals: { breakfast: 'Aloo paratha with curd', lunch: 'Fresh river beach snack & Maggie', dinner: 'Woodfired thin crust pizza at Beatles Cafe', costInr: 1100 },
        stayNotes: 'Shivpuri River Camp Dome Tent',
        dayBudgetInr: 5800
      },
      {
        id: 'day-3',
        tripId: 'trip-rishikesh-demo',
        dayNumber: 3,
        date: '2026-11-16',
        title: 'Morning Yoga, Beatles Ashram & Return',
        theme: 'Culture & Farewell',
        schedule: [
          { time: '07:00 AM', title: 'Sunrise Hatha Yoga by the River', description: 'Gentle stretching and pranayama session overlooking Ram Jhula', estimatedCostInr: 200, category: 'leisure' },
          { time: '10:00 AM', title: 'Chaurasi Kutia (The Beatles Ashram)', description: 'Explore graffiti-adorned meditation domes where The Beatles wrote the White Album in 1968', estimatedCostInr: 150, category: 'activity' },
          { time: '04:00 PM', title: 'Return AC Volvo Sleeper to Delhi', description: 'Comfortable bus journey arriving in Delhi by 10:30 PM', estimatedCostInr: 750, category: 'transport' }
        ],
        meals: { breakfast: 'Fruit smoothie bowls & herbal tea', lunch: 'South Indian Dosa at Madras Cafe', dinner: 'Snacks on highway food court', costInr: 650 },
        stayNotes: 'Check out at 11:00 AM',
        dayBudgetInr: 2400
      }
    ],
    expenses: [
      { id: 'exp-1', tripId: 'trip-rishikesh-demo', category: 'transport', description: 'Train tickets New Delhi to Haridwar', amount: 900, currency: 'INR', date: '2026-11-14' },
      { id: 'exp-2', tripId: 'trip-rishikesh-demo', category: 'stay', description: 'Tapovan hostel advance booking', amount: 1300, currency: 'INR', date: '2026-11-14' },
      { id: 'exp-3', tripId: 'trip-rishikesh-demo', category: 'activity', description: '26km Ganga rafting slots for two', amount: 2400, currency: 'INR', date: '2026-11-15' },
      { id: 'exp-4', tripId: 'trip-rishikesh-demo', category: 'food', description: 'Beatles Cafe dinner bill', amount: 850, currency: 'INR', date: '2026-11-15' },
      { id: 'exp-5', tripId: 'trip-rishikesh-demo', category: 'transport', description: 'Scooter rental + petrol', amount: 650, currency: 'INR', date: '2026-11-15' }
    ],
    isPublic: true,
    createdAt: '2026-10-15T10:00:00Z',
    updatedAt: '2026-10-17T09:30:00Z'
  }
];
