# Home Page Component - 2026-04-20

## 1. Cel
Stworzenie strony głównej aplikacji po zalogowaniu. Stanowi hub nawigacyjny – prezentuje podgląd koła emocji, listę journey i szybkie akcje.

## 2. Zakres
**W zakresie:**
- `src/pages/Home.tsx` — hero, podgląd koła emocji (SVG), siatka journeys, sekcja features, CTA

**Poza zakresem:**
- Pełna funkcjonalność koła emocji (osobny plan EmotionWheel)
- Integracja z Supabase (auth/backend)
- Rzeczywiste strony Journey/Session (placeholder linki)

## 3. Wymagania funkcjonalne
- Hero z powitaniem użytkownika
- Klikalna miniatura koła emocji → nawigacja do `/session`
- Siatka kart journey (6 journey) → każda nawiguje do `/journey/:id`
- Sekcja „Funkcje" i CTA

## 4. Wymagania niefunkcjonalne
- **Wydajność:** dane statyczne, zero zapytań na mount
- **Bezpieczeństwo:** dostępna tylko dla zalogowanych (ProtectedRoute)
- **UX:** jasna hierarchia wizualna, szybki dostęp do najważniejszych akcji

## 5. Kontekst techniczny
- **Komponenty:** używa `JourneyCard`, `MainLayout`, miniaturki SVG koła
- **API:** brak na tym etapie
- **Dane:** journey z `data/journeys.ts`, user z `authStore`

## 6. Kroki implementacji
1. Utwórz `Home.tsx` — hero section z miniaturą koła
2. Dodaj siatkę journey (6 kart `JourneyCard`)
3. Dodaj sekcję features i CTA
4. Dodaj route `/home` w `App.tsx`

## 7. Kryteria akceptacji
- Strona `/home` renderuje się dla zalogowanego użytkownika
- 6 kart journey widocznych, każda klikalana
- Miniatura koła nawiguje do `/session`
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run build` — ✓ 42 modules; ręczny test: strona renderuje wszystkie sekcje

---
*Status: [x] Zaimplementowany*
