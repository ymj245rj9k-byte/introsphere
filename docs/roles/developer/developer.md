# Developer – Introsphere

## Stack Technologiczny

| Warstwa | Technologia | Wersja |
|---------|-------------|--------|
| Framework | React | 18 |
| Build tool | Vite | latest |
| Język | TypeScript | strict |
| Styling | Tailwind CSS + Shadcn UI | latest |
| State | Zustand (+ persist middleware) | latest |
| Backend | Supabase (PostgreSQL + Auth) | latest |
| Routing | React Router | v6 |
| Hosting | Vercel | - |

---

## Struktura Projektu

```
app/src/
├── components/     # Komponenty UI (feature-based)
│   ├── ui/         # Shadcn base (button, card, dialog...)
│   ├── layout/     # MainLayout, AuthLayout, OnboardingLayout, ProtectedRoute
│   ├── emotion-wheel/
│   ├── journey/
│   ├── calendar/
│   └── common/
├── pages/          # Komponenty stron (mapowane na trasy)
├── lib/            # supabase.ts, database.ts, utils.ts
├── hooks/          # useAuth, useCalendar, useHomeStats, useHistory
├── stores/         # authStore, themeStore, journeyStore, sessionStore
├── types/          # TypeScript interfaces
├── data/           # Dane statyczne (emotions, journeys, themes)
└── constants/      # routes.ts, config.ts
```

---

## Konwencje Kodu

### Nazewnictwo
- **Pliki komponentów:** `PascalCase.tsx` (np. `EmotionWheel.tsx`)
- **Hooki:** `useNazwa.ts` (np. `useCalendar.ts`)
- **Stores:** `nazwaStore.ts` (np. `journeyStore.ts`)
- **Zmienne:** `camelCase`, booleans z prefixem `is/has/should`
- **Stałe:** `UPPER_SNAKE_CASE`

### TypeScript
- Strict mode – brak `any`
- `interface` dla obiektów, `type` dla aliasów i union types
- Props interface: `ComponentNameProps`

### Komponenty
```typescript
interface EmotionWheelProps {
  onSelect: (emotion: Emotion) => void;
  size?: number;
}

export function EmotionWheel({ onSelect, size = 480 }: EmotionWheelProps) {
  // ...
}
```

### Obsługa błędów
```typescript
try {
  await saveEntry(data);
} catch (err) {
  console.error('Błąd zapisu:', err);
  toast.error('Nie udało się zapisać. Spróbuj ponownie.');
}
```

---

## Workflow Implementacji

1. Sprawdź plan w `docs/plans/PLAN_*.md`
2. Zaimplementuj zgodnie z sekcją „Kroki implementacji"
3. Nie rozszerzaj zakresu poza plan
4. Po implementacji: `npm run build` + `npx tsc --noEmit`
5. Zaktualizuj `docs/implemented_plans.md` (zmień `[ ]` na `[x]`)
6. Zaktualizuj `docs/implemented_features.md`

---

## Kluczowe Wzorce Architektoniczne

### Zustand Store z persist
```typescript
export const useJourneyStore = create<JourneyStore>()(
  persist((set, get) => ({
    completedDays: {},
    setCompletedDays: (journeyId, dayNumber) => { /* ... */ },
    syncFromDatabase: async () => { /* fetch z Supabase */ },
  }), { name: 'journey-completed-days' })
);
```

### Custom Hook
```typescript
export function useCalendar(month: number, year: number) {
  const [entries, setEntries] = useState<CalendarEntry[]>([]);
  const [loading, setLoading] = useState(true);
  // ...
  return { entries, loading, getDayEntry };
}
```

### Supabase Query (z RLS)
```typescript
const { data, error } = await supabase
  .from('calendar_entries')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false });
```

---

## Trasy Aplikacji

| Trasa | Komponent | Dostęp |
|-------|-----------|--------|
| `/` | `Landing` | Publiczny |
| `/auth` | `Auth` | Publiczny |
| `/onboarding` | `Onboarding` | Chroniony |
| `/home` | `Home` | Chroniony |
| `/session` | `Session` | Chroniony |
| `/emotion-reflection` | `EmotionReflection` | Chroniony |
| `/journeys` | `Journeys` | Chroniony |
| `/journey/:id` | `Journey` | Chroniony |
| `/journey/:id/day/:dayNumber` | `Journey` (DayView) | Chroniony |
| `/quick-entry` | `QuickEntry` | Chroniony |
| `/calendar` | `Calendar` | Chroniony |
| `/history` | `History` | Chroniony |
| `/settings` | `Settings` | Chroniony |

---

## Komendy Deweloperskie

```bash
cd app
npm run dev          # Start dev server (localhost:5173)
npm run build        # Production build
npm run lint         # ESLint
npx tsc --noEmit     # TypeScript check bez buildu
npm test             # Testy jednostkowe (Vitest)
```

---

## Baza Danych (Supabase)

### Tabela: `calendar_entries`
| Kolumna | Typ | Opis |
|---------|-----|------|
| id | uuid | PK |
| user_id | uuid | FK → auth.users |
| emotion_id | text | nullable (null dla quick entries) |
| journey_id | text | nullable |
| journey_day | int | nullable |
| content | text | Treść wpisu |
| created_at | timestamptz | Data wpisu |

RLS: użytkownik widzi/modyfikuje tylko własne wpisy (`user_id = auth.uid()`).
