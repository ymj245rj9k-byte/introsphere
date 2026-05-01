## Basic Layout Components - 2026-04-20

### Context
Stworzenie podstawowych komponentów layout dla aplikacji Introsphere: AuthLayout, OnboardingLayout. Są to szablony stron używane przez całą aplikację.

### Scope
IN:
- AuthLayout.tsx — layout dla stron auth (login, register)
- OnboardingLayout.tsx — layout dla strony onboarding (3-step wizard)
- index.ts barrel export w /components/layout/

OUT:
- LoadingSpinner, EmptyState (osobny plan)
- Pełna funkcjonalność routes
- Supabase integracja

### Implementation

#### Section A: AuthLayout ✓
- [x] A1. src/components/layout/AuthLayout.tsx — centered card layout z logo, title, children
- [x] A2. Dodaj strukturę: header z logo, main z card, footer opcjonalny

#### Section B: OnboardingLayout ✓
- [x] B1. src/components/layout/OnboardingLayout.tsx — wizard layout z progress indicator, step content, navigation
- [x] B2. Progress bar component (inline lub osobny)

### Verification
- [x] Build: `npm run build` — brak błędów (✓ 43 modules, 775ms)
- [x] Import w App.tsx — komponenty istnieją i można użyć w routes