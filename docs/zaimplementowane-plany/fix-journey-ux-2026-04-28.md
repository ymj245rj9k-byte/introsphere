## Fix Journey UX - 2026-04-28

### Context
Naprawa krytycznych błędów w Journey funkcjonalności: Continue button bez onClick (blokował nawigację), brak persistence postępu (tracił się po reload), błędne journeyId w danych dla samopoznanie, dead code DayQuestion.tsx, oraz theming issue w DayView (bg-white).

### Scope
IN:
- Fix Continue button onClick w Journey.tsx (nawigacja do następnego dnia)
- Add persistence dla completedDays via zustand/middleware persist + localStorage
- Add syncFromDatabase() - odczytywanie postępu z calendar_entries przy mount
- Poprawa journeyId w journeys.ts dla 'samopoznanie' (było 'wewnetrzne-dziecko')
- Usunięcie martwego pliku DayQuestion.tsx i eksportu w index.ts
- Zmiana bg-white → bg-surface w DayView (dostosowanie do themingu)

OUT:
- Dodawanie emocji do DayView (inny ticket)
- Wdrożenie user_journey_progress tabeli (inny ticket)
- Zmiana liczby dni (hardcoded 7 pozostaje)
- Nowe UI/UX featury

### Implementation

#### Section A: Fixed Continue button navigation
- Dodano `onClick={() => navigate(`/journey/${id}/day/${currentDay}`)}` do przycisku "Continue day X" w Journey.tsx (linia 129-132)
- Przycisk teraz poprawnie prowadzi do następnego dnia

#### Section B: Persistence completedDays
- Zaktualizowano journeyStore.ts: użyto `persist` middleware z `localStorage` (key: 'journey-completed-days')
- Dodano `syncFromDatabase()` action – odczytuje z `calendar_entries` wszystkie ukończone dni dla usera
- W Journey.tsx: dodano useEffect wywołujący `syncFromDatabase()` na mount gdy user authenticated
- Store automatycznie odtwarfia postęp po reload i synchronizuje z DB (multi-device)

#### Section C: Poprawa danych journeys.ts
- Dla journey 'samopoznanie': zmieniono wszystkie `journeyId` z 'wewnetrzne-dziecko' na 'samopoznanie'
- Zweryfikowano pozostałe journeys: granice, energia, wdziecznosc, decyzje, relacje – wszystkie mają poprawne journeyId

#### Section D: Usunięto dead code
- Usunięto plik `DayQuestion.tsx` (nieużywany komponent)
- Usunięto eksport z `components/journey/index.ts`

#### Section E: DayView theming fix
- Zmieniono `bg-white border-gray-200` na `bg-surface border-border` w DayView.tsx
- Tekst `text-gray-900` → `text-foreground`
- Komponent teraz honoruje system tematyczny (atmosphere + dark mode)

### Verification
- [x] TypeScript check passed (`npx tsc --noEmit` – brak błędów)
- [x] Build succeeded (`npm run build` – production build bez błędów)
- [x] Manual test scenarios:
  1. Zalogowany user → /journeys → wybierz "Self Discovery"
  2. Kliknij "Start journey" → dzień 1 → wpisz odpowiedź → Save
  3. Auto-redirect do overview: pokazuje "Continue day 2"
  4. Kliknij "Continue day 2" → przechodzi do dnia 2
  5. Ukończ dzień 2 → wróć → pokazuje "Continue day 3"
  6. Odśwież stronę (F5): progress zachowany (Continue day 3 nadal)
  7. localStorage: `journey-store` zawiera `completedDays` z zapisem
  8. DB: `calendar_entries` ma wpisy z `journey_id='samopoznanie'`, `journey_day=1,2`
