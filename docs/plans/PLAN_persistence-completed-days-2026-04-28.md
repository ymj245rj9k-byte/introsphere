# Persistence completedDays - 2026-04-28

## 1. Cel
Naprawa krytycznego błędu braku trwałości postępu w journey – po odświeżeniu strony postęp był tracony. Implementacja persist middleware i synchronizacji z bazą danych.

## 2. Zakres
**W zakresie:**
- `journeyStore.ts` — dodanie `persist` middleware z localStorage
- Nowa akcja `syncFromDatabase()` — synchronizacja z `calendar_entries`
- `Journey.tsx` — wywołanie `syncFromDatabase()` przy mount

**Poza zakresem:**
- Zmiana schematu bazy danych
- Multi-device sync w czasie rzeczywistym (Supabase Realtime)

## 3. Wymagania funkcjonalne
- `journeyStore` persystuje `completedDays` do localStorage (klucz: `journey-completed-days`)
- `syncFromDatabase()` pobiera ukończone dni z `calendar_entries` dla zalogowanego usera
- `Journey.tsx` wywołuje sync przy mount gdy user authenticated

## 4. Wymagania niefunkcjonalne
- **Wydajność:** sync tylko przy mount, nie przy każdym renderze
- **Bezpieczeństwo:** `syncFromDatabase()` używa `userId` z `authStore` — nie ma dostępu do cudzych danych
- **UX:** postęp zachowany po reload, synchronizowany między urządzeniami

## 5. Kontekst techniczny
- **Komponenty:** `Journey.tsx` wywołuje sync przy mount
- **API:** `SELECT journey_id, journey_day FROM calendar_entries WHERE user_id = ?`
- **Dane:** `journeyStore.completedDays: Record<string, number[]>`

## 6. Kroki implementacji
1. Dodaj `persist` middleware do `journeyStore` z kluczem `journey-completed-days`
2. Dodaj akcję `syncFromDatabase()` — query Supabase + mapowanie na `completedDays`
3. W `Journey.tsx` dodaj `useEffect` → `syncFromDatabase()` gdy user authenticated

## 7. Kryteria akceptacji
- Po reload strony postęp journey jest zachowany
- `localStorage['journey-completed-days']` zawiera `completedDays` po ukończeniu dnia
- `syncFromDatabase()` poprawnie odtwarza postęp z DB (test multi-device)

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npx tsc --noEmit` — brak błędów; ręczny test: ukończ dzień → reload → postęp zachowany; `localStorage` zawiera dane; DB zawiera wpisy

---
*Status: [x] Zaimplementowany*
