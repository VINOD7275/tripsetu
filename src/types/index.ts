export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateToInr: number; // 1 foreign unit = X INR (e.g. 1 USD = 86 INR)
}

export type DestinationCategory = 
  | 'mountains' 
  | 'beaches' 
  | 'forests' 
  | 'deserts' 
  | 'islands' 
  | 'cities' 
  | 'heritage';

export type ThrillLevel = 'Mild' | 'Moderate' | 'High' | 'Extreme';

export type ComfortLevel = 'backpacker' | 'standard' | 'comfort' | 'luxury';

export type TravelGroupType = 'solo' | 'couple' | 'family' | 'friends';

export type TravelStyle = 'adventure' | 'relaxed' | 'cultural' | 'nature' | 'foodie';

export type TransportMode = 'flight' | 'train' | 'bus' | 'road_trip';

export type AccommodationType = 'hostel' | 'budget_hotel' | 'boutique' | 'luxury_resort' | 'camping';

export interface TransportOption {
  mode: TransportMode;
  name: string;
  estimatedCostInr: number;
  durationHours: number;
  notes: string;
}

export interface StayOption {
  type: AccommodationType;
  title: string;
  pricePerNightInr: number;
  highlights: string[];
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  stateCountry: string;
  isInternational: boolean;
  category: DestinationCategory;
  imageUrl: string;
  gallery: string[];
  tagline: string;
  description: string;
  minBudgetInr: number;
  avgCostPerDayInr: number;
  recommendedDurationDays: number;
  bestSeason: string;
  bestMonths: string[];
  difficultyLevel: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
  adventureActivities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  transportOptions: TransportOption[];
  stayOptions: StayOption[];
  foodGuide: {
    avgDailyCost: number;
    famousDishes: string[];
  };
  safetyTips: string[];
  popularityScore: number;
  isTrending?: boolean;
  tags: string[];
}

export interface Activity {
  id: string;
  title: string;
  slug: string;
  category: 'trekking' | 'camping' | 'rafting' | 'paragliding' | 'scuba' | 'safari' | 'roadtrip' | 'climbing' | 'skiing';
  destinationName: string;
  destinationId?: string;
  costInr: number;
  durationHours: number;
  thrillLevel: ThrillLevel;
  gearProvided: string[];
  gearRequired: string[];
  bestTime: string;
  minAge: number;
  safetyGuidelines: string[];
  imageUrl: string;
  rating: number;
  reviewsCount: number;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  estimatedCostInr: number;
  category: 'transport' | 'activity' | 'food' | 'stay' | 'leisure';
  icon?: string;
  tip?: string;
}

export interface TripItineraryDay {
  id: string;
  tripId: string;
  dayNumber: number;
  date?: string;
  title: string;
  theme: string;
  schedule: ScheduleItem[];
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
    costInr: number;
  };
  stayNotes: string;
  dayBudgetInr: number;
}

export interface TripExpense {
  id: string;
  tripId: string;
  userId?: string;
  category: 'transport' | 'stay' | 'food' | 'activity' | 'gear' | 'misc';
  description: string;
  amount: number;
  currency: CurrencyCode;
  date: string;
}

export interface Trip {
  id: string;
  userId: string;
  title: string;
  destinationId: string;
  destinationName: string;
  destinationImage: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  startingCity: string;
  travelersCount: number;
  travelGroupType: TravelGroupType;
  totalBudget: number;
  currency: CurrencyCode;
  comfortLevel: ComfortLevel;
  travelStyle: TravelStyle;
  transportMode: TransportMode;
  accommodationType: AccommodationType;
  dietaryPreference: string;
  accessibilityNotes?: string;
  estimatedCosts: {
    transport: number;
    stay: number;
    food: number;
    activities: number;
    buffer: number;
    total: number;
  };
  actualTotalCost?: number;
  status: 'planning' | 'booked' | 'active' | 'completed' | 'cancelled';
  itinerary: TripItineraryDay[];
  expenses?: TripExpense[];
  isPublic?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TravelGuide {
  id: string;
  title: string;
  slug: string;
  destinationName: string;
  category: string;
  readTime: string;
  author: string;
  heroImage: string;
  summary: string;
  sections: {
    heading: string;
    content: string;
  }[];
  gearChecklist: string[];
  safetyAlerts: string[];
  budgetTips: string[];
  featured?: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  homeCity: string;
  preferredCurrency: CurrencyCode;
  travelStyle: string;
  bio: string;
  adventuresCompleted: number;
}

export interface TripPlanFormData {
  startingCity: string;
  destinationId?: string;
  isSurpriseMe?: boolean;
  budget: number;
  currency: CurrencyCode;
  startDate: string;
  endDate: string;
  travelersCount: number;
  travelGroupType: TravelGroupType;
  transportMode: TransportMode;
  accommodationType: AccommodationType;
  comfortLevel: ComfortLevel;
  travelStyle: TravelStyle;
  dietaryPreference: string;
  selectedActivities: string[];
  accessibilityNotes?: string;
}
