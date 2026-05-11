# Fix Calendar Month Display - 2026-05-01

## 1. Cel
Naprawa błędu wyświetlania wpisów w kalendarzu: dni z poprzedniego miesiąca (padding) pokazywały wpisy z tamtego miesiąca zamiast być puste.

## 2. Zakres
**W zakresie:**
- `src/hooks/useCalendar.ts` — poprawka `getDayEntry()` do filtrowania po dokładnej dacie
- Padding days z sąsiednich miesięcy nie pokazują wpisów

**Poza zakresem:**
- Zmiana layoutu siatki kalendarza
- Modyfikacja zapytań do bazy danych
- Zmiana logiki kolorowania emocji

## 3. Wymagania funkcjonalne
- `getDayEntry()` zwraca wpis tylko dla dokładnej daty (rok + miesiąc + dzień)
- Padding days (`isCurrentMonth=false`) zawsze zwracają pusty stan
- Nawigacja między miesiącami pobiera nowe dane

## 4. Wymagania niefunkcjonalne
- **Wydajność:** brak dodatkowych zapytań – poprawka w logice filtrowania
- **Bezpieczeństwo:** brak zmian w dostępie do danych
- **UX:** użytkownik widzi tylko swoje wpisy w poprawnym miesiącu

## 5. Kontekst techniczny
- **Komponenty:** `useCalendar.ts` hook — funkcja `getDayEntry()`
- **API:** brak zmian – poprawka w logice klucza daty
- **Dane:** klucz daty format `YYYY-MM-DD`

## 6. Kroki implementacji
1. W `useCalendar.ts` popraw `getDayEntry()` — walidacja roku i miesiąca przy porównaniu klucza
2. Dla `isCurrentMonth=false` zawsze zwróć `undefined`
3. Przetestuj nawigację między miesiącami (kwiecień → maj → czerwiec)

## 7. Kryteria akceptacji
- Dni z poprzedniego/następnego miesiąca (padding) nie wyświetlają wpisów
- Wpisy z kwietnia nie pojawiają się w widoku maja
- Nawigacja między miesiącami wyświetla poprawne dane
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run lint && npm run build` bez błędów; ręczny test: utwórz wpis 30 kwietnia → przejdź do maja → 30 kwietnia (padding) nie pokazuje wpisu

---
*Status: [x] Zaimplementowany*
