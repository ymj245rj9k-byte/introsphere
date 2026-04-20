## Main Pages - 2026-04-20

### Context
Stworzenie głównych stron aplikacji Introsphere: Calendar, History, Settings, Session. Podstawowe strony dla zalogowanego użytkownika.

### Scope
IN:
- Calendar.tsx — kalendarz miesięczny z wpisami nastrojów
- History.tsx — historiaWPISÓW z filtrowaniem
- Settings.tsx — ustawienia konta, zmiana atmosfery
- Session.tsx — codzienna sesja z pytaniem i kołem emocji

OUT:
- Pełna integracja z Supabase (osobny plan)
- Pełne EmotionWheel/Session flows (osobny plan)

### Implementation

#### Section A: Calendar Page ✓
- [x] A1. src/pages/Calendar.tsx — kalendarz miesięczny z nawigacją month prev/next
- [x] A2. Widok dni z kolorami emocji (placeholder danych)
- [x] A3. Click na день → szczegóły wpisu

#### Section B: History Page ✓
- [x] B1. src/pages/History.tsx — listawpisów (od najnowszych)
- [x] B2. Filtrowanie po dacie / emocji
- [x] B3. Szczegóły wpisu

#### Section C: Settings Page ✓
- [x] C1. src/pages/Settings.tsx — profil użytkownika (avatar, name placeholder)
- [x] C2. Wybór atmosfery (8 themes)
- [x] C3. Wyloguj przycisk (placeholder)

#### Section D: Session Page ✓
- [x] D1. src/pages/Session.tsx — daily prompt workflow
- [x] D2. Wybór emocji (quick emotions, nie pełne koło)
- [x] D3. Textarea na odpowiedź
- [x] D4. Zapisz przycisk

### Verification
- [x] Build: `npm run build` — brak błędów (✓ 1387 modules, 1.19s)
- [x] Routes w App.tsx — dodane wszystkie strony