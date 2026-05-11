# Tester – Introsphere

## Strategia Testów

Projekt jest na etapie MVP z minimalnym pokryciem testami automatycznymi. Strategia opiera się na:
1. **TypeScript strict** – błędy typów wykrywane w compile time
2. **Testy jednostkowe** – krytyczne komponenty (EmotionWheel)
3. **Testy integracyjne** – build CI (`npm run build`) jako gate
4. **Testy manualne** – happy paths przed każdym deployem

---

## Istniejące Testy Automatyczne

| Plik | Typ | Co testuje |
|------|-----|-----------|
| `app/src/components/emotion-wheel/__tests__/EmotionWheel.test.tsx` | Unit | Renderowanie 8 sektorów, click events |
| `app/src/lib/database.test.ts` | Unit | Funkcje warstwy danych |

Uruchomienie: `npm test` w katalogu `app/`

---

## Scenariusze Testowe – Happy Paths

### ST-01: Rejestracja i onboarding
1. Wejdź na `/auth`
2. Zarejestruj nowe konto (email + hasło)
3. Oczekiwany wynik: redirect do `/onboarding`
4. Przejdź 3 kroki onboardingu → `/home`

### ST-02: Sesja emocjonalna
1. Z `/home` kliknij koło emocji lub sekcję Session
2. Kliknij sektor „Radość" na kole
3. W modalu wybierz podspektrum lub zostań przy L3 → Continue
4. Na `/emotion-reflection` wpisz odpowiedź → Zapisz
5. Oczekiwany wynik: wpis zapisany, redirect do `/home`

### ST-03: Guided Journey (pełny dzień)
1. Z `/home` → `/journeys` → kliknij journey
2. Kliknij „Start journey" (dzień 1) lub „Continue day N"
3. Na `/journey/:id/day/:N` wpisz odpowiedź → Save
4. Oczekiwany wynik: redirect do overview, pasek postępu zaktualizowany, `calendar_entries` zawiera wpis

### ST-04: Kalendarz nastrojów
1. Wejdź na `/calendar`
2. Sprawdź kolorowe dni (po wcześniej zapisanych wpisach)
3. Kliknij kolorowy dzień → dialog ze szczegółami wpisu
4. Kliknij „Usuń" → dialog potwierdzenia → Confirm
5. Oczekiwany wynik: wpis znika z kalendarza

### ST-05: Historia z filtrowaniem
1. Wejdź na `/history`
2. Kliknij Filter → wybierz emocję z listy
3. Oczekiwany wynik: lista wyświetla tylko wpisy z tą emocją
4. Kliknij Clear → pełna lista

### ST-06: Quick Entry
1. Z `/home` kliknij „Quick Entry"
2. Na `/quick-entry` wpisz tekst → Zapisz
3. Oczekiwany wynik: redirect do `/home`, wpis w `calendar_entries` z `emotion_id = null`

### ST-07: Zmiana atmosfery
1. Wejdź na `/settings`
2. Kliknij inny motyw w AtmospherePicker
3. Oczekiwany wynik: wygląd aplikacji zmienia się natychmiast (live preview)
4. Odśwież stronę → motyw zachowany (Zustand persist)

### ST-08: Persistence postępu Journey
1. Ukończ dzień 1 journey
2. Odśwież stronę (F5)
3. Oczekiwany wynik: pasek postępu nadal pokazuje dzień 1 jako ukończony

---

## Scenariusze Edge Case

### EC-01: Pusty stan formularza
- Spróbuj zapisać wpis z pustą textarea
- Oczekiwany wynik: przycisk zablokowany lub walidacja

### EC-02: Nawigacja między miesiącami (kalendarz)
- Utwórz wpis 30 kwietnia
- Przejdź do maja w kalendarzu
- Oczekiwany wynik: 30 kwietnia (padding) NIE pokazuje wpisu z kwietnia

### EC-03: Dostęp bez logowania
- Wejdź bezpośrednio na `/home` bez sesji
- Oczekiwany wynik: redirect do `/auth`

### EC-04: Usuwanie cudzych wpisów
- Supabase RLS nie pozwala usunąć wpisów innego użytkownika
- Test: wywołaj `deleteEntry(id, wrongUserId)` → brak efektu

### EC-05: Journey po ukończeniu 7 dni
- Ukończ wszystkie 7 dni journey
- Oczekiwany wynik: brak przycisku "Continue", widok ukończonego journey

---

## Checklist przed deployem

- [ ] `npm run build` – brak błędów TypeScript
- [ ] `npm run lint` – brak błędów ESLint
- [ ] `npx tsc --noEmit` – brak błędów typowania
- [ ] ST-01: Rejestracja i onboarding
- [ ] ST-02: Sesja emocjonalna (zapis wpisu)
- [ ] ST-03: Journey dzień 1 → zapis → postęp
- [ ] ST-04: Kalendarz → delete entry
- [ ] ST-07: Zmiana atmosfery → persist po reload
- [ ] EC-02: Padding days w kalendarzu

---

## Znane Błędy (otwarte)

| ID | Opis | Priorytet |
|----|------|-----------|
| BUG-01 | Quick entries nie wyświetlają się w kalendarzu i historii | Wysoki |
