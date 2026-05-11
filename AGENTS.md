# AI Developer Agent – Zasady Pracy

## Stack Technologiczny

| Warstwa | Technologia |
|---------|-------------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS + Shadcn UI |
| State | Zustand |
| Backend | Supabase (PostgreSQL + Auth) |
| Routing | React Router v6 |
| Język | TypeScript |
| Hosting | Vercel |

Referencje: `docs/architecture/technical.md`, `docs/business/project-description.md`

---

## Struktura Projektu

```
app/
├── src/
│   ├── components/           # Komponenty UI
│   │   ├── ui/               # Shadcn base (button, card, input, dialog...)
│   │   ├── layout/           # MainLayout, AuthLayout, OnboardingLayout, ProtectedRoute
│   │   ├── emotion-wheel/    # EmotionWheel, EmotionDetails
│   │   ├── journey/          # JourneyCard, JourneyProgress, DayView
│   │   ├── calendar/         # MoodCalendar, CalendarEntry
│   │   └── common/           # LoadingSpinner, EmptyState
│   │
│   ├── pages/               # Page components (routes)
│   │   ├── Landing.tsx       # /
│   │   ├── Intro.tsx         # /intro
│   │   ├── HowItWorks.tsx    # /how-it-works
│   │   ├── Auth.tsx          # /auth
│   │   ├── Onboarding.tsx    # /onboarding
│   │   ├── Home.tsx          # /home
│   │   ├── Journeys.tsx      # /journeys
│   │   ├── Journey.tsx       # /journey/:id  +  /journey/:id/day/:dayNumber
│   │   ├── Session.tsx       # /session
│   │   ├── EmotionReflection.tsx # /emotion-reflection
│   │   ├── QuickEntry.tsx    # /quick-entry
│   │   ├── Calendar.tsx      # /calendar
│   │   ├── History.tsx       # /history
│   │   └── Settings.tsx      # /settings
│   │
│   ├── lib/                 # Narzędzia core
│   │   ├── supabase.ts      # Supabase client
│   │   ├── database.ts      # DB queries (saveMoodEntry, getCalendarEntries, deleteEntry…)
│   │   └── utils.ts         # Utilities (cn helper)
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts      # Inicjalizacja sesji, listener zmian auth
│   │   ├── useCalendar.ts  # Pobieranie wpisów dla miesiąca
│   │   ├── useHomeStats.ts # Statystyki dla strony głównej
│   │   └── useHistory.ts   # Pobieranie wpisów z filtrowaniem
│   │
│   ├── stores/             # Zustand stores
│   │   ├── authStore.ts    # user, session, signIn/signUp/signOut (persist)
│   │   ├── themeStore.ts   # atmosphere, isDark (persist)
│   │   ├── journeyStore.ts # completedDays map + syncFromDatabase (persist)
│   │   └── sessionStore.ts # entryDeletedCount (trigger refetch)
│   │
│   ├── types/              # TypeScript definitions
│   │   ├── database.ts     # Ręczne typy tabel Supabase
│   │   ├── journey.ts
│   │   ├── emotion.ts
│   │   ├── question.ts
│   │   ├── user.ts
│   │   └── reflection.ts
│   │
│   ├── data/              # Static data
│   │   ├── journeys.ts    # 6 journeys × 7 dni
│   │   ├── emotions.ts    # 8 L3 + 16 L2/L1 + utility functions
│   │   ├── themes.ts      # 8 atmosphere themes
│   │   └── questions.ts   # (nieużywane)
│   │
│   ├── constants/        # Stałe aplikacji
│   │   ├── routes.ts     # ROUTES object
│   │   ├── config.ts
│   │   └── index.ts
│   │
│   ├── App.tsx            # Root component + routing
│   ├── main.tsx           # Entry point
│   └── index.css         # Global styles + Tailwind + atmosphere CSS variables
```

---

## Konwencje Nazewnictwa

### Pliki i Katalogi

- **Katalogi**: `kebab-case` (np. `emotion-wheel`, `journey-card`)
- **Pliki componentów**: `PascalCase.tsx` (np. `EmotionWheel.tsx`, `JourneyCard.tsx`)
- **Pliki hooków**: `camelCase.ts` z prefixem `use` (np. `useJourney.ts`, `useAuth.ts`)
- **Pliki store**: `camelCase.ts` z sufiksem `Store` (np. `authStore.ts`, `themeStore.ts`)
- **Pliki typów**: `camelCase.ts` (np. `emotion.ts`, `journey.ts`)
- **Pliki danych**: `camelCase.ts` (np. `emotions.ts`, `journeys.ts`)

### Komponenty React

- **Nazwa komponentu**: `PascalCase` (np. `function EmotionWheel() {}`)
- **Props interface**: `ComponentNameProps` (np. `interface EmotionWheelProps {}`)
- **Props prop**: `props` lub destrukturyzacja

###Zmienne i Funkcje

- **Zmienne**: `camelCase` (np. `currentMood`, `journeyProgress`)
- **Stałe**: `UPPER_SNAKE_CASE` (np. `MAX_JOURNEY_DAYS = 7`)
- **Funkcje**: `camelCase` (np. `getJourneyProgress()`)
- **Boolean**: prefix `is`, `has`, `should` (np. `isActive`, `hasCompleted`)

---

## Standardy Kodowania

### TypeScript

```typescript
// ✅ Poprawnie
interface Emotion {
  id: string;
  name: string;
  nameEn: string;
  spectrum: 'positive' | 'negative' | 'neutral';
  parentId: string | null;
  wheelPos: number;
}

type AtmosphereType = 'cream-calm' | 'green-forest' | 'dark-ink' | 'soft-pink' | 'silver-tech';

// ❌ Unikaj
interface BadEmotion {
  Id: string;        // nie camelCase
  name_en: string;  // nie snake_case w TS
}
```

### Komponenty React

```typescript
// ✅ Funkcyjny component z TypeScript
interface EmotionWheelProps {
  onSelect: (emotion: Emotion) => void;
  size?: number;
}

export function EmotionWheel({ onSelect, size = 480 }: EmotionWheelProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  // Emocje importowane bezpośrednio z data/emotions.ts
  
  return (
    <div className="emotion-wheel">
      <svg width={size} height={size}>
        {/* 8 sektorów SVG renderowanych bezpośrednio w komponencie */}
      </svg>
      {selectedEmotion && (
        <EmotionDetails
          emotion={selectedEmotion}
          onSelect={onSelect}
          onClose={() => setSelectedEmotion(null)}
        />
      )}
    </div>
  );
}
```

### Styled Components (Tailwind)

```typescript
// ✅ Używaj Tailwind CSS className
<div className="flex items-center justify-center p-4 rounded-xl bg-surface">
  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
    Kliknij
  </button>
</div>

// ❌ Unikaj inline styles (chyba że dynamiczne)
<div style={{ padding: '16px' }}>  // tylko gdy konieczne
```

### Hooks custom

```typescript
// ✅ Konwencja hooka
export function useJourney(journeyId: string) {
  const [journey, setJourney] = useState<Journey | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    loadJourney(journeyId);
  }, [journeyId]);
  
  return { journey, loading, error };
}
```

### Store Zustand

```typescript
// ✅ Konwencja store
interface JourneyStore {
  completedDays: Record<string, number[]>;
  setCompletedDays: (journeyId: string, dayNumber: number) => void;
  getCompletedDays: (journeyId: string) => number[];
  resetJourney: (journeyId: string) => void;
  getCurrentDay: (journeyId: string) => number;
  syncFromDatabase: () => Promise<void>;
}

export const useJourneyStore = create<JourneyStore>()(
  persist((set, get) => ({
    completedDays: {},
    setCompletedDays: (journeyId, dayNumber) => { /* dodaje do mapy */ },
    getCompletedDays: (journeyId) => get().completedDays[journeyId] || [],
    resetJourney: (journeyId) => { /* usuwa z mapy */ },
    getCurrentDay: (journeyId) => { /* max(completedDays[journeyId]) + 1 */ },
    syncFromDatabase: async () => { /* pobiera z calendar_entries */ },
  }), { name: 'journey-completed-days' })
);
```

---

## Zasady Implementacji

### 1. Organisation

- Każdy feature w osobnym katalogu w `components/`
- Trzymaj близь component i powiązane types razem
- Eksportuj z `index.ts` per moduł

### 2. Error Handling

```typescript
// ✅ Obsługa błędów
try {
  await submitResponse(text);
} catch (err) {
  console.error('Błąd zapisu:', err);
  toast.error('Nie udało się zapisać. Spróbuj ponownie.');
}
```

### 3. Type Safety

- Zawsze definiuj typy dla API responses
- Używaj `interface` dla obiektów, `type` dla aliasów
- Unikaj `any`

### 4. Accessibility

- Wszystkie buttony z `aria-label` gdy ikony
- Focus states dla interactive elements
- Keyboard navigation dla emotion wheel

### 5. Performance

- Memoize heavy computations z `useMemo`
- Callback functions z `useCallback`
- Lazy load dla heavy components

---

## Referencje Dokumentacji

- Stack i architektura: `docs/architecture/technical.md`
- Opis projektu: `docs/business/project-description.md`
- UI/UX: `docs/ux_ui.md`
- Architektura systemu: `docs/architecture/system_overview.md`
- Zaimplementowane funkcje: `docs/implemented_features.md`

---

## Dalsze Reguły

Szczegółowe reguły implementacyjne znajdują się w:
- `.kilo/` – workflow i dodatkowe reguły specyficzne dla feature'ów