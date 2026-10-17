import { Destination, TripItineraryDay, TripPlanFormData, Activity, ScheduleItem } from '../types';
import { DESTINATIONS_DATA, ACTIVITIES_DATA } from '../data/mockData';

export interface BudgetBreakdown {
  transport: number;
  stay: number;
  food: number;
  activities: number;
  buffer: number;
  total: number;
  perPerson: number;
  budgetStatus: 'under' | 'exact' | 'over';
  differenceFromTarget: number;
  alternatives: Destination[];
}

export const calculateTripBudgetEstimate = (
  destination: Destination,
  formData: {
    durationDays: number;
    travelersCount: number;
    budget: number;
    transportMode: string;
    accommodationType: string;
    comfortLevel: string;
    selectedActivities?: string[];
  }
): BudgetBreakdown => {
  const { durationDays, travelersCount, budget, transportMode, accommodationType, comfortLevel, selectedActivities = [] } = formData;

  // 1. Transport Cost
  let transportBasePerPerson = 1200;
  const foundTransport = destination.transportOptions.find((t) => t.mode === transportMode);
  if (foundTransport) {
    transportBasePerPerson = foundTransport.estimatedCostInr;
  } else {
    if (transportMode === 'flight') transportBasePerPerson = destination.isInternational ? 22000 : 5000;
    else if (transportMode === 'train') transportBasePerPerson = 1200;
    else if (transportMode === 'bus') transportBasePerPerson = 850;
    else if (transportMode === 'road_trip') transportBasePerPerson = 1800;
  }
  const totalTransport = transportBasePerPerson * travelersCount;

  // 2. Stay Cost
  let stayBasePerNight = 800;
  const foundStay = destination.stayOptions.find((s) => s.type === accommodationType);
  if (foundStay) {
    stayBasePerNight = foundStay.pricePerNightInr;
  } else {
    if (accommodationType === 'hostel') stayBasePerNight = 600;
    else if (accommodationType === 'camping') stayBasePerNight = 1200;
    else if (accommodationType === 'budget_hotel') stayBasePerNight = 1600;
    else if (accommodationType === 'boutique') stayBasePerNight = 3200;
    else if (accommodationType === 'luxury_resort') stayBasePerNight = 5500;
  }

  // Adjust stay for travelers (e.g., hostel is per person, rooms are shared between 2)
  const nights = Math.max(1, durationDays - 1);
  let totalStay = 0;
  if (accommodationType === 'hostel') {
    totalStay = stayBasePerNight * travelersCount * nights;
  } else {
    const roomsCount = Math.ceil(travelersCount / 2);
    totalStay = stayBasePerNight * roomsCount * nights;
  }

  // Comfort multiplier
  let comfortMultiplier = 1;
  if (comfortLevel === 'backpacker') comfortMultiplier = 0.85;
  if (comfortLevel === 'comfort') comfortMultiplier = 1.3;
  if (comfortLevel === 'luxury') comfortMultiplier = 1.8;

  totalStay = Math.round(totalStay * comfortMultiplier);

  // 3. Food Cost
  const dailyFoodPerPerson = destination.foodGuide.avgDailyCost || 600;
  const totalFood = Math.round(dailyFoodPerPerson * comfortMultiplier * travelersCount * durationDays);

  // 4. Activities Cost
  let totalActivities = 0;
  if (selectedActivities.length > 0) {
    // Look up selected activity costs
    selectedActivities.forEach((actNameOrId) => {
      const match = ACTIVITIES_DATA.find((a) => a.id === actNameOrId || a.title === actNameOrId);
      if (match) {
        totalActivities += match.costInr * travelersCount;
      } else {
        totalActivities += 1500 * travelersCount; // Default activity estimate
      }
    });
  } else {
    // Default estimated 1-2 adventures per trip
    totalActivities = Math.round(1800 * travelersCount * Math.max(1, Math.floor(durationDays / 2)));
  }

  // 5. Buffer (10% emergency/contingency)
  const subtotal = totalTransport + totalStay + totalFood + totalActivities;
  const buffer = Math.round(subtotal * 0.1);
  const total = subtotal + buffer;
  const perPerson = Math.round(total / travelersCount);

  // Status against target budget
  let budgetStatus: 'under' | 'exact' | 'over' = 'exact';
  const diff = budget - total;
  if (diff > 500) budgetStatus = 'under';
  else if (diff < -500) budgetStatus = 'over';

  // Find alternatives if over budget
  const alternatives = findAffordableAlternatives(budget, destination.id, destination.category);

  return {
    transport: totalTransport,
    stay: totalStay,
    food: totalFood,
    activities: totalActivities,
    buffer,
    total,
    perPerson,
    budgetStatus,
    differenceFromTarget: Math.abs(diff),
    alternatives
  };
};

export const findAffordableAlternatives = (
  budget: number,
  currentDestinationId: string,
  category?: string
): Destination[] => {
  return DESTINATIONS_DATA
    .filter((d) => d.id !== currentDestinationId && d.minBudgetInr <= budget)
    .sort((a, b) => {
      // Prioritize same category, then popularity
      if (category && a.category === category && b.category !== category) return -1;
      if (category && b.category === category && a.category !== category) return 1;
      return b.popularityScore - a.popularityScore;
    })
    .slice(0, 3);
};

export const generateIntelligentItinerary = (
  destination: Destination,
  durationDays: number,
  travelersCount: number,
  selectedActivities: string[] = []
): TripItineraryDay[] => {
  const days: TripItineraryDay[] = [];
  const activitiesList = ACTIVITIES_DATA.filter((a) => a.destinationName.toLowerCase().includes(destination.name.toLowerCase()) || a.destinationId === destination.id);

  for (let i = 1; i <= durationDays; i++) {
    const isFirstDay = i === 1;
    const isLastDay = i === durationDays;
    let theme = 'Scenic Adventure & Discovery';
    let title = `Day ${i}: Exploring ${destination.name}`;
    const schedule: ScheduleItem[] = [];

    if (isFirstDay) {
      theme = 'Arrival & Acclimatization';
      title = `Day 1: Arrival, Settling in & Sunset Vistas`;
      schedule.push({
        time: '11:00 AM',
        title: `Arrive in ${destination.name} & Check-in`,
        description: `Check into accommodations, unpack gear, and take in the surrounding landscape.`,
        estimatedCostInr: 0,
        category: 'stay',
        tip: 'Keep identification and booking confirmation handy'
      });
      schedule.push({
        time: '01:30 PM',
        title: `Welcome Local Lunch`,
        description: `Savor authentic regional flavors (${destination.foodGuide.famousDishes[0] || 'local specialty'}).`,
        estimatedCostInr: 450 * travelersCount,
        category: 'food'
      });
      schedule.push({
        time: '04:30 PM',
        title: `Orientation Walk & Sunset Viewpoint`,
        description: `Gentle walk through the local bazaar and scenic trail to witness golden hour.`,
        estimatedCostInr: 100 * travelersCount,
        category: 'leisure',
        tip: 'Bring a light fleece as evening temperatures drop quickly'
      });
      schedule.push({
        time: '08:00 PM',
        title: `Cozy Dinner & Night Briefing`,
        description: `Group briefing for the upcoming adventure activities and gear checklist.`,
        estimatedCostInr: 500 * travelersCount,
        category: 'food'
      });
    } else if (isLastDay) {
      theme = 'Sunrise Farewell & Departure';
      title = `Day ${i}: Golden Dawn, Souvenirs & Journey Home`;
      schedule.push({
        time: '06:30 AM',
        title: `Sunrise Meditation & Valley View`,
        description: `Enjoy the peaceful morning mist and mountain/beach sunrise with hot tea.`,
        estimatedCostInr: 50 * travelersCount,
        category: 'leisure'
      });
      schedule.push({
        time: '09:00 AM',
        title: `Hearty Breakfast & Pack Bags`,
        description: `Fuel up with fresh breakfast and check out from accommodation.`,
        estimatedCostInr: 300 * travelersCount,
        category: 'food'
      });
      schedule.push({
        time: '11:30 AM',
        title: `Local Crafts & Souvenir Market`,
        description: `Support local artisans; pick up authentic handicrafts, teas, or spices.`,
        estimatedCostInr: 500,
        category: 'leisure',
        tip: 'Bargain politely at cooperative handicraft stalls'
      });
      schedule.push({
        time: '03:00 PM',
        title: `Return Departure`,
        description: `Begin journey back home with unforgettable adventure memories.`,
        estimatedCostInr: 0,
        category: 'transport'
      });
    } else {
      // High Adventure Days
      const dayAdventureIndex = (i - 2) % (activitiesList.length || 1);
      const activity = activitiesList[dayAdventureIndex];
      const activityName = activity ? activity.title : (destination.adventureActivities[i % destination.adventureActivities.length] || 'High Mountain Trail');

      theme = i % 2 === 0 ? 'Peak Adrenaline & Thrills' : 'Hidden Trails & Nature Immersion';
      title = `Day ${i}: ${activityName}`;

      schedule.push({
        time: '07:30 AM',
        title: `Energizing Breakfast & Gear Prep`,
        description: `Hydrate, inspect harnesses/shoes, and apply sunscreen.`,
        estimatedCostInr: 300 * travelersCount,
        category: 'food'
      });
      schedule.push({
        time: '09:30 AM',
        title: `${activityName}`,
        description: activity 
          ? `Safety orientation by certified instructors followed by ${activity.durationHours} hours of pure thrill.` 
          : `Guided adventure session experiencing the best natural terrain of ${destination.name}.`,
        estimatedCostInr: (activity?.costInr || 1500) * travelersCount,
        category: 'activity',
        tip: activity?.safetyGuidelines[0] || 'Stay attentive to instructor safety signals'
      });
      schedule.push({
        time: '02:00 PM',
        title: `Scenic Mountain / Beach Lunch`,
        description: `Rest and recharge with hot food and fresh beverages.`,
        estimatedCostInr: 400 * travelersCount,
        category: 'food'
      });
      schedule.push({
        time: '04:30 PM',
        title: `Photography & Leisure Exploration`,
        description: `Capture panoramic landscapes, explore nearby natural springs or ancient shrines.`,
        estimatedCostInr: 150 * travelersCount,
        category: 'leisure'
      });
      schedule.push({
        time: '08:00 PM',
        title: `Stargazing & Campfire Storytelling`,
        description: `Relax by the campfire under clear skies with travel mates.`,
        estimatedCostInr: 450 * travelersCount,
        category: 'food'
      });
    }

    const dayTotalCost = schedule.reduce((sum, item) => sum + item.estimatedCostInr, 0);

    days.push({
      id: `day-${i}-${Math.random().toString(36).substring(2, 7)}`,
      tripId: '',
      dayNumber: i,
      title,
      theme,
      schedule,
      meals: {
        breakfast: 'Fresh fruits, eggs/parathas, herbal tea',
        lunch: destination.foodGuide.famousDishes[i % destination.foodGuide.famousDishes.length] || 'Local Thali',
        dinner: 'Warm soup, regional stew/curry & flatbreads',
        costInr: 1100 * travelersCount
      },
      stayNotes: `${destination.name} verified accommodation`,
      dayBudgetInr: dayTotalCost
    });
  }

  return days;
};
