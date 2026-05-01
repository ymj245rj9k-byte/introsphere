## Common UI Components - 2026-04-20

### Context
Stworzenie wspólnych komponentów UI dla aplikacji Introsphere: LoadingSpinner, EmptyState. Używane przez różne strony i komponenty.

### Scope
IN:
- LoadingSpinner.tsx — animowany spinner ładowania
- EmptyState.tsx — pusty stan z ikoną i tekstem
- index.ts barrel export w /components/common/

OUT:
- Pełne funkcjonalności stron
- Supabase integracja

### Implementation

#### Section A: LoadingSpinner ✓
- [x] A1. src/components/common/LoadingSpinner.tsx — SVG spinner z animacją

#### Section B: EmptyState ✓
- [x] B1. src/components/common/EmptyState.tsx — props: icon, title, description, action

### Verification
- [x] Build: `npm run build` — brak błędów (✓ 43 modules, 775ms)