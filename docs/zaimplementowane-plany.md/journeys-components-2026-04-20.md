## Journeys Components - 2026-04-20

### Context
Stworzenie komponentów dlaJourneys: JourneyCard, JourneyProgress, DayQuestion oraz rozbudowa strony Journey z widokiem 7 dni.

### Scope
IN:
- JourneyCard.tsx — karta journey z ikona, tytulem, opisem
- JourneyProgress.tsx — pasek postępu 7 dni
- DayQuestion.tsx — pytanie na dany dzień z odpowiedzią
- Journey page rozbudowa z listą dni

OUT:
- Pełna integracja z backend
- Animacje transitions

### Implementation

#### Section A: JourneyCard Component ✓
- [x] A1. src/components/journey/JourneyCard.tsx — przeniesiony z Home.tsx

#### Section B: JourneyProgress Component ✓
- [x] B1. src/components/journey/JourneyProgress.tsx — 7-dniowy pasek postępu

#### Section C: DayQuestion Component ✓
- [x] C1. src/components/journey/DayQuestion.tsx — pytanie z textarea i odpowiedzią

#### Section D: Journey Page ✓
- [x] D1. src/pages/Journey.tsx rozbudowany — widok 7 dni, lista pytań

### Verification
- [x] Build: `npm run build` — brak błędów
- [x] Test: journeys działają na /journey/:id