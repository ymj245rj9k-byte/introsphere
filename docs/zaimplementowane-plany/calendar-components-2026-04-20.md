## Calendar Components - 2026-04-20

### Context
Stworzenie komponentów dla kalendarza nastrojów: MoodCalendar, CalendarDay, CalendarEntry oraz integracja ze stroną Calendar.

### Scope
IN:
- MoodCalendar.tsx — główny komponent kalendarza miesięcznego
- CalendarDay.tsx — pojedynczy dzień z kolorem emocji
- CalendarEntry.tsx — dialog ze szczegółami wpisu
- index.ts barrel export

OUT:
- Pełna integracja z backend (Supabase)
- Animacje

### Implementation

#### Section A: MoodCalendar Component ✓
- [x] A1. src/components/calendar/MoodCalendar.tsx — kalendarz miesięczny

#### Section B: CalendarDay Component ✓
- [x] B1. src/components/calendar/CalendarDay.tsx — dzień z kolorem emocji

#### Section C: CalendarEntry Dialog ✓
- [x] C1. src/components/calendar/CalendarEntry.tsx — dialog szczegółów wpisu

### Verification
- [x] Build: `npm run build` — brak błędów
- [x] Test: /calendar działa z komponentami