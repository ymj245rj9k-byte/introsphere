# Architektura Systemu

## Przegląd

Katalog `architecture/` zawiera dokumentację architektoniczną i wysokopoziomowy opis systemu Introsphere zgodny z zaleceniami C4/ADR.

### Minimalny zestaw plików

- `system_overview.md` – Wysokopoziomowy opis systemu (C4 Level 1)
- `adr_001.md` – Decyzja: JAMstack + Supabase BaaS
- `adr_002.md` – Decyzja: State management – Zustand + Context
- `technical.md` – Szczegółowa dokumentacja techniczna

### Struktura Architektoniczna

```
src/
├── components/       # Reusable UI (Shadcn)
├── pages/           # Page components (routes)
├── lib/             # Core utilities (Supabase, auth, DB)
├── hooks/           # Custom React hooks
├── stores/          # Zustand stores (auth, theme, session)
├── types/           # TypeScript definitions
├── data/            # Static data (emotions, journeys)
└── constants/       # App constants (routes, config)
```

### Diagram architektury (C4 – Level 1)

```
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│   Browser / PWA     │────▶│   Vercel Edge CDN   │────▶│   Supabase (BaaS)   │
│   React 18 SPA      │     │  - Static assets    │     │  - PostgreSQL       │
└─────────────────────┘     │  - API routes       │     │  - Auth / Storage   │
                            └─────────────────────┘     └─────────────────────┘
```

### Decyzje architektoniczne (ADR)

- **ADR 001**: Wybór JAMstack + Supabase jako BaaS dla szybszego MVP i braku utrzymywania infrastruktury.
- **ADR 002**: Wybór Zusta + Context dla lekkiego state managementu, małego bundle size i prostej persystencji.
- **ADR 003** *(w przyszłości)*: Wybór Shadcn UI/Radix UI dla dostępnego, konfigurowalnego systemu komponentów.

### Technologie kluczowe

- Frontend: React 18 + Vite + TypeScript
- Styling: Tailwind CSS + Shadcn UI
- State: Zustand stores + React Context
- Backend: Supabase (PostgreSQL, Auth, Storage, Realtime)
- Hosting: Vercel (Edge)
- Routing: React Router v6
- PWA: Workbox / Vite PWA plugin

### C4 Levels roadmap

- [x] Level 1: Kontekst (system overview)
- [x] Level 2: Kontenery (frontend, CDN, BaaS)
- [ ] Level 3: Komponenty (szczegóły modułów src/)
- [ ] Level 4: Kod (szczegóły implementacji)

