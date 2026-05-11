# Main Pages (Calendar, History, Settings, Session) - 2026-04-20

## 1. Cel
Stworzenie czterech głównych stron aplikacji dla zalogowanego użytkownika jako kompletny zestaw. Plan grupowy – szczegóły każdej strony w osobnych planach.

> **Uwaga:** Ten plan grupuje 4 strony, które były implementowane równocześnie. Każda strona ma własny szczegółowy plan: `PLAN_calendar-page`, `PLAN_history-page`, `PLAN_settings-page`, `PLAN_session-page`.

## 2. Zakres
**W zakresie:**
- `Calendar.tsx` — miesięczny kalendarz nastrojów
- `History.tsx` — lista wpisów z filtrowaniem
- `Settings.tsx` — ustawienia konta i atmosfery
- `Session.tsx` — codzienna sesja z kołem emocji

**Poza zakresem:**
- Pełna integracja z Supabase (osobne plany)
- Strony Landing, Onboarding, Auth (osobne plany)

## 3. Wymagania funkcjonalne
- Wszystkie 4 strony dostępne jako trasy w `App.tsx`
- Każda obsługuje `MainLayout` i `ProtectedRoute`
- Strony działają bez danych (empty states)

## 4. Wymagania niefunkcjonalne
- **Wydajność:** leniwe ładowanie komponentów stron
- **Bezpieczeństwo:** wszystkie strony za `ProtectedRoute`
- **UX:** spójna nawigacja przez `MainLayout`

## 5. Kontekst techniczny
- **Komponenty:** `MainLayout`, `ProtectedRoute`, komponenty specyficzne per strona
- **API:** brak na tym etapie (placeholder dane)
- **Dane:** statyczne lub puste

## 6. Kroki implementacji
1. Utwórz szkielety 4 stron
2. Dodaj trasy w `App.tsx`: `/calendar`, `/history`, `/settings`, `/session`
3. Owiń trasami `ProtectedRoute`

## 7. Kryteria akceptacji
- Wszystkie 4 trasy dostępne i renderują się bez błędów
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run build` — ✓ 1387 modules; ręczna weryfikacja wszystkich 4 tras

---
*Status: [x] Zaimplementowany*
