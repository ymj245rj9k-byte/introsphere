# Delete Entry – GUI Integration - 2026-05-08

## 1. Cel
Dodanie interfejsu użytkownika do funkcji usuwania wpisów. Użytkownik może usunąć wpis z kalendarza lub listy historii za pomocą przycisku z potwierdzeniem.

## 2. Zakres
**W zakresie:**
- Przycisk „Usuń" w `CalendarEntry` (dialog szczegółów dnia)
- Dialog potwierdzenia usunięcia
- Odświeżenie widoku po usunięciu (wpis znika z kalendarza i historii)

**Poza zakresem:**
- Implementacja `deleteEntry()` w warstwie danych (osobny plan: `PLAN_delete-entry-data-layer`)
- Usuwanie wielu wpisów naraz
- Przywracanie usuniętych wpisów

## 3. Wymagania funkcjonalne
- Przycisk „Usuń" w dialogu szczegółów wpisu
- Dialog potwierdzenia: „Czy na pewno chcesz usunąć ten wpis?"
- Po potwierdzeniu: wywołanie `deleteEntry()`, zamknięcie dialogu, refetch danych
- Wpis natychmiast znika z kalendarza i listy historii

## 4. Wymagania niefunkcjonalne
- **Wydajność:** odświeżenie danych po usunięciu bez pełnego reload strony
- **Bezpieczeństwo:** przycisk usuwa tylko wpis należący do zalogowanego usera
- **UX:** dialog potwierdzenia zapobiega przypadkowemu usunięciu; operacja nieodwracalna

## 5. Kontekst techniczny
- **Komponenty:** `CalendarEntry.tsx`, `ConfirmDialog.tsx` (Shadcn dialog)
- **API:** `deleteEntry(entry.id, user.id)` z `lib/database.ts`
- **Dane:** `sessionStore.entryDeletedCount` — increment trigguje refetch w hooks

## 6. Kroki implementacji
1. Dodaj przycisk „Usuń" do `CalendarEntry.tsx`
2. Dodaj `ConfirmDialog` z komunikatem potwierdzenia
3. Po potwierdzeniu: `deleteEntry()` → increment `sessionStore.entryDeletedCount`
4. Hooks `useCalendar` i `useHistory` reagują na zmianę `entryDeletedCount` → refetch

## 7. Kryteria akceptacji
- Kliknięcie „Usuń" otwiera dialog potwierdzenia
- Potwierdzenie usuwa wpis i zamyka dialog
- Wpis natychmiast znika z kalendarza i listy historii
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run lint && npm run build` bez błędów; ręczny test: klik Delete → dialog → Confirm → wpis znika z kalendarza i historii

---
*Status: [x] Zaimplementowany*
