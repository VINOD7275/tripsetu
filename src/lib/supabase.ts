import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { DESTINATIONS_DATA, ACTIVITIES_DATA, TRAVEL_GUIDES_DATA, SAMPLE_USER_TRIPS } from '../data/mockData';
import { Trip, TripExpense, Destination, Activity, TravelGuide, UserProfile } from '../types';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

// Create actual client if configured, otherwise null
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local storage storage keys for offline/demo resilience
const STORAGE_KEYS = {
  TRIPS: 'triptrail_trips',
  USER: 'triptrail_active_user',
  EXPENSES: 'triptrail_expenses',
};

// Initial local storage setup helper
const initializeLocalStorage = () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(STORAGE_KEYS.TRIPS)) {
    localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(SAMPLE_USER_TRIPS));
  }
};

initializeLocalStorage();

export const DEMO_USER: UserProfile = {
  id: 'demo-traveler-007',
  email: 'explorer@triptrail.com',
  fullName: 'Arjun Verma',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  homeCity: 'New Delhi',
  preferredCurrency: 'INR',
  travelStyle: 'High Adrenaline & Budget Backpacking',
  bio: 'Himalayan trekker, white water rafter, and weekend summit chaser.',
  adventuresCompleted: 14
};

// ============================================================================
// DATA ACCESS LAYER (SUPABASE WITH RESILIENT FALLBACK)
// ============================================================================

export const tripTrailApi = {
  // Check connection status
  getConnectionStatus: () => ({
    isLive: isSupabaseConfigured,
    url: supabaseUrl || 'Not configured (using local reactive storage)',
    storageMode: isSupabaseConfigured ? 'Supabase PostgreSQL' : 'Local Persistent Storage & Offline Ready'
  }),

  // Destinations
  async getDestinations(): Promise<Destination[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('destinations').select('*');
        if (!error && data && data.length > 0) {
          return data as Destination[];
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to bundled dataset:', err);
      }
    }
    return DESTINATIONS_DATA;
  },

  async getDestinationBySlug(slug: string): Promise<Destination | undefined> {
    const destinations = await this.getDestinations();
    return destinations.find((d) => d.slug === slug || d.id === slug);
  },

  // Activities
  async getActivities(): Promise<Activity[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('activities').select('*');
        if (!error && data && data.length > 0) {
          return data as Activity[];
        }
      } catch (err) {
        console.warn('Supabase activities fetch failed:', err);
      }
    }
    return ACTIVITIES_DATA;
  },

  // Travel Guides
  async getGuides(): Promise<TravelGuide[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('travel_guides').select('*');
        if (!error && data && data.length > 0) {
          return data as TravelGuide[];
        }
      } catch (err) {
        console.warn('Supabase guides fetch failed:', err);
      }
    }
    return TRAVEL_GUIDES_DATA;
  },

  // Trips CRUD
  async getTrips(userId?: string): Promise<Trip[]> {
    if (supabase && userId) {
      try {
        const { data, error } = await supabase
          .from('trips')
          .select('*, trip_itinerary_days(*), trip_expenses(*)')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data.map((t: any) => ({
            ...t,
            itinerary: t.trip_itinerary_days || [],
            expenses: t.trip_expenses || []
          }));
        }
      } catch (err) {
        console.warn('Supabase getTrips failed:', err);
      }
    }

    // Local Storage fallback
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TRIPS);
      return stored ? JSON.parse(stored) : SAMPLE_USER_TRIPS;
    } catch {
      return SAMPLE_USER_TRIPS;
    }
  },

  async getTripById(tripId: string): Promise<Trip | undefined> {
    const allTrips = await this.getTrips();
    return allTrips.find((t) => t.id === tripId);
  },

  async saveTrip(trip: Trip): Promise<Trip> {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('trips').upsert({
          id: trip.id,
          user_id: trip.userId,
          title: trip.title,
          destination_id: trip.destinationId,
          destination_name: trip.destinationName,
          destination_image: trip.destinationImage,
          start_date: trip.startDate,
          end_date: trip.endDate,
          duration_days: trip.durationDays,
          starting_city: trip.startingCity,
          travelers_count: trip.travelersCount,
          travel_group_type: trip.travelGroupType,
          total_budget: trip.totalBudget,
          currency: trip.currency,
          comfort_level: trip.comfortLevel,
          travel_style: trip.travelStyle,
          transport_mode: trip.transportMode,
          accommodation_type: trip.accommodationType,
          dietary_preference: trip.dietaryPreference,
          accessibility_notes: trip.accessibilityNotes,
          estimated_transport_cost: trip.estimatedCosts.transport,
          estimated_stay_cost: trip.estimatedCosts.stay,
          estimated_food_cost: trip.estimatedCosts.food,
          estimated_activity_cost: trip.estimatedCosts.activities,
          estimated_buffer_cost: trip.estimatedCosts.buffer,
          estimated_total_cost: trip.estimatedCosts.total,
          status: trip.status,
          is_public: trip.isPublic ?? false
        }).select().single();

        if (error) {
          console.warn('Supabase trip upsert error:', error);
        }
      } catch (err) {
        console.warn('Supabase saveTrip error:', err);
      }
    }

    // Always update local storage for offline continuity
    try {
      const current = await this.getTrips();
      const existingIndex = current.findIndex((t) => t.id === trip.id);
      let updated: Trip[];
      if (existingIndex >= 0) {
        updated = [...current];
        updated[existingIndex] = { ...trip, updatedAt: new Date().toISOString() };
      } else {
        updated = [trip, ...current];
      }
      localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed saving to localStorage', e);
    }

    return trip;
  },

  async deleteTrip(tripId: string): Promise<boolean> {
    if (supabase) {
      try {
        await supabase.from('trips').delete().eq('id', tripId);
      } catch (err) {
        console.warn('Supabase deleteTrip error:', err);
      }
    }

    try {
      const current = await this.getTrips();
      const filtered = current.filter((t) => t.id !== tripId);
      localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(filtered));
      return true;
    } catch {
      return false;
    }
  },

  async addExpense(tripId: string, expense: Omit<TripExpense, 'id'>): Promise<TripExpense> {
    const newExpense: TripExpense = {
      ...expense,
      id: 'exp-' + Math.random().toString(36).substring(2, 9),
      tripId
    };

    if (supabase) {
      try {
        await supabase.from('trip_expenses').insert({
          id: newExpense.id,
          trip_id: tripId,
          category: newExpense.category,
          description: newExpense.description,
          amount: newExpense.amount,
          currency: newExpense.currency,
          date: newExpense.date
        });
      } catch (e) {
        console.warn('Supabase expense error:', e);
      }
    }

    // Update trip in localStorage
    const trips = await this.getTrips();
    const trip = trips.find((t) => t.id === tripId);
    if (trip) {
      trip.expenses = [...(trip.expenses || []), newExpense];
      trip.actualTotalCost = (trip.expenses || []).reduce((acc, curr) => acc + curr.amount, 0);
      await this.saveTrip(trip);
    }

    return newExpense;
  }
};
