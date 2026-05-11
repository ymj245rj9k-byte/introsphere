# Reflections Filter – State and Logic - 2026-05-08

## 1. Cel
Implementacja logiki filtrowania wpisów na stronie Historia/Refleksje. Użytkownik może filtrować wpisy po nazwie emocji lub nazwie journey.

## 2. Zakres
**W zakresie:**
- Stan filtra: typ (`emotion | journey | null`) i wartość
- Logika filtrowania wpisów po `emotionId` lub `journey_id`

**Poza zakresem:**
- Zmiany w bazie danych i API
- Komponent UI filtra (osobny plan: `PLAN_reflections-filter-ui-component`)

## 3. Wymagania funkcjonalne
- Stan: `filterType: 'emotion' | 'journey' | null`, `filterValue: string | null`
- Filtrowanie tablicy wpisów: gdy `filterType = 'emotion'` → `entry.emotionId === filterValue`
- Filtrowanie: gdy `filterType = 'journey'` → `entry.journey_id === filterValue`
- Brak filtra (`null`) → wszystkie wpisy

## 4. Wymagania niefunkcjonalne
- **Wydajność:** filtrowanie po stronie klienta (bez dodatkowych zapytań DB)
- **Bezpieczeństwo:** brak – logika tylko na danych już pobranych dla usera
- **UX:** brak – warstwa logiki, UX w planie UI

## 5. Kontekst techniczny
- **Komponenty:** `History.tsx` (lub `useHistory` hook) — state + derived filtered list
- **API:** brak zmian
- **Dane:** `CalendarEntry[]` z `useHistory`, filtrowanie w pamięci

## 6. Kroki implementacji
1. Dodaj `filterType` i `filterValue` state w `History.tsx` / `useHistory`
2. Implementacja `filteredEntries = entries.filter(...)` na podstawie stanu filtra
3. Eksponuj settery do UI (przez props lub hook return value)

## 7. Kryteria akceptacji
- `filterType='emotion'` + `filterValue='joy'` → tylko wpisy z emocją `joy`
- `filterType='journey'` + `filterValue='samopoznanie'` → tylko wpisy z tym journey
- `filterType=null` → wszystkie wpisy
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run lint && npm run build` bez błędów; ręczny test: po wybraniu filtra lista wpisów zmienia się poprawnie

---
*Status: [x] Zaimplementowany*
