# Architektura Techniczna – Introsphere

## 1. Przegląd Architektury

Introsphere to webowa aplikacja PWA (Progressive Web App) typu journaling dla Gen Z. Architektura oparta na nowoczesnym stacku JAMstack z wykorzystaniem Supabase jako backend-as-a-service.

### Stack Technologiczny

| Warstwa | Technologia | Uzasadnienie |
|---------|-------------|--------------|
| **Frontend** | React 18 + Vite | Szybki start, Hot Module Replacement |
| **Styling** | Tailwind CSS + Shadcn UI | Gotowe komponenty, dark aesthetic |
| **State** | Zustand (persist) | Prosty, lekki, localStorage sync |
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
├── App.tsx                  # Root component + routing + atmosphere class application
├── index.css                # Global styles + Tailwind + atmosphere CSS variables
│
├── components/              # Reusable UI components
│   ├── ui/                  # Shadcn base components (Button, Card, Input, Dialog, Textarea, IconButton)
│   ├── layout/              # Layout components
│   │   ├── MainLayout.tsx       # Top nav bar (logo + Home, Journeys, Calendar, History, Settings)
│   │   ├── AuthLayout.tsx
│   │   ├── OnboardingLayout.tsx
│   │   └── ProtectedRoute.tsx
│   ├── emotion-wheel/       # Koło emocji
│   │   ├── EmotionWheel.tsx     # SVG 8-sektorowe koło (L3 emotions) + click handler
│   │   └── EmotionDetails.tsx   # Modal wyboru podspektra / stay at L3
│   ├── journey/             # Journey components
│   │   ├── JourneyCard.tsx      # Journey list item
│   │   ├── JourneyProgress.tsx  # 7-day progress indicator
│   │   └── DayView.tsx          # Pełna strona dla dnia (pytanie + textarea + submit)
│   ├── calendar/            # Calendar components
│   │   ├── MoodCalendar.tsx     # Monthly grid, day dots
│   │   └── CalendarEntry.tsx    # Entry preview (inline)
│   └── common/              # Shared components
│       ├── LoadingSpinner.tsx
│       └── EmptyState.tsx
│
├── pages/                   # Page components (routes)
│   ├── Landing.tsx          # /
│   ├── Intro.tsx            # /intro
│   ├── HowItWorks.tsx       # /how-it-works
│   ├── Auth.tsx             # /auth (login/register)
│   ├── Onboarding.tsx       # /onboarding
│   ├── Home.tsx             # /home dashboard
│   ├── Journeys.tsx         # /journeys list
│   ├── Journey.tsx          # /journey/:id overview + /journey/:id/day/:dayNumber
│   ├── Session.tsx          # /session – emotion wheel → redirect to /emotion-reflection
│   ├── EmotionReflection.tsx # /emotion-reflection – pytania do emocji (hardcoded)
│   ├── QuickEntry.tsx       # /quick-entry – szybki mood checkin
│   ├── Calendar.tsx         # /calendar – MoodCalendar + expanded entries
│   ├── History.tsx          # /history – lista wszystkich wpisów z filtrowaniem
│   └── Settings.tsx         # /settings – theme toggle + atmosphere picker
│
├── lib/                     # Core utilities
│   ├── supabase.ts          # Supabase client (używa typów z types/database.ts)
│   ├── database.ts          # Wszystkie zapytania DB
│   └── utils.ts             # Utilities (cn helper)
│
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts           # Wrapper na authStore
│   ├── useCalendar.ts       # Pobieranie wpisów dla miesiąca
│   ├── useHomeStats.ts      # Pobieranie statystyk dla strony głównej
│   └── useHistory.ts        # Pobieranie wszystkich wpisów z filtrowaniem
│
├── stores/                  # Zustand stores
│   ├── authStore.ts         # Auth state + signIn/signUp/signOut (persist)
│   ├── themeStore.ts        # atmosphere + isDark (persist)
│   ├── journeyStore.ts      # completedDays map + syncFromDatabase() (persist)
│   └── sessionStore.ts      # entryDeletedCount – trigger refetch po usunięciu wpisu
│
├── types/                   # TypeScript definitions
│   ├── database.ts          # Ręczne typy DB (tabele Supabase)
│   ├── emotion.ts           # Emotion, AtmosphereType
│   ├── journey.ts           # Journey, JourneyDay
│   ├── question.ts          # Question types (pomocnicze)
│   ├── user.ts              # User types
│   └── reflection.ts        # Reflection types
│
├── data/                    # Static data
│   ├── journeys.ts          # 6 journeys × 7 dni (42 pytania)
│   ├── emotions.ts          # 8 L3 + 16 L2/L1 + utility functions
│   ├── themes.ts            # 8 atmosphere themes
│   └── questions.ts         # (nieużywane – pozostałość po wcześniejszym planie)
│
└── constants/               # App constants
    ├── routes.ts            # ROUTES object
    └── config.ts            # App config
```

### Stores

| Store | Stan | Persist | Użycie |
|-------|------|---------|--------|
| `authStore` | `user`, `session`, `loading`, `initialized` | ✅ `auth-storage` | Autentykacja, dostęp przez `useAuth` |
| `themeStore` | `atmosphere`, `isDark` | ✅ `theme-storage` | Motyw i tryb jasny/ciemny |
| `journeyStore` | `completedDays: Record<string, number[]>` | ✅ `journey-completed-days` | Lokalny cache postępu journey + syncFromDatabase() |
| `sessionStore` | `entryDeletedCount` | ❌ | Trigger refetch komponentów po usunięciu wpisu |

```typescript
// stores/authStore.ts
export const useAuthStore = create<AuthState>()(
  persist((set) => ({
    user: null,
    session: null,
    loading: true,
    initialized: false,
    setUser, setSession, setLoading, setInitialized,
    signIn: async (email, password) => { /* supabase.auth.signInWithPassword */ },
    signUp: async (email, password) => { /* supabase.auth.signUp */ },
    signOut: async () => { /* supabase.auth.signOut */ },
  }), { name: 'auth-storage' })
);

// stores/themeStore.ts
export const useThemeStore = create<ThemeStore>()(
  persist((set) => ({
    atmosphere: 'cream-calm',
    isDark: false,
    setAtmosphere: (atmosphere) => set({ atmosphere }),
    setIsDark: (isDark) => set({ isDark }),
    toggleDark: () => set((s) => ({ isDark: !s.isDark })),
  }), { name: 'theme-storage' })
);

// stores/journeyStore.ts
export const useJourneyStore = create<JourneyStore>()(
  persist((set, get) => ({
    completedDays: {},
    setCompletedDays,    // dodaje dzień do mapy
    getCompletedDays,    // zwraca number[] dla journeyId
    resetJourney,        // usuwa wpisy dla journeyId
    getCurrentDay,       // max(completedDays) + 1
    syncFromDatabase,    // pobiera z calendar_entries i nadpisuje lokalny stan
  }), { name: 'journey-completed-days' })
);

// stores/sessionStore.ts
export const useSessionStore = create<SessionStore>((set) => ({
  entryDeletedCount: 0,
  incrementEntryDeletedCount: () => set(s => ({ entryDeletedCount: s.entryDeletedCount + 1 })),
}));
```

Logika sesji (wybór emocji, pytania, zapis odpowiedzi) jest obsługiwana bezpośrednio w komponentach stron (`Session.tsx`, `EmotionReflection.tsx`) i `journeyStore`.

### Custom Hooks

| Hook | Odpowiedzialność |
|------|-----------------|
| `useAuth` | Inicjalizacja sesji Supabase, listener zmian auth, wrapper na authStore |
| `useCalendar` | Pobiera wpisy z `calendar_entries` dla danego miesiąca |
| `useHomeStats` | Pobiera statystyki użytkownika (streak, total sessions, top emotion) |
| `useHistory` | Pobiera wszystkie wpisy z filtrowaniem po dacie/typie |

---

## 4. Backend (Supabase) – RZECZIWISTY

### Supabase Client

Aplikacja używa Supabase JS client bezpośrednio z komponentów i `lib/database.ts`. Nie ma własnych backendowych API routes ani Edge Functions.

```typescript
// lib/supabase.ts
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
    realtime: {
      params: { eventsPerSecond: 10 },
    },
  }
);
```

### Row Level Security (RLS)

RLS włączone na tabelach z danymi użytkownika. Zapytania używają `user_id` z autentykacji Supabase. Tabele `user_journey_progress`, `user_responses`, `user_mood_checkins` istnieją w schemacie ale nie są używane przez aplikację.

### Data Access Layer

Wszystkie operacje bazy danych przeprowadzane są przez funkcje w `lib/database.ts`:

- `saveMoodEntry()` – upsert `mood_calendar` + insert `calendar_entries`
- `saveJourneyDayResponse()` – insert `calendar_entries` z `journey_id` i `journey_day`
- `getCalendarEntriesForMonth(userId, year, month)` – wpisy dla miesiąca
- `getCalendarEntriesForDateRange(userId, startDate, endDate)` – zakres dat
- `getEntriesForDate(userId, date)` – wpisy z jednego dnia
- `getAllEntries(userId, limit?)` – wszystkie wpisy (najnowsze najpierw)
- `deleteEntry(entryId, userId)` – usuwa wpis + czyści mood_calendar jeśli brak wpisów dla dnia
- `getJourneyDaysCompleted(userId)` – pobiera ukończone dni journey z `calendar_entries`
- `getUserStats(userId)` – `{ streakDays, totalSessions, topEmotion }`
- `getWeekActivity(userId)` – `number[]` aktywności dla bieżącego tygodnia (Pon–Niedz)

Journeys są danymi statycznymi z `data/journeys.ts`. Nie ma funkcji `getJourneys()`, `startJourney()` ani `completeJourneyDay()` — progress jest liczony z `calendar_entries`.

## 5. Architektura Bazy Danych

### Tabele Używane przez Aplikację

```
┌─────────────┐
│   profiles  │
├─────────────┤
│ id (PK)     │  ← auth.users.id
│ email       │
│ display_name│
│ timezone    │
│ onboarding_completed │
│ created_at  │
└─────────────┘

┌─────────────────────────┐       ┌─────────────────────────┐
│      mood_calendar      │       │    calendar_entries     │
├─────────────────────────┤       ├─────────────────────────┤
│ id (PK)                 │◄──────│ calendar_id (FK)        │
│ user_id (FK)            │       │ id (PK)                 │
│ entry_date (YYYY-MM-DD) │       │ user_id (FK)            │
│ primary_emotion_id      │       │ content                 │
│ primary_emotion_name    │       │ emotion_id              │
│ color                   │       │ emotion_name            │
│ secondary_emotions      │       │ color                   │
│ created_at              │       │ journey_id (FK, opt.)   │
└─────────────────────────┘       │ journey_day (int, opt.) │
                                  │ source_type             │
                                  │ created_at              │
                                  └─────────────────────────┘

┌─────────────┐
│user_settings│
├─────────────┤
│ id (PK)     │
│ user_id (FK)│
│ theme       │
│ language    │
│ daily_reminder_enabled │
│ reminder_time          │
└─────────────┘
```

**Tabele istniejące w schemacie, ale nieużywane przez aplikację:**
- `user_journey_progress` – postęp journey jest liczony z `calendar_entries` (WHERE `journey_id IS NOT NULL`)
- `user_responses` – odpowiedzi przechowywane w `calendar_entries.content`
- `user_mood_checkins` – check-iny zapisywane przez `mood_calendar` + `calendar_entries`
- `journeys`, `journey_days`, `emotions` – dane statyczne, nie pobierane z DB

### Relacje

- `mood_calendar` (1) → `calendar_entries` (N) przez `calendar_id`
- `calendar_entries.journey_id` → identyfikator journey (z `data/journeys.ts`)
- `calendar_entries.source_type` ∈ `{ 'mood_checkin', 'journey', 'free_write' }`

### Optymalizacja Indeksów

```sql
CREATE INDEX idx_mood_calendar_user_month 
  ON mood_calendar(user_id, entry_date DESC);

CREATE INDEX idx_calendar_entries_calendar_id
  ON calendar_entries(calendar_id);

CREATE INDEX idx_calendar_entries_user_created
  ON calendar_entries(user_id, created_at DESC);
```

---

## 6. Auth & Security

### Autentykacja (Supabase Auth)

Używany bezpośrednio Supabase Auth przez `supabase.auth` w `stores/authStore.ts` i `hooks/useAuth.ts`. Nie ma oddzielnego `lib/auth.ts`.

```typescript
// stores/authStore.ts – auth methods
signIn: async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (data) { set({ user: data.user, session: data.session }); }
  return { error };
},
signUp: async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (data) { set({ user: data.user, session: data.session }); }
  return { error };
},
signOut: async () => {
  await supabase.auth.signOut();
  set({ user: null, session: null });
}
```

Zaimplementowane: email/hasło (signIn, signUp, signOut). Google OAuth i reset password nie są zaimplementowane.

### Session Management

Stan autoryzacji przechowywany w `useAuthStore` (persistowany w localStorage). Hook `useAuth()` inicjalizuje sesję i nasłuchuje zmian.

```typescript
// hooks/useAuth.ts – actual implementation (simplified)
export function useAuth() {
  const { user, setUser, setSession, setLoading, setInitialized } = useAuthStore();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setSession(session);
      setInitialized(true);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setSession(session);
      setLoading(false);
      setInitialized(true);
    });
    return () => subscription.unsubscribe();
  }, [setUser, setSession, setLoading, setInitialized]);
  return { user, loading: useAuthStore.getState().loading };
}
```

---

## 7. Routing & Navigation

### Route Structure

Routes definiowane w `constants/routes.ts` jako obiekt `ROUTES`:

```typescript
export const ROUTES = {
  // Public
  LANDING: '/',
  INTRO: '/intro',
  HOW_IT_WORKS: '/how-it-works',
  AUTH: '/auth',
  // Protected
  HOME: '/home',
  ONBOARDING: '/onboarding',
  JOURNEYS: '/journeys',
  JOURNEY: '/journey/:id',
  JOURNEY_DAY: '/journey/:id/day/:dayNumber',
  SESSION: '/session',
  EMOTION_REFLECTION: '/emotion-reflection',
  QUICK_ENTRY: '/quick-entry',
  CALENDAR: '/calendar',
  HISTORY: '/history',
  SETTINGS: '/settings',
};
```

Routing w `App.tsx`:

```tsx
<Routes>
  {/* Public routes */}
  <Route element={<MainLayout />}>
    <Route path={ROUTES.INTRO} element={<Intro />} />
    <Route path={ROUTES.LANDING} element={<Landing />} />
    <Route path={ROUTES.AUTH} element={<Auth />} />
    <Route path={ROUTES.HOW_IT_WORKS} element={<HowItWorks />} />
  </Route>
  {/* Protected routes */}
  <Route element={<ProtectedRoute />}>
    <Route element={<MainLayout />}>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.ONBOARDING} element={<Onboarding />} />
      <Route path={ROUTES.JOURNEYS} element={<Journeys />} />
      <Route path={ROUTES.JOURNEY_DAY} element={<Journey />} />
      <Route path={ROUTES.JOURNEY} element={<Journey />} />
      <Route path={ROUTES.SESSION} element={<Session />} />
      <Route path={ROUTES.CALENDAR} element={<Calendar />} />
      <Route path={ROUTES.HISTORY} element={<History />} />
      <Route path={ROUTES.SETTINGS} element={<Settings />} />
      <Route path="/quick-entry" element={<QuickEntry />} />
      <Route path={ROUTES.EMOTION_REFLECTION} element={<EmotionReflection />} />
    </Route>
  </Route>
</Routes>
```

### Protected Route Component

```typescript
// components/layout/ProtectedRoute.tsx (actual)
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) navigate(ROUTES.AUTH);
  }, [user, loading]);
  if (loading) return <LoadingSpinner />;
  if (!user) return null;
  return <>{children}</>;
}
```

---

## 8. System Motywów i Atmosfery

### Konfiguracja

W `data/themes.ts` zdefiniowano 8 atmosfer (`AtmosphereType`): `cream-calm`, `green-forest`, `dark-ink`, `soft-pink`, `silver-tech`, `solar-flare`, `desert-rose`, `ocean-deep`. Każda atmosfera zawiera definicje kolorów, fontu i border-radius.

`themeStore` zarządza `atmosphere` (string) i `isDark` (boolean). Persystencja przez localStorage.

### Aplikowanie motywu

Atmosfera i tryb ciemny są aplikowane w `App.tsx` przez modyfikację klas CSS na `<html>`:

```tsx
export function App() {
  const { atmosphere, isDark } = useThemeStore();
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add(`atmosphere-${atmosphere}`);
    if (isDark) html.classList.add('dark'); else html.classList.remove('dark');
  }, [atmosphere, isDark]);
  ...
}
```

Zmiana ustawień w Settings page bezpośrednio modyfikuje `themeStore` i efekt automatycznie aktualizuje wygląd.

---

## 9. State Management

Aplikacja używa **Zustand** z `persist` middleware. Szczegóły store'ów opisane w sekcji 3 (Stores).

---

## 10. API Layer

Wszystkie operacje bazy danych w `lib/database.ts`. Nie ma API endpointów — aplikacja używa Supabase client bezpośrednio (opisane w sekcji 4).

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

PWA manifest i service worker skonfigurowane w `vite.config.ts` z użyciem `vite-plugin-pwa`. Aplikacja działa jako standalone PWA z automatyczną aktualizacją SW.

---

## 13. Monitoring & Error Handling

Błędy DB są logowane przez `console.error` w funkcjach `lib/database.ts`. Nie ma dedykowanego ErrorBoundary ani serwisu analitycznego. Obsługa błędów auth przez komunikaty w formularzu `/auth`.

---

## 14. Podsumowanie

| Aspekt | Rozwiązanie |
|--------|-------------|
| **Framework** | React 18 + Vite |
| **Styling** | Tailwind CSS + Shadcn UI |
| **Backend** | Supabase (PostgreSQL + Auth) |
| **Hosting** | Vercel |
| **State** | Zustand (persist middleware) |
| **Routing** | React Router v6 |
| **PWA** | vite-plugin-pwa |
| **Auth** | Supabase Auth (email/hasło) |
| **DB Security** | Row Level Security |

---

*Architektura Introsphere MVP.*