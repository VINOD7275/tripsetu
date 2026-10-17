-- ==============================================================================
-- TRIPTRAIL: SUPABASE POSTGRESQL PRODUCTION DATABASE SCHEMA & RLS POLICIES
-- ==============================================================================

-- 1. Enable required extensions
create extension if not exists "uuid-ossp";

-- 2. PROFILES TABLE (Linked to auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  avatar_url text,
  home_city text default 'New Delhi',
  preferred_currency text default 'INR',
  travel_style text default 'Adventure & Budget',
  bio text default 'Passionate explorer discovering thrills on a budget.',
  adventures_completed int default 0,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 3. DESTINATIONS TABLE (Adventure & Budget Destinations)
create table if not exists public.destinations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  state_country text not null,
  is_international boolean default false,
  category text not null, -- 'mountains', 'beaches', 'forests', 'deserts', 'islands', 'cities'
  image_url text not null,
  gallery text[] default '{}',
  tagline text not null,
  description text not null,
  min_budget_inr numeric not null,
  avg_cost_per_day_inr numeric not null,
  recommended_duration_days int not null,
  best_season text not null,
  best_months text[] default '{}',
  difficulty_level text default 'Moderate', -- 'Easy', 'Moderate', 'Challenging', 'Extreme'
  adventure_activities text[] default '{}',
  coordinates jsonb not null default '{"lat": 0, "lng": 0}',
  transport_options jsonb not null default '[]',
  stay_options jsonb not null default '[]',
  food_guide jsonb not null default '{"avg_daily_cost": 600, "famous_dishes": []}',
  safety_tips text[] default '{}',
  popularity_score numeric default 90,
  is_trending boolean default false,
  tags text[] default '{}',
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 4. ACTIVITIES TABLE (Adventure thrills & sports)
create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category text not null, -- 'trekking', 'camping', 'rafting', 'paragliding', 'scuba', 'safari', 'roadtrip'
  destination_name text not null,
  destination_id uuid references public.destinations(id) on delete set null,
  cost_inr numeric not null,
  duration_hours numeric default 3,
  thrill_level text default 'High', -- 'Mild', 'Moderate', 'High', 'Extreme'
  gear_provided text[] default '{}',
  gear_required text[] default '{}',
  best_time text not null,
  min_age int default 12,
  safety_guidelines text[] default '{}',
  image_url text not null,
  rating numeric default 4.8,
  reviews_count int default 120,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 5. TRIPS TABLE (User planned and saved journeys)
create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  destination_id uuid references public.destinations(id) on delete set null,
  destination_name text not null,
  destination_image text,
  start_date date not null,
  end_date date not null,
  duration_days int not null,
  starting_city text not null,
  travelers_count int default 1 not null,
  travel_group_type text default 'solo', -- 'solo', 'couple', 'family', 'friends'
  total_budget numeric not null,
  currency text default 'INR' not null,
  comfort_level text default 'standard', -- 'backpacker', 'standard', 'comfort', 'luxury'
  travel_style text default 'adventure', -- 'adventure', 'relaxed', 'cultural', 'nature'
  transport_mode text default 'train', -- 'flight', 'train', 'bus', 'road_trip'
  accommodation_type text default 'budget_hotel',
  dietary_preference text default 'mixed',
  accessibility_notes text,
  estimated_transport_cost numeric default 0,
  estimated_stay_cost numeric default 0,
  estimated_food_cost numeric default 0,
  estimated_activity_cost numeric default 0,
  estimated_buffer_cost numeric default 0,
  estimated_total_cost numeric default 0,
  actual_total_cost numeric default 0,
  status text default 'planning', -- 'planning', 'booked', 'active', 'completed', 'cancelled'
  is_public boolean default false,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 6. TRIP ITINERARY DAYS TABLE
create table if not exists public.trip_itinerary_days (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid references public.trips(id) on delete cascade not null,
  day_number int not null,
  date date,
  title text not null,
  theme text,
  schedule jsonb not null default '[]',
  meals jsonb not null default '{"breakfast": "", "lunch": "", "dinner": "", "cost": 0}',
  stay_notes text,
  day_budget numeric default 0,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 7. TRIP EXPENSES TABLE (Budget vs Actual Tracker)
create table if not exists public.trip_expenses (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid references public.trips(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  category text not null, -- 'transport', 'stay', 'food', 'activity', 'gear', 'misc'
  description text not null,
  amount numeric not null,
  currency text default 'INR' not null,
  date date default current_date not null,
  receipt_url text,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 8. TRAVEL GUIDES TABLE
create table if not exists public.travel_guides (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  destination_name text not null,
  category text not null,
  read_time text default '5 min read',
  author text default 'TripTrail Expedition Team',
  hero_image text not null,
  summary text not null,
  sections jsonb not null default '[]',
  gear_checklist text[] default '{}',
  safety_alerts text[] default '{}',
  budget_tips text[] default '{}',
  featured boolean default false,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==============================================================================
create index if not exists idx_destinations_category on public.destinations(category);
create index if not exists idx_destinations_budget on public.destinations(min_budget_inr);
create index if not exists idx_destinations_is_intl on public.destinations(is_international);
create index if not exists idx_activities_category on public.activities(category);
create index if not exists idx_activities_destination on public.activities(destination_id);
create index if not exists idx_trips_user on public.trips(user_id);
create index if not exists idx_trips_status on public.trips(status);
create index if not exists idx_trip_itinerary_days_trip on public.trip_itinerary_days(trip_id);
create index if not exists idx_trip_expenses_trip on public.trip_expenses(trip_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all sensitive tables
alter table public.profiles enable row level security;
alter table public.destinations enable row level security;
alter table public.activities enable row level security;
alter table public.trips enable row level security;
alter table public.trip_itinerary_days enable row level security;
alter table public.trip_expenses enable row level security;
alter table public.travel_guides enable row level security;

-- PROFILES POLICIES
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- DESTINATIONS & ACTIVITIES POLICIES (Public read-only)
create policy "Anyone can read destinations"
  on public.destinations for select
  using (true);

create policy "Anyone can read activities"
  on public.activities for select
  using (true);

create policy "Anyone can read travel guides"
  on public.travel_guides for select
  using (true);

-- TRIPS POLICIES
create policy "Users can view their own trips or public trips"
  on public.trips for select
  using (auth.uid() = user_id or is_public = true);

create policy "Users can create their own trips"
  on public.trips for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own trips"
  on public.trips for update
  using (auth.uid() = user_id);

create policy "Users can delete their own trips"
  on public.trips for delete
  using (auth.uid() = user_id);

-- TRIP ITINERARY DAYS POLICIES
create policy "Users can view itinerary for visible trips"
  on public.trip_itinerary_days for select
  using (
    exists (
      select 1 from public.trips
      where trips.id = trip_itinerary_days.trip_id
      and (trips.user_id = auth.uid() or trips.is_public = true)
    )
  );

create policy "Users can manage itinerary for their own trips"
  on public.trip_itinerary_days for all
  using (
    exists (
      select 1 from public.trips
      where trips.id = trip_itinerary_days.trip_id
      and trips.user_id = auth.uid()
    )
  );

-- TRIP EXPENSES POLICIES
create policy "Users can view expenses for their trips"
  on public.trip_expenses for select
  using (auth.uid() = user_id);

create policy "Users can create expenses for their trips"
  on public.trip_expenses for insert
  with check (auth.uid() = user_id);

create policy "Users can update their expenses"
  on public.trip_expenses for update
  using (auth.uid() = user_id);

create policy "Users can delete their expenses"
  on public.trip_expenses for delete
  using (auth.uid() = user_id);

-- ==============================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER
-- ==============================================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger execution
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
