# AI Developer Agent – Zasady Pracy

## Stack Technologiczny

| Warstwa | Technologia |
|---------|-------------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS + Shadcn UI |
| State | Zustand + React Context |
| Backend | Supabase (PostgreSQL + Auth) |
| Routing | React Router v6 |
| Język | TypeScript |
| Hosting | Vercel |

Referencje: `docs/technical-architecture.md`, `docs/project-description.md`

---

## Struktura Projektu

```
app/
├── src/
│   ├── components/           # Komponenty UI
│   │   ├── ui/               # Shadcn base (button, card, input, dialog...)
│   │   ├── layout/           # MainLayout, AuthLayout, OnboardingLayout
│   │   ├── emotion-wheel/    # EmotionWheel, EmotionNode, EmotionDetails
│   │   ├── journey/          # JourneyCard, JourneyProgress, DayQuestion
│   │   ├── calendar/        # MoodCalendar, CalendarDay, CalendarEntry
│   │   └── common/          # LoadingSpinner, EmptyState
│   │
│   ├── pages/               # Page components (routes)
│   │   ├── Landing.tsx      # /
│   │   ├── Onboarding.tsx   # /onboarding
│   │   ├── Home.tsx        # /home
│   │   ├── Journey.tsx     # /journey/:id
│   │   ├── Session.tsx     # /session
│   │   ├── Calendar.tsx    # /calendar
│   │   ├── History.tsx     # /history
│   │   ├── Settings.tsx     # /settings
│   │   └── Auth.tsx        # /auth
│   │
│   ├── lib/                 # Narzędzia core
│   │   ├── supabase.ts     # Supabase client
│   │   ├── auth.ts        # Auth helpers
│   │   ├── database.ts   # Type-safe DB queries
│   │   └── utils.ts      # Utilities
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useJourney.ts
│   │   ├── useCalendar.ts
│   │   ├── useEmotions.ts
│   │   └── useSession.ts
│   │
│   ├── stores/             # Zustand stores
│   │   ├── authStore.ts
│   │   ├── themeStore.ts
│   │   └── sessionStore.ts
│   │
│   ├── types/              # TypeScript definitions
│   │   ├── database.ts
│   │   ├── journey.ts
│   │   ├── emotion.ts
│   │   └── index.ts
│   │
│   ├── data/              # Static data (MVP)
│   │   ├── journeys.ts
│   │   ├── emotions.ts
│   │   ├── questions.ts
│   │   └── themes.ts
│   │
│   ├── constants/        # Stałe aplikacji
│   │   ├── routes.ts
│   │   ├── config.ts
│   │   └── index.ts
│   │
│   ├── App.tsx            # Root component + routing
│   ├── main.tsx           # Entry point
│   └── index.css         # Global styles + Tailwind
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
  selectedId?: string;
}

export function EmotionWheel({ onSelect, selectedId }: EmotionWheelProps) {
  const emotions = useEmotions();
  
  return (
    <div className="emotion-wheel">
      {emotions.map((emotion) => (
        <EmotionNode
          key={emotion.id}
          emotion={emotion}
          isSelected={emotion.id === selectedId}
          onClick={() => onSelect(emotion)}
        />
      ))}
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
interface SessionStore {
  currentMood: Emotion | null;
  currentJourneyId: string | null;
  currentDay: number;
  currentQuestion: Question | null;
  responseText: string;
  
  selectMood: (emotion: Emotion) => void;
  startJourney: (journeyId: string) => void;
  nextDay: () => void;
  reset: () => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  currentMood: null,
  currentJourneyId: null,
  currentDay: 1,
  currentQuestion: null,
  responseText: '',
  
  selectMood: (emotion) => set({ currentMood: emotion }),
  startJourney: (journeyId) => set({ currentJourneyId: journeyId, currentDay: 1 }),
  nextDay: () => set((state) => ({ currentDay: state.currentDay + 1 })),
  reset: () => set({ currentMood: null, currentJourneyId: null, currentDay: 1, currentQuestion: null, responseText: '' }),
}));
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

- Stack i architektura: `docs/technical-architecture.md`
- Opis projektu: `docs/project-description.md`
- UI/UX: `docs/ui-ux-*.md`
- Baza danych: `docs/database-schema.md`
- Journeys: `docs/journeys.md`
- Emocje: `docs/emotions-structure.md`

---

## Dalsze Reguły

Szczegółowe reguły implementacyjne znajdują się w:
- `.kilocode/` – workflow i dodatkowe reguły specyficzne dla feature'ów
- `.kilocode/workflows/` – automatyzacje
- `.kilocode/commands/` – komendy CLI