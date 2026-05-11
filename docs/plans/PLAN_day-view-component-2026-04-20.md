# DayView Component - 2026-04-20

## 1. Cel
Stworzenie komponentu widoku dnia w programie journey. Użytkownik widzi pytanie na dany dzień i odpowiada w textarea – odpowiedź jest zapisywana do bazy danych.

## 2. Zakres
**W zakresie:**
- `src/components/journey/DayView.tsx` — pytanie + textarea + przycisk „Odpowiedz"
- Zapis odpowiedzi do `calendar_entries` z `journey_id` i `journey_day`
- Aktualizacja `journeyStore.completedDays` po zapisie

**Poza zakresem:**
- Oddzielny `DayQuestion.tsx` — niepotrzebny, wszystko w DayView
- Animacje przejść

## 3. Wymagania funkcjonalne
- Pobiera pytanie z `data/journeys.ts[journeyId][dayNumber]`
- Textarea na odpowiedź (min. 1 znak)
- Submit → `saveJourneyDayResponse()` → `journeyStore.setCompletedDays()`
- Po sukcesie redirect do `/journey/:id`

## 4. Wymagania niefunkcjonalne
- **Wydajność:** brak redundantnych re-renderów, `useCallback` dla submit handler
- **Bezpieczeństwo:** zapis tylko dla zalogowanego użytkownika (RLS Supabase)
- **UX:** przycisk submit zablokowany przy pustej odpowiedzi, feedback po zapisie

## 5. Kontekst techniczny
- **Komponenty:** używany przez `Journey.tsx` (route `/journey/:id/day/:dayNumber`)
- **API:** `saveJourneyDayResponse(journeyId, dayNumber, text, userId)` w `lib/database.ts`
- **Dane:** pytania z `data/journeys.ts`, postęp z `journeyStore`

## 6. Kroki implementacji
1. Utwórz `DayView.tsx` — pobieranie pytania, textarea ze stanem, submit handler
2. Zintegruj `saveJourneyDayResponse()` z `lib/database.ts`
3. Po sukcesie: `journeyStore.setCompletedDays()` + `navigate('/journey/:id')`
4. Eksportuj z `components/journey/index.ts`

## 7. Kryteria akceptacji
- Wyświetla poprawne pytanie dla każdego dnia/journey
- Submit zapisuje wpis do `calendar_entries` w Supabase
- Po zapisie pasek postępu w Journey.tsx aktualizuje się
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run build` bez błędów; ręczny test: wpisanie odpowiedzi → Save → DB zawiera wpis + redirect do overview

---
*Status: [x] Zaimplementowany*
