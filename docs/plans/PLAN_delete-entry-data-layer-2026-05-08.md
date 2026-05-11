# Delete Entry – Data Layer - 2026-05-08

## 1. Cel
Implementacja warstwy danych dla funkcji usuwania wpisu z dziennika emocji. Użytkownik musi mieć możliwość usunięcia błędnych lub niechcianych wpisów.

## 2. Zakres
**W zakresie:**
- Funkcja `deleteEntry(entryId, userId)` w `src/lib/database.ts`

**Poza zakresem:**
- UI przycisku Delete (osobny plan: `PLAN_delete-entry-gui`)
- Usuwanie wielu wpisów naraz
- Przywracanie usuniętych wpisów
- Usuwanie wpisów innych użytkowników

## 3. Wymagania funkcjonalne
- `deleteEntry(id, userId)` usuwa rekord z `calendar_entries` gdzie `id = ? AND user_id = ?`
- Funkcja rzuca błąd gdy wpis nie istnieje lub należy do innego usera

## 4. Wymagania niefunkcjonalne
- **Wydajność:** pojedyncze zapytanie DELETE z indeksem na `id`
- **Bezpieczeństwo:** warunek `user_id = ?` chroni przed usunięciem cudzych wpisów; Supabase RLS jako dodatkowa warstwa
- **UX:** brak – warstwa danych, UX w planie GUI

## 5. Kontekst techniczny
- **Komponenty:** `lib/database.ts` — nowa eksportowana funkcja
- **API:** `supabase.from('calendar_entries').delete().eq('id', id).eq('user_id', userId)`
- **Dane:** tabela `calendar_entries`, kolumny `id (uuid)`, `user_id (uuid)`

## 6. Kroki implementacji
1. W `lib/database.ts` dodaj `deleteEntry(id: string, userId: string): Promise<void>`
2. Implementacja: Supabase DELETE z warunkami `id` i `user_id`
3. Obsługa błędów: rzuć wyjątek jeśli operacja nieudana

## 7. Kryteria akceptacji
- `deleteEntry(validId, ownerId)` usuwa wpis z bazy
- `deleteEntry(validId, wrongUserId)` nie usuwa wpisu (RLS blokuje)
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak (wymaga połączenia z DB)
- **Integracyjne:** `npm run lint && npm run build` bez błędów; ręczny test: wywołaj `deleteEntry` z poprawnym ID → wpis znika z `calendar_entries`

---
*Status: [x] Zaimplementowany*
