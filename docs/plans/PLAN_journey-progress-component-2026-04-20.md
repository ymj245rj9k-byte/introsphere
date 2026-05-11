# JourneyProgress Component - 2026-04-20

## 1. Cel
Stworzenie komponentu paska postępu 7-dniowego programu journey. Wizualizuje ukończone dni i aktualną pozycję użytkownika w programie.

## 2. Zakres
**W zakresie:**
- `src/components/journey/JourneyProgress.tsx` — 7-dniowy pasek postępu

**Poza zakresem:**
- Animowane przejścia
- Integracja z backendem (dane przez props)

## 3. Wymagania funkcjonalne
- Props: `completedDays: number[]`, `currentDay: number`, `totalDays: number` (domyślnie 7)
- Wyświetla 7 kroków, ukończone zaznaczone
- Aktualny dzień wyróżniony

## 4. Wymagania niefunkcjonalne
- **Wydajność:** czysty komponent presentacyjny
- **Bezpieczeństwo:** brak danych wrażliwych
- **UX:** jasno odróżnia ukończone, aktualne i nadchodzące dni

## 5. Kontekst techniczny
- **Komponenty:** używany przez `Journey.tsx`
- **API:** brak
- **Dane:** `completedDays` z `journeyStore`

## 6. Kroki implementacji
1. Utwórz `JourneyProgress.tsx` — rząd 7 kółek/kroków z warunkowym stylem
2. Eksportuj z `components/journey/index.ts`

## 7. Kryteria akceptacji
- 7 kroków widocznych na stronie journey
- Ukończone dni zaznaczone (inny kolor/ikona)
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run build` bez błędów; ręczny test: po ukończeniu dnia pasek postępu aktualizuje się

---
*Status: [x] Zaimplementowany*
