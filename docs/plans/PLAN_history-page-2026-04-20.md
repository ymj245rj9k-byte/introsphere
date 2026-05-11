# History Page - 2026-04-20

## 1. Cel
Stworzenie strony historii wpisów. Użytkownik przegląda chronologiczną listę swoich sesji emocjonalnych z możliwością filtrowania.

## 2. Zakres
**W zakresie:**
- `src/pages/History.tsx` — lista wpisów od najnowszych
- Filtrowanie po dacie / emocji

**Poza zakresem:**
- Pełna integracja z Supabase (przez `useHistory` hook)
- Edycja wpisów

## 3. Wymagania funkcjonalne
- Lista wpisów posortowana od najnowszych
- Filtrowanie po emocji lub journey
- Kliknięcie wpisu → podgląd szczegółów

## 4. Wymagania niefunkcjonalne
- **Wydajność:** paginacja lub lazy loading dla dużej liczby wpisów
- **Bezpieczeństwo:** dane filtrowane per user przez Supabase RLS
- **UX:** pusty stan gdy brak wpisów, spinner podczas ładowania

## 5. Kontekst techniczny
- **Komponenty:** `MainLayout`, `EmptyState`, `LoadingSpinner`; hook `useHistory`
- **API:** `useHistory(filters)` → `SELECT * FROM calendar_entries WHERE user_id = ? ORDER BY created_at DESC`
- **Dane:** `CalendarEntry[]` z opcjonalnymi filtrami

## 6. Kroki implementacji
1. Utwórz `History.tsx` — lista wpisów z `useHistory`
2. Dodaj filtrowanie po emocji i journey
3. Obsłuż pusty stan (`EmptyState`)
4. Dodaj trasę `/history` w `App.tsx`

## 7. Kryteria akceptacji
- Lista wpisów wyświetla się od najnowszych
- Filtrowanie działa dla emocji i journey
- Pusty stan gdy brak wpisów
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run build` — ✓ 1387 modules; ręczny test: strona wyświetla wpisy, filtry działają

---
*Status: [x] Zaimplementowany*
