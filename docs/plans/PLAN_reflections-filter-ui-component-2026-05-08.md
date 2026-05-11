# Reflections Filter – UI Component - 2026-05-08

## 1. Cel
Stworzenie interfejsu filtrowania na stronie Historii. Użytkownik może wybrać emocję lub journey z listy rozwijanej, aby przefiltrować wyświetlane wpisy.

## 2. Zakres
**W zakresie:**
- Dropdown filtra emocji (32 emocje: L3 + podspektry, po nazwie angielskiej)
- Dropdown filtra journey (6 journey, po tytule angielskim)
- Przycisk Filter toggle — otwiera/zamyka dropdown
- Przycisk czyszczenia filtra (× lub „Clear")

**Poza zakresem:**
- Zmiany w bazie danych i API
- Logika filtrowania (osobny plan: `PLAN_reflections-filter-state-logic`)

## 3. Wymagania funkcjonalne
- Przycisk „Filter" toggle otwiera panel z dwoma dropdownami
- Dropdown emocji z 32 opcjami (nazwy EN)
- Dropdown journey z 6 opcjami (tytuły EN)
- Wybór opcji ustawia `filterType` i `filterValue` (z planu logiki)
- Przycisk „Clear" resetuje filtr do `null`

## 4. Wymagania niefunkcjonalne
- **Wydajność:** dane emocji i journey ze statycznych plików — brak zapytań
- **Bezpieczeństwo:** brak danych wrażliwych
- **UX:** jasna informacja o aktywnym filtrze, łatwe czyszczenie, zamknięcie po wyborze

## 5. Kontekst techniczny
- **Komponenty:** `History.tsx`; dropdown z `ui/` Shadcn; dane z `data/emotions.ts`, `data/journeys.ts`
- **API:** brak
- **Dane:** `getLevel3Emotions()` + `getAllSubspectrums()`, `journeys` z `data/journeys.ts`

## 6. Kroki implementacji
1. Dodaj przycisk Filter toggle do `History.tsx`
2. Utwórz panel dropdown z listą emocji (32 opcje)
3. Dodaj dropdown journey (6 opcji)
4. Podłącz do setterów z planu logiki (`setFilterType`, `setFilterValue`)
5. Dodaj przycisk Clear

## 7. Kryteria akceptacji
- Przycisk Filter otwiera/zamyka panel z dropdownami
- Wybór emocji filtruje listę wpisów
- Wybór journey filtruje listę wpisów
- Clear resetuje widok do pełnej listy
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run lint && npm run build` bez błędów; ręczny test: otwórz filter → wybierz emocję → lista przefiltrowana; Clear → pełna lista

---
*Status: [x] Zaimplementowany*
