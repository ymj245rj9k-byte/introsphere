# JourneyCard Component - 2026-04-20

## 1. Cel
Wyodrębnienie komponentu karty journey z `Home.tsx` jako reużywalny element. Karta prezentuje journey z ikoną, tytułem, opisem i statusem postępu.

## 2. Zakres
**W zakresie:**
- `src/components/journey/JourneyCard.tsx` — karta z ikoną, tytułem, opisem, progress badge

**Poza zakresem:**
- Pełna integracja z backendem
- Animacje przejść

## 3. Wymagania funkcjonalne
- Props: `journey: Journey`, `completedDays: number`, `onClick: () => void`
- Wyświetla ikonę journey, tytuł, opis
- Badge z postępem (n/7 dni)

## 4. Wymagania niefunkcjonalne
- **Wydajność:** brak stanu, memoizacja przez React.memo jeśli potrzebna
- **Bezpieczeństwo:** brak danych wrażliwych
- **UX:** hover state, cursor pointer, progress badge czytelny

## 5. Kontekst techniczny
- **Komponenty:** używany przez `Journeys.tsx` i `Home.tsx`; korzysta z `card.tsx` Shadcn
- **API:** brak – dane przez props
- **Dane:** `Journey` z `data/journeys.ts`, `completedDays` z `journeyStore`

## 6. Kroki implementacji
1. Wyodrębnij komponent z `Home.tsx` do `JourneyCard.tsx`
2. Dodaj props interface `JourneyCardProps`
3. Eksportuj z `components/journey/index.ts`

## 7. Kryteria akceptacji
- Karta wyświetla wszystkie 6 journey na stronie `/journeys`
- Kliknięcie karty nawiguje do `/journey/:id`
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run build` bez błędów; ręczny test: `/journeys` wyświetla 6 kart

---
*Status: [x] Zaimplementowany*
