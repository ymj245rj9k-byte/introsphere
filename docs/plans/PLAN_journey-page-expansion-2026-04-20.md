# Journey Page Expansion - 2026-04-20

## 1. Cel
Rozbudowa strony Journey o widok 7 dni z listą pytań, paskiem postępu i nawigacją do poszczególnych dni. Użytkownik widzi swój aktualny postęp i może przejść do następnego dnia.

## 2. Zakres
**W zakresie:**
- `src/pages/Journey.tsx` — widok 7 dni, lista pytań, JourneyProgress, przycisk Continue

**Poza zakresem:**
- Pełna integracja z backendem (postęp pobierany z `journeyStore`)
- Animacje przejść

## 3. Wymagania funkcjonalne
- Wyświetla tytuł i opis journey
- Pasek postępu (JourneyProgress) z ukończonymi dniami
- Lista 7 pytań z oznaczeniem ukończonych
- Przycisk „Continue day N" → nawigacja do `/journey/:id/day/:dayNumber`
- Trasa `/journey/:id/day/:dayNumber` renderuje `DayView`

## 4. Wymagania niefunkcjonalne
- **Wydajność:** `getCurrentDay()` z `journeyStore` bez DB call
- **Bezpieczeństwo:** dostępna tylko dla zalogowanych
- **UX:** użytkownik od razu widzi gdzie jest w programie

## 5. Kontekst techniczny
- **Komponenty:** `JourneyProgress`, `DayView`; route params `:id`, `:dayNumber`
- **API:** `journeyStore.getCurrentDay(id)`, `journeyStore.getCompletedDays(id)`
- **Dane:** journey z `data/journeys.ts`, postęp z `journeyStore`

## 6. Kroki implementacji
1. Rozbuduj `Journey.tsx` — pobieranie journey po `id`, wyświetlanie 7 dni
2. Dodaj `JourneyProgress` z danymi ze store
3. Dodaj przycisk Continue z `onClick(() => navigate(...))`
4. Dodaj zagnieżdżoną trasę `/journey/:id/day/:dayNumber` → `DayView`

## 7. Kryteria akceptacji
- Strona journey wyświetla poprawne dane dla każdego z 6 journey
- Continue button nawiguje do właściwego dnia
- Po ukończeniu dnia postęp jest zapisany i widoczny
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run build` bez błędów; ręczny test: journey overview → Continue → DayView → zapis → powrót z aktualizacją postępu

---
*Status: [x] Zaimplementowany*
