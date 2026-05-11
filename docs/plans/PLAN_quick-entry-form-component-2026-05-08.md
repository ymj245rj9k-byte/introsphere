# Quick Entry Form Component - 2026-05-08

## 1. Cel
Stworzenie strony formularza szybkiego wpisu. Użytkownik może dodać notatki tekstowe bez wyboru emocji, co obniża barierę wejścia do dziennikowania.

## 2. Zakres
**W zakresie:**
- Nowa trasa `/quick-entry` z formularzem (textarea + przycisk zapisz)

**Poza zakresem:**
- Przycisk Quick Entry na Home (osobny plan: `PLAN_home-page-quick-action-button`)
- Logika zapisu do DB (osobny plan: `PLAN_new-entry-data-layer`)
- Wyświetlanie quick entries w kalendarzu i historii

## 3. Wymagania funkcjonalne
- Formularz z textarea (placeholder: „Co chcesz zapisać?") i przyciskiem „Zapisz"
- Submit wywołuje `saveQuickEntry(text, userId)` z warstwy danych
- Po sukcesie: redirect do `/home`
- Przycisk „Zapisz" nieaktywny gdy textarea pusta

## 4. Wymagania niefunkcjonalne
- **Wydajność:** brak nadmiarowych re-renderów, `useCallback` dla submit
- **Bezpieczeństwo:** dostępna tylko dla zalogowanych (ProtectedRoute)
- **UX:** minimalistyczny formularz, jasny CTA, obsługa błędów zapisem (toast)

## 5. Kontekst techniczny
- **Komponenty:** `MainLayout`, `textarea.tsx`, `button.tsx` (Shadcn)
- **API:** `saveQuickEntry(text, userId)` z `lib/database.ts`
- **Dane:** `user` z `authStore`

## 6. Kroki implementacji
1. Utwórz `src/pages/QuickEntry.tsx` — formularz z textarea + przycisk Zapisz
2. Podłącz `saveQuickEntry()` w submit handler
3. Obsłuż błędy (toast.error) i sukces (navigate('/home'))
4. Dodaj trasę `/quick-entry` w `App.tsx`

## 7. Kryteria akceptacji
- Strona `/quick-entry` wyświetla formularz
- Przycisk zablokowany przy pustej textarea
- Sukces zapisu → redirect do `/home`
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run build` bez błędów; ręczny test: wpisz tekst → Zapisz → wpis w DB → redirect do Home

---
*Status: [x] Zaimplementowany (zapis działa; wyświetlanie w kalendarzu/historii – w toku)*
