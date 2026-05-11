# CalendarDay Component - 2026-04-20

## 1. Cel
Stworzenie komponentu reprezentującego pojedynczy dzień w kalendarzu nastrojów. Wyświetla numer dnia z kolorem odpowiadającym zapisanej emocji.

## 2. Zakres
**W zakresie:**
- `src/components/calendar/CalendarDay.tsx` — komponent dnia z kolorem emocji

**Poza zakresem:**
- Pełna integracja z backendem (w MoodCalendar)
- Animacje

## 3. Wymagania funkcjonalne
- Props: `day: number`, `color?: string`, `isCurrentMonth: boolean`, `onClick?: () => void`
- Dni z `color` wyświetlają kolorowe tło
- Dni spoza bieżącego miesiąca są wyszarzone i nieklikalną

## 4. Wymagania niefunkcjonalne
- **Wydajność:** czysty komponent presentacyjny, brak stanu
- **Bezpieczeństwo:** brak danych wrażliwych
- **UX:** kolor dnia intuicyjnie wskazuje nastrój, hover cursor pointer gdy klikalny

## 5. Kontekst techniczny
- **Komponenty:** używany przez `MoodCalendar.tsx`
- **API:** brak – dane przez props
- **Dane:** `color` pochodzi z mapowania `emotion.id → emotion.color`

## 6. Kroki implementacji
1. Utwórz `CalendarDay.tsx` — div z numerem dnia i warunkowym kolorem tła
2. Eksportuj z `components/calendar/index.ts`

## 7. Kryteria akceptacji
- Dzień z kolorem wyświetla kolorowe tło
- Dzień spoza miesiąca jest wyszarzony
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run build` bez błędów; ręczny test: `/calendar` wyświetla kolorowe dni z wpisami

---
*Status: [x] Zaimplementowany*
