# Settings Page - 2026-04-20

## 1. Cel
Stworzenie strony ustawień konta. Użytkownik może zmienić motyw atmosfery i wylogować się.

## 2. Zakres
**W zakresie:**
- `src/pages/Settings.tsx` — profil użytkownika, wybór atmosfery (8 tematów), wylogowanie

**Poza zakresem:**
- Pełna edycja profilu (avatar, hasło)
- Ustawienia powiadomień

## 3. Wymagania funkcjonalne
- Wyświetla adres email zalogowanego użytkownika
- `AtmospherePicker` — wybór jednego z 8 tematów, zapisywany do `themeStore`
- Przycisk „Wyloguj" → `authStore.signOut()` + redirect do `/auth`

## 4. Wymagania niefunkcjonalne
- **Wydajność:** brak zapytań DB (zmiana atmosfery to lokalny state)
- **Bezpieczeństwo:** dostępna tylko dla zalogowanych
- **UX:** zmiana atmosfery natychmiastowa (live preview)

## 5. Kontekst techniczny
- **Komponenty:** `MainLayout`, `AtmospherePicker`
- **API:** `authStore.signOut()` → Supabase `auth.signOut()`
- **Dane:** `themeStore.atmosphere`, `authStore.user`

## 6. Kroki implementacji
1. Utwórz `Settings.tsx` — sekcja profilu z emailem
2. Dodaj `AtmospherePicker` z 8 motywami
3. Dodaj przycisk wylogowania
4. Dodaj trasę `/settings` w `App.tsx`

## 7. Kryteria akceptacji
- Email użytkownika widoczny
- Zmiana atmosfery natychmiast aktualizuje wygląd aplikacji
- Wylogowanie przenosi na `/auth`
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run build` — ✓ 1387 modules; ręczny test: zmiana atmosfery działa, wylogowanie działa

---
*Status: [x] Zaimplementowany*
