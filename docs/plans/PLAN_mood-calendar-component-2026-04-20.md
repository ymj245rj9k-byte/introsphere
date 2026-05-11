# MoodCalendar Component - 2026-04-20

## 1. Cel
Stworzenie głównego komponentu kalendarza miesięcznego. Wizualizuje emocje użytkownika w czasie poprzez kolorowanie dni zgodnie z zapisanymi wpisami.

## 2. Zakres
**W zakresie:**
- `src/components/calendar/MoodCalendar.tsx` — siatka miesięczna z nawigacją prev/next
- Integracja z `CalendarDay` i `CalendarEntry`

**Poza zakresem:**
- Pełna integracja z Supabase (osobny plan)
- Animacje przejść między miesiącami

## 3. Wymagania funkcjonalne
- Wyświetla siatkę 42 dni (6 tygodni)
- Dni z wpisami pokazują kolor emocji
- Kliknięcie dnia z wpisem otwiera `CalendarEntry` dialog
- Nawigacja prev/next month

## 4. Wymagania niefunkcjonalne
- **Wydajność:** memoizacja siatki dni przy zmianie miesiąca
- **Bezpieczeństwo:** wyświetla tylko dane zalogowanego użytkownika
- **UX:** dni z bieżącego miesiąca wyróżnione, padding days wyszarzone

## 5. Kontekst techniczny
- **Komponenty:** używany przez `Calendar.tsx`; zawiera `CalendarDay`, `CalendarEntry`
- **API:** `useCalendar(month, year)` hook → Supabase `calendar_entries`
- **Dane:** `CalendarEntry[]` z hookа `useCalendar`

## 6. Kroki implementacji
1. Utwórz `MoodCalendar.tsx` — generowanie siatki 42 dni
2. Zintegruj `CalendarDay` dla każdego dnia
3. Dodaj nawigację miesiąc prev/next
4. Obsłuż kliknięcie → otwieranie `CalendarEntry` dialog
5. Eksportuj z `components/calendar/index.ts`

## 7. Kryteria akceptacji
- Poprawna siatka dla każdego miesiąca (układ tygodniowy)
- Dni z wpisami pokazują kolor emocji
- Kliknięcie dnia otwiera szczegóły wpisu
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run build` bez błędów; ręczny test: `/calendar` wyświetla poprawną siatkę, klik dnia → dialog

---
*Status: [x] Zaimplementowany*
