# Fix Continue Button Navigation - 2026-04-28

## 1. Cel
Naprawa krytycznego błędu: przycisk „Continue day N" na stronie journey nie miał obsługi `onClick`, przez co blokował nawigację do następnego dnia.

## 2. Zakres
**W zakresie:**
- `src/pages/Journey.tsx` — dodanie `onClick` do przycisku Continue (linia ~129-132)

**Poza zakresem:**
- Zmiana logiki wyznaczania bieżącego dnia
- Inne przyciski nawigacyjne

## 3. Wymagania funkcjonalne
- Przycisk „Continue day N" po kliknięciu nawiguje do `/journey/:id/day/:currentDay`
- `currentDay` obliczany przez `journeyStore.getCurrentDay(id)`

## 4. Wymagania niefunkcjonalne
- **Wydajność:** brak dodatkowych zapytań
- **Bezpieczeństwo:** brak – zmiana tylko w nawigacji
- **UX:** przycisk reaguje natychmiast, bez opóźnienia

## 5. Kontekst techniczny
- **Komponenty:** `Journey.tsx` linia ~129-132
- **API:** brak
- **Dane:** `currentDay` z `journeyStore.getCurrentDay(journeyId)`

## 6. Kroki implementacji
1. W `Journey.tsx` dodaj `onClick={() => navigate('/journey/${id}/day/${currentDay}')}` do przycisku Continue

## 7. Kryteria akceptacji
- Kliknięcie „Continue day 2" przenosi do `/journey/:id/day/2`
- Kliknięcie „Continue day 3" przenosi do `/journey/:id/day/3`
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npx tsc --noEmit` — brak błędów; ręczny test: journey overview → Continue → DayView dla właściwego dnia

---
*Status: [x] Zaimplementowany*
