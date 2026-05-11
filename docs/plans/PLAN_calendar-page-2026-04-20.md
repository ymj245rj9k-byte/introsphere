# Calendar Page - 2026-04-20

## 1. Cel
Stworzenie strony kalendarza miesięcznego. Użytkownik wizualizuje swoje emocje w czasie i może przeglądać wpisy z wybranych dni.

## 2. Zakres
**W zakresie:**
- `src/pages/Calendar.tsx` — kalendarz miesięczny z nawigacją prev/next
- Integracja z `MoodCalendar` i `useCalendar` hook

**Poza zakresem:**
- Pełna integracja z Supabase (obsługiwana przez `useCalendar` hook)
- Filtrowanie wpisów po emocji

## 3. Wymagania funkcjonalne
- Wyświetla `MoodCalendar` z danymi z `useCalendar(month, year)`
- Nawigacja prev/next month aktualizuje dane
- Kliknięcie dnia z wpisem → dialog `CalendarEntry`

## 4. Wymagania niefunkcjonalne
- **Wydajność:** cache wpisów per miesiąc, brak re-fetch przy powrocie do poprzedniego miesiąca
- **Bezpieczeństwo:** dane filtrowane per user przez Supabase RLS
- **UX:** płynna nawigacja między miesiącami, spinner podczas ładowania

## 5. Kontekst techniczny
- **Komponenty:** `MoodCalendar`, `MainLayout`; hook `useCalendar`
- **API:** `useCalendar(month, year)` → `SELECT * FROM calendar_entries WHERE user_id = ? AND month = ?`
- **Dane:** `CalendarEntry[]` per miesiąc

## 6. Kroki implementacji
1. Utwórz `Calendar.tsx` — state: `month`, `year`
2. Przekaż do `MoodCalendar` dane z `useCalendar`
3. Obsłuż nawigację prev/next month
4. Dodaj trasę `/calendar` w `App.tsx`

## 7. Kryteria akceptacji
- Poprawna siatka kalendarza dla każdego miesiąca
- Dni z wpisami kolorowe, kliknięcie otwiera szczegóły
- Nawigacja między miesiącami działa
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run build` — ✓ 1387 modules; ręczny test: `/calendar` wyświetla wpisy, nawigacja między miesiącami działa

---
*Status: [x] Zaimplementowany*
