# Architektura Techniczna – Introsphere

## 1. Przegląd Architektury

Introsphere to webowa aplikacja PWA (Progressive Web App) typu journaling dla Gen Z. Architektura oparta na nowoczesnym stacku JAMstack z wykorzystaniem Supabase jako backend-as-a-service.

### Stack Technologiczny (MVP)

| Warstwa | Technologia | Uzasadnienie |
|---------|-------------|--------------|
| **Frontend** | React 18 + Vite | Szybki start, Hot Module Replacement |
| **Styling** | Tailwind CSS + Shadcn UI | Gotowe komponenty,dark aesthetic |
| **State** | React Context + Zustand | Prosty, lekki, bez boilerplate |
| **Backend** | Supabase | PostgreSQL + Auth + API |
| **Hosting** | Vercel | Darmowy tier, CDN globalny |
| **Routing** | React Router v6 | Standard SPA routing |

---

## 2. Architektura Systemu

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           INTROSPHERE ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌──────────────┐        ┌──────────────┐        ┌──────────────┐   │
│   │   Browser    │        │   Mobile     │        │   Desktop    │   │
│   │   (Chrome)   │        │  (Safari)   │        │  (Firefox)   │   │
│   └──────┬───────┘        └──────┬───────┘        └──────┬───────┘   │
│          │                       │                       │           │
│          └───────────────────────┼───────────────────────┘           │
│                                  ▼                                      │
│                    ┌─────────────────────────────┐                    │
│                    │        Vercel CDN           │                    │
│                    │    (Static Assets + API)     │                    │
│                    └──────────────┬──────────────┘                    │
│                                   │                                     │
│                                   ▼                                     │
│                    ┌─────────────────────────────┐                    │
│                    │      Supabase Edge          │                    │
│                    │  (PostgreSQL + Auth + API)  │                    │
│                    └─────────────────────────────┘                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Przepływ Danych

1. **Request Flow**:
   ```
   Użytkownik → Vercel Edge → Supabase API → PostgreSQL
   ```

2. **Auth Flow**:
   ```
   Użytkownik → Supabase Auth → JWT Token → LocalStorage
   ```

3. **Data Flow**:
   ```
   React Component → Supabase Client → RLS Policies → DB
   ```

---

## 3. Architektura Frontend

### Struktura Plików

```
src/
├── main.tsx                 # Entry point
├── App.tsx                  # Root component + routing
├── index.css                # Global styles + Tailwind
│
├── components/              # Reusable UI components
│   ├── ui/                  # Shadcn base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── layout/              # Layout components
│   │   ├── MainLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   └── OnboardingLayout.tsx
│   ├── emotion-wheel/       # Emotion wheel components
│   │   ├── EmotionWheel.tsx
│   │   ├── EmotionNode.tsx
│   │   └── EmotionDetails.tsx
│   ├── journey/             # Journey components
│   │   ├── JourneyCard.tsx
│   │   ├── JourneyProgress.tsx
│   │   └── DayQuestion.tsx
│   ├── calendar/            # Calendar components
│   │   ├── MoodCalendar.tsx
│   │   ├── CalendarDay.tsx
│   │   └── CalendarEntry.tsx
│   └── common/              # Shared components
│       ├── LoadingSpinner.tsx
│       └── EmptyState.tsx
│
├── pages/                   # Page components (routes)
│   ├── Landing.tsx          # / - public landing
│   ├── Onboarding.tsx       # /onboarding - setup
│   ├── Home.tsx             # /home - dashboard
│   ├── Journey.tsx          # /journey/:id - active journey
│   ├── Session.tsx          # /session - emotion session
│   ├── Calendar.tsx         # /calendar - mood calendar
│   ├── History.tsx          # /history - past entries
│   ├── Settings.tsx         # /settings - user settings
│   └── Auth.tsx             # /auth - login/register
│
├── lib/                     # Core utilities
│   ├── supabase.ts          # Supabase client + config
│   ├── auth.ts              # Auth helpers
│   ├── database.ts          # Type-safe DB queries
│   └── utils.ts             # General utilities
│
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts           # Auth state management
│   ├── useJourney.ts        # Journey logic
│   ├── useCalendar.ts       # Calendar data
│   ├── useEmotions.ts      # Emotion wheel logic
│   └── useSession.ts        # Session state
│
├── stores/                  # Zustand stores
│   ├── authStore.ts         # Auth user state
│   ├── themeStore.ts        # Atmosphere/theme
│   └── sessionStore.ts      # Current session state
│
├── types/                   # TypeScript definitions
│   ├── database.ts          # DB table types
│   ├── journey.ts           # Journey types
│   ├── emotion.ts           # Emotion types
│   └── index.ts             # Common types
│
├── data/                    # Static data (MVP)
│   ├── journeys.ts          # Journey content (42 questions)
│   ├── emotions.ts         # Emotion definitions
│   ├── questions.ts        # Question bank
│   └── themes.ts           # Atmosphere themes
│
└── constants/               # App constants
    ├── routes.ts            # Route paths
    ├── config.ts            # App config
    └── index.ts
```

### Komponenty – Opis Struktury

#### State Management (Zustand)

```typescript
// stores/authStore.ts
interface AuthStore {
  user: User | null;
  session: Session | null;
  loading: boolean;
  
  // Actions
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

// stores/themeStore.ts
interface ThemeStore {
  atmosphere: AtmosphereType;
  theme: 'light' | 'dark';
  
  // Actions
  setAtmosphere: (atmosphere: AtmosphereType) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

// stores/sessionStore.ts
interface SessionStore {
  currentMood: Emotion | null;
  currentJourney: JourneyProgress | null;
  currentQuestion: Question | null;
  currentResponse: string;
  
  // Actions
  selectMood: (emotion: Emotion) => void;
  startJourney: (journeyId: string) => void;
  submitResponse: (text: string) => Promise<void>;
  reset: () => void;
}
```

#### Custom Hooks

```typescript
// hooks/useJourney.ts
function useJourney(journeyId: string) {
  // - Fetch journey data
  // - Manage progress (current day)
  // - Handle day completion
  // - Update UI state
}

// hooks/useCalendar.ts  
function useCalendar(month: Date) {
  // - Fetch calendar entries
  // - Calculate mood trends
  // - Generate statistics
}

// hooks/useEmotions.ts
function useEmotions() {
  // - Load emotion wheel data
  // - Handle emotion selection
  // - Manage spectrum navigation
}
```

---

## 4. Architektura Backend (Supabase)

### Supabase Client Configuration

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Database types auto-generated by Supabase CLI
export type Database = import('./types/database');
```

### Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_journey_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_mood_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own data
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own responses" ON user_responses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own responses" ON user_responses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ... similar for other tables
```

### API Routes (Supabase Edge Functions)

```typescript
// supabase/functions/get-journey-progress/index.ts
Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
  
  const authHeader = req.headers.get('Authorization')!;
  const token = authHeader.replace('Bearer ', '');
  const { data: { user } } = await supabase.auth.getUser(token);
  
  const { data: progress } = await supabase
    .from('user_journey_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('journey_id', req.json().journeyId)
    .single();
  
  return new Response(JSON.stringify(progress));
});
```

### Database Functions (PL/pgSQL)

```sql
-- Funkcja: Pobierz postęp journey z dniem
CREATE OR REPLACE FUNCTION get_journey_progress(user_id UUID, journey_id VARCHAR)
RETURNS TABLE (
  id UUID,
  journey_id VARCHAR,
  current_day INT,
  status VARCHAR,
  started_at TIMESTAMP,
  completed_at TIMESTAMP
) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ujp.id,
    ujp.journey_id,
    ujp.current_day,
    ujp.status,
    ujp.started_at,
    ujp.completed_at
  FROM user_journey_progress ujp
  WHERE ujp.user_id = get_journey_progress.user_id
    AND ujp.journey_id = get_journey_progress.journey_id;
END;
$$;

-- Funkcja: Statystyki użytkownika
CREATE OR REPLACE FUNCTION get_user_stats(user_id UUID)
RETURNS TABLE (
  journeys_started INT,
  journeys_completed INT,
  total_sessions INT,
  streak_days INT
) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) FILTER (WHERE 1=1) as journeys_started,
    COUNT(*) FILTER (WHERE status = 'completed') as journeys_completed,
    (SELECT COUNT(*) FROM user_responses WHERE user_id = get_user_stats.user_id) as total_sessions,
    (SELECT COUNT(DISTINCT entry_date) FROM mood_calendar 
     WHERE user_id = get_user_stats.user_id 
       AND entry_date >= CURRENT_DATE - INTERVAL '30 days') as streak_days;
END;
$$;
```

---

## 5. Architektura Bazy Danych

### Diagram Relacji

```
┌─────────────┐       ┌─────────────────────────┐       ┌─────────────┐
│   journeys  │       │  user_journey_progress  │       │   profiles  │
├─────────────┤       ├─────────────────────────┤       ├─────────────┤
│ id (PK)     │◄──────│ journey_id (FK)         │       │ id (PK)     │
│ title       │       │ user_id (FK)─────────────┼───────►│ email       │
│ title_en    │       │ current_day             │       │ timezone    │
│ subtitle    │       │ status                  │       │ created_at  │
│ is_active   │       │ started_at              │       └─────────────┘
└──────┬──────┘       └────────────┬──────────────┘
       │                          │
       ▼                          ▼
┌─────────────┐       ┌─────────────────────────┐
│journey_days │       │    user_responses       │
├─────────────┤       ├─────────────────────────┤
│ id (PK)     │       │ id (PK)                 │
│ journey_id  │       │ user_id (FK)           │
│ day_number  │       │ journey_id (FK)        │
│ question    │       │ journey_day            │
│ question_en │       │ mood_id                │
└─────────────┘       │ question               │
                      │ response               │
                      │ created_at             │
                      └────────────┬────────────┘
                                   │
                                   ▼
                      ┌─────────────────────────┐
                      │   mood_calendar         │
                      ├─────────────────────────┤
                      │ id (PK)                 │
                      │ user_id (FK)────────────┼──┐
                      │ entry_date             │  │
                      │ primary_emotion_id     │  │
                      └─────────────────────────┘  │
                                   │              │
                                   ▼              ▼
                      ┌─────────────────────────┐
                      │   calendar_entries      │
                      ├─────────────────────────┤
                      │ id (PK)                 │
                      │ calendar_id (FK)        │
                      │ user_id (FK)           │
                      │ content                 │
                      │ emotion_id              │
                      │ source_type             │
                      └─────────────────────────┘

┌─────────────┐       ┌─────────────────────────┐
│  emotions   │       │   user_mood_checkins   │
├─────────────┤       ├─────────────────────────┤
│ id (PK)     │       │ id (PK)                 │
│ name        │◄──────│ primary_emotion_id (FK) │
│ name_en     │       │ user_id (FK)           │
│ spectrum    │       │ response_text          │
│ parent_id   │       │ checked_in_at          │
│ wheel_pos   │       └─────────────────────────┘
└─────────────┘

┌─────────────┐
│user_settings│
├─────────────┤
│ id (PK)     │
│ user_id (FK)│
│ theme       │
│ language    │
│ reminder_.. │
└─────────────┘
```

### Optymalizacja Indeksów

```sql
-- User queries
CREATE INDEX idx_user_journey_progress_user 
  ON user_journey_progress(user_id);

CREATE INDEX idx_user_responses_user_date 
  ON user_responses(user_id, created_at DESC);

CREATE INDEX idx_mood_calendar_user_month 
  ON mood_calendar(user_id, entry_date DESC);

-- Journey queries
CREATE INDEX idx_journey_days_journey 
  ON journey_days(journey_id, day_number);

-- Emotion queries
CREATE INDEX idx_emotions_spectrum 
  ON emotions(spectrum, parent_id NULLS FIRST);
```

---

## 6. Auth & Security

### Autentykacja (Supabase Auth)

```typescript
// lib/auth.ts
import { supabase } from './supabase';

export const auth = {
  // Email/Password
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { data, error };
  },
  
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },
  
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { data, error };
  },
  
  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },
  
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },
  
  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    return { data, error };
  },
};

// Auth callback handler
export async function handleAuthCallback() {
  const { hash } = window.location;
  if (hash) {
    const { data: { session }, error } = await supabase.auth.getSessionFromUrl();
    if (session) {
      await supabase.auth.setSession(session);
      window.location.hash = '';
    }
  }
}
```

### Session Management

```typescript
// hooks/useAuth.ts
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );
    
    return () => subscription.unsubscribe();
  }, []);
  
  return { user, loading, signIn, signUp, signOut };
}
```

---

## 7. Routing & Navigation

### Route Structure

```typescript
// lib/routes.ts
export const routes = {
  // Public
  home: '/',
  landing: '/',
  
  // Auth
  auth: '/auth',
  authCallback: '/auth/callback',
  resetPassword: '/auth/reset-password',
  
  // App (protected)
  onboarding: '/onboarding',
  dashboard: '/home',
  journey: '/journey/:id',
  session: '/session',
  calendar: '/calendar',
  history: '/history',
  settings: '/settings',
  
  // Premium
  premium: '/premium',
};

// App.tsx
function App() {
  const { user, loading } = useAuth();
  
  if (loading) return <Loading />;
  
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<Landing />} path={routes.landing} />
      
      {/* Auth routes */}
      <Route element={<Auth />} path={routes.auth} />
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Onboarding />} path={routes.onboarding} />
        <Route element={<Dashboard />} path={routes.dashboard} />
        <Route element={<Journey />} path={routes.journey} />
        <Route element={<Session />} path={routes.session} />
        <Route element={<Calendar />} path={routes.calendar} />
        <Route element={<History />} path={routes.history} />
        <Route element={<Settings />} path={routes.settings} />
      </Route>
    </Routes>
  );
}
```

### Protected Route Component

```typescript
// components/layout/ProtectedRoute.tsx
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate(routes.auth);
    }
  }, [user, loading]);
  
  if (loading) return <LoadingSpinner />;
  if (!user) return null;
  
  return <>{children}</>;
}
```

---

## 8. Atmosphere / Theme System

### Theme Configuration

```typescript
// data/themes.ts
export type AtmosphereType = 
  | 'cream-calm'
  | 'green-forest'
  | 'dark-ink'
  | 'soft-pink'
  | 'silver-tech';

export interface AtmosphereTheme {
  id: AtmosphereType;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    accent: string;
  };
  font: {
    heading: string;
    body: string;
  };
  borderRadius: string;
}

export const atmospheres: Record<AtmosphereType, AtmosphereTheme> = {
  'cream-calm': {
    id: 'cream-calm',
    name: 'Cream Calm',
    colors: {
      primary: '#F5F5DC',
      secondary: '#E8E4D9',
      background: '#FAFAF8',
      surface: '#FFFFFF',
      text: '#2D2D2D',
      textMuted: '#6B6B6B',
      border: '#E0DCD4',
      accent: '#B8A082',
    },
    font: {
      heading: 'font-sans',
      body: 'font-sans',
    },
    borderRadius: 'rounded-2xl',
  },
  // ... other atmospheres
};
```

### Theme Application

```typescript
// stores/themeStore.ts
export const useThemeStore = create<ThemeStore>((set) => ({
  atmosphere: 'dark-ink',
  
  setAtmosphere: (atmosphere) => {
    // Save to localStorage + DB
    localStorage.setItem('atmosphere', atmosphere);
    set({ atmosphere });
  },
}));

// Apply theme via CSS custom properties
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { atmosphere } = useThemeStore();
  const theme = atmospheres[atmosphere];
  
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [theme]);
  
  return <>{children}</>;
}
```

---

## 9. State Management Architecture

### Zustand Store Structure

```typescript
// stores/index.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Auth Store
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      loading: true,
      
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setLoading: (loading) => set({ loading }),
    }),
    { name: 'auth-storage' }
  )
);

// Theme Store
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      atmosphere: 'dark-ink',
      theme: 'dark',
      
      setAtmosphere: (atmosphere) => set({ atmosphere }),
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'theme-storage' }
  )
);

// Session Store (non-persisted)
export const useSessionStore = create<SessionState>((set) => ({
  currentMood: null,
  currentJourneyId: null,
  currentDay: 1,
  currentQuestion: null,
  responseText: '',
  
  selectMood: (emotion) => set({ currentMood: emotion }),
  startJourney: (journeyId) => set({ 
    currentJourneyId: journeyId, 
    currentDay: 1 
  }),
  setQuestion: (question) => set({ currentQuestion: question }),
  setResponse: (text) => set({ responseText: text }),
  nextDay: () => set((state) => ({ 
    currentDay: state.currentDay + 1 
  })),
  reset: () => set({
    currentMood: null,
    currentJourneyId: null,
    currentDay: 1,
    currentQuestion: null,
    responseText: '',
  }),
}));
```

---

## 10. API Layer

### Query Functions

```typescript
// lib/database.ts
import { supabase } from './supabase';
import type { Database } from '../types/database';

type Journey = Database['public']['Tables']['journeys']['Row'];
type JourneyDay = Database['public']['Tables']['journey_days']['Row'];
type UserJourneyProgress = Database['public']['Tables']['user_journey_progress']['Row'];
type UserResponse = Database['public']['Tables']['user_responses']['Row'];

// Journeys
export async function getJourneys(): Promise<Journey[]> {
  const { data, error } = await supabase
    .from('journeys')
    .select('*')
    .eq('is_active', true)
    .order('display_order');
  
  if (error) throw error;
  return data;
}

export async function getJourneyDays(journeyId: string): Promise<JourneyDay[]> {
  const { data, error } = await supabase
    .from('journey_days')
    .select('*')
    .eq('journey_id', journeyId)
    .order('day_number');
  
  if (error) throw error;
  return data;
}

// Journey Progress
export async function getUserJourneyProgress(userId: string): Promise<UserJourneyProgress[]> {
  const { data, error } = await supabase
    .from('user_journey_progress')
    .select('*')
    .eq('user_id', userId)
    .order('started_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function startJourney(
  userId: string, 
  journeyId: string
): Promise<UserJourneyProgress> {
  const { data, error } = await supabase
    .from('user_journey_progress')
    .upsert({
      user_id: userId,
      journey_id: journeyId,
      current_day: 1,
      status: 'in_progress',
      started_at: new Date().toISOString(),
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function completeJourneyDay(
  userId: string,
  journeyId: string,
  day: number,
  response: string,
  question: string
): Promise<void> {
  // 1. Save response
  await supabase.from('user_responses').insert({
    user_id: userId,
    journey_id: journeyId,
    journey_day: day,
    question,
    response,
  });
  
  // 2. Update progress
  if (day < 7) {
    await supabase
      .from('user_journey_progress')
      .update({ current_day: day + 1 })
      .eq('user_id', userId)
      .eq('journey_id', journeyId);
  } else {
    await supabase
      .from('user_journey_progress')
      .update({ 
        status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('journey_id', journeyId);
  }
}

// Calendar
export async function getCalendarEntries(
  userId: string,
  startDate: string,
  endDate: string
) {
  const { data, error } = await supabase
    .from('mood_calendar')
    .select(`
      *,
      entries:calendar_entries(*)
    `)
    .eq('user_id', userId)
    .gte('entry_date', startDate)
    .lte('entry_date', endDate)
    .order('entry_date');
  
  if (error) throw error;
  return data;
}
```

---

## 11. Deployment

### Vercel Configuration

```json
// vercel.json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_SUPABASE_URL": "@supabase-url",
    "VITE_SUPABASE_ANON_KEY": "@supabase-anon-key"
  }
}
```

### Environment Variables

```env
# .env.local
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Vercel (production)
VITE_SUPABASE_URL=@supabase-url
VITE_SUPABASE_ANON_KEY=@supabase-anon-key
```

### Build & Deploy

```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview

# Deploy (Vercel)
vercel deploy --prod
```

---

## 12. PWA Configuration

### Manifest

```json
// public/manifest.json
{
  "name": "Introsphere",
  "short_name": "Introsphere",
  "description": "Narzędzie do pracy z emocjami",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#0a0a0a",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Service Worker

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icons/*.png'],
      manifest: {
        name: 'Introsphere',
        short_name: 'Introsphere',
        description: 'Narzędzie do pracy z emocjami',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
      },
    }),
  ],
});
```

---

## 13. Monitoring & Error Handling

### Error Boundaries

```typescript
// components/ErrorBoundary.tsx
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error:', error, info);
    // Send to error tracking
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### Analytics (opcjonalnie)

```typescript
// lib/analytics.ts (plausible or simple)
export const analytics = {
  pageView: (path: string) => {
    // Send to analytics
    console.log('Page view:', path);
  },
  
  event: (name: string, props?: Record<string, string>) => {
    console.log('Event:', name, props);
  },
};
```

---

## 14. Podsumowanie

| Aspekt | Rozwiązanie |
|--------|-------------|
| **Framework** | React 18 + Vite |
| **Styling** | Tailwind + Shadcn UI |
| **Backend** | Supabase (PostgreSQL + Auth) |
| **Hosting** | Vercel |
| **State** | Zustand + React Context |
| **Routing** | React Router v6 |
| **PWA** | vite-plugin-pwa |
| **Auth** | Supabase Auth (Email + Google) |
| **DB Security** | Row Level Security |

### Prosty MVP (< 15h)

1. Setup Vite + Tailwind + Shadcn – 2h
2. Emotion Wheel + pytania – 3h
3. Journey system – 3h  
4. Kalendarz – 2h
5. Auth + Supabase – 2h
6. Polish + deploy – 3h

**Razem: ~15h** ✓

---

*Architektura stworzona dla Introsphere MVP – gotowa do implementacji.*