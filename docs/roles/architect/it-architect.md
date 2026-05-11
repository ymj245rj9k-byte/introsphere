# IT Architect – Introsphere

## Przegląd Architektury

Introsphere to SPA (Single Page Application) zbudowane w React z backendem BaaS (Backend as a Service) opartym na Supabase. Architektura jest celowo prosta – priorytetem była szybkość dostarczenia MVP.

---

## Decyzje Architektoniczne

Szczegółowe ADR w `docs/architecture/`:
- [ADR-001](../architecture/adr_001.md)
- [ADR-002](../architecture/adr_002.md)

### Kluczowe wybory:

| Decyzja | Wybór | Uzasadnienie |
|---------|-------|--------------|
| Backend | Supabase (BaaS) | PostgreSQL + Auth + RLS bez pisania backendu |
| State | Zustand | Prostszy niż Redux, persist middleware out-of-the-box |
| Dane statyczne | Pliki TS w `data/` | Journeys i emocje nie zmieniają się – baza danych byłaby overhead |
| Hosting | Vercel | Darmowy tier, CI/CD z Gitem, edge CDN |
| UI Components | Shadcn UI | Copy-paste komponenty, pełna kontrola, brak zależności |

---

## Diagram Systemu

```
┌─────────────────────────────────────────────┐
│                   Przeglądarka               │
│                                             │
│  React SPA (Vite)                           │
│  ├── React Router v6 (routing)              │
│  ├── Zustand stores (state)                 │
│  │   ├── authStore (user, session)          │
│  │   ├── themeStore (atmosphere)            │
│  │   ├── journeyStore (completedDays)       │
│  │   └── sessionStore (entryDeletedCount)   │
│  ├── Custom hooks (data fetching)           │
│  └── Static data (emotions, journeys)       │
│                      │                      │
│                      │ Supabase JS Client   │
└──────────────────────┼──────────────────────┘
                       │ HTTPS
┌──────────────────────▼──────────────────────┐
│                  Supabase                    │
│  ├── Auth (email + password)                │
│  ├── PostgreSQL                             │
│  │   └── calendar_entries (RLS)             │
│  └── PostgREST API (auto-generated)         │
└─────────────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────┐
│                   Vercel                     │
│  ├── CDN (static files)                     │
│  └── Edge network (global)                  │
└─────────────────────────────────────────────┘
```

---

## Model Danych

### Tabela: `calendar_entries`

```sql
CREATE TABLE calendar_entries (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES auth.users(id) NOT NULL,
  emotion_id  TEXT,                    -- NULL dla quick entries
  journey_id  TEXT,                    -- NULL dla sesji bez journey
  journey_day INTEGER,                 -- NULL dla sesji bez journey
  content     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security
ALTER TABLE calendar_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own entries" ON calendar_entries
  FOR ALL USING (auth.uid() = user_id);
```

### Dane statyczne (nie w DB)

- `src/data/emotions.ts` — 8 L3 + 24 podspektry (stałe)
- `src/data/journeys.ts` — 6 journeys × 7 pytań (stałe)
- `src/data/themes.ts` — 8 motywów atmosfery (stałe)

---

## Bezpieczeństwo

| Warstwa | Mechanizm |
|---------|-----------|
| Autentykacja | Supabase Auth (JWT, email+password) |
| Autoryzacja | Row Level Security (RLS) na `calendar_entries` |
| Frontend | `ProtectedRoute` – redirect do `/auth` bez sesji |
| Dane | `user_id` pobierany z `authStore` (JWT), nie z inputu |
| Transport | HTTPS (Vercel + Supabase) |

---

## Przepływ Danych

### Zapis wpisu (happy path)
```
User → DayView.tsx
  → saveJourneyDayResponse(journeyId, day, text, userId)
  → supabase.from('calendar_entries').insert(...)
  → journeyStore.setCompletedDays(journeyId, dayNumber)
  → navigate('/journey/:id')
```

### Odczyt kalendarza
```
Calendar.tsx → useCalendar(month, year)
  → supabase.from('calendar_entries')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', monthStart)
      .lte('created_at', monthEnd)
  → MoodCalendar renders days with colors
```

---

## Ograniczenia Techniczne

- **Brak real-time sync** – zmiany widoczne po refetch (refresh lub `entryDeletedCount` trigger)
- **Brak offline mode** – Supabase wymaga połączenia
- **Brak server-side rendering** – czyste SPA (brak SEO dla zalogowanych stron)
- **Dane statyczne w bundlu** – journeys i emocje zwiększają bundle size ~50KB
- **Supabase free tier** – limity: 500MB DB, 50k auth users, 2GB bandwidth/miesiąc

---

## Skalowalność

Obecna architektura jest wystarczająca dla MVP (< 1000 użytkowników). Przy większym ruchu:

1. **Indeksy DB** – dodać index na `calendar_entries(user_id, created_at)`
2. **Cache** – dodać React Query dla cache'owania zapytań
3. **Lazy loading** – już częściowo przez Vite code splitting
4. **Supabase upgrade** – przejście na plan Pro przy wzroście bazy użytkowników
