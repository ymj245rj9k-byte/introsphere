# Technologie i Stack

## Przegląd

Katalog `tech/` zawiera specyfikacje technologiczne i stack używany w projekcie.

### Stack Technologiczny

| Warstwa | Technologia | Uzasadnienie |
|---------|-------------|--------------|
| **Frontend** | React 18 + Vite | Szybki start, Hot Module Replacement |
| **Styling** | Tailwind CSS + Shadcn UI | Gotowe komponenty, dark aesthetic |
| **State** | Zustand | Prosty, lekki, persist do localStorage |
| **Backend** | Supabase | PostgreSQL + Auth + API |
| **Hosting** | Vercel | Darmowy tier, CDN globalny |
| **Routing** | React Router v6 | Standard SPA routing |

### Architektura

- **TypeScript strict** – Typowanie na każdym poziomie
- **Component-based** – Reużywalne komponenty UI
- **Store-first** – Zustand dla globalnego stanu (authStore, themeStore, journeyStore, sessionStore)
- **Type-safe DB** – Supabase z ręcznie pisanymi typami (`types/database.ts`)
- **Static data** – Journeys i emocje jako dane statyczne w `data/` (nie w DB)

### Frameworks i Biblioteki

- React 18
- TypeScript
- Tailwind CSS
- Shadcn UI
- Zustand
- React Router v6
- Supabase JS
- Vite

### Patterns

- Zustand stores dla globalnego stanu aplikacji (persist middleware)
- Custom hooks jako cienka warstwa na stores (`useAuth`, `useCalendar`, `useHomeStats`, `useHistory`)
- Logika sesji i journey w komponentach page'ów i journeyStore
- Feature-based folder structure
- Static data files (`data/`) dla treści (journeys, emotions, themes)
