# Technologie i Stack

## Przegląd

Katalog `tech/` zawiera specyfikacje technologiczne i stack używany w projekcie.

### Stack Technologiczny

| Warstwa | Technologia | Uzasadnienie |
|---------|-------------|--------------|
| **Frontend** | React 18 + Vite | Szybki start, Hot Module Replacement |
| **Styling** | Tailwind CSS + Shadcn UI | Gotowe komponenty, dark aesthetic |
| **State** | Zustand + React Context | Prosty, lekki, bez boilerplate |
| **Backend** | Supabase | PostgreSQL + Auth + API |
| **Hosting** | Vercel | Darmowy tier, CDN globalny |
| **Routing** | React Router v6 | Standard SPA routing |

### Architektura

- **TypeScript strict** – Typowanie na każdym poziomie
- **Component-based** – Reużywalne komponenty UI
- **Hook-driven** – Logika w custom hooks
- **Store-first** – Zustand dla globalnego stanu
- **Type-safe DB** – Supabase z typowanymi query

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

- Custom hooks dla logiki biznesowej
- Context dla globalnych providerów
- Zustand stores dla stanu aplikacji
- Atomic design w komponencie
- Feature-based folder structure
