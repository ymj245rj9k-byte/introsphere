# Session Page - 2026-04-20

## 1. Cel
Stworzenie strony sesji emocjonalnej – punkt wejścia do codziennej refleksji. Użytkownik wybiera emocję z koła, co inicjuje przejście do formularza odpowiedzi.

## 2. Zakres
**W zakresie:**
- `src/pages/Session.tsx` — strona renderująca `EmotionWheel`
- Po wyborze emocji → redirect do `/emotion-reflection` z emocją w `location.state`

**Poza zakresem:**
- Formularz odpowiedzi – obsługiwany przez `EmotionReflection.tsx`
- Quick emotions panel – zastąpiony pełnym kołem

## 3. Wymagania funkcjonalne
- Renderuje pełne interaktywne koło emocji (`EmotionWheel`)
- Po wyborze emocji: `navigate('/emotion-reflection', { state: { emotion } })`
- Dostępna pod trasą `/session`

## 4. Wymagania niefunkcjonalne
- **Wydajność:** brak dodatkowych zapytań – koło używa danych statycznych
- **Bezpieczeństwo:** dostępna tylko dla zalogowanych (ProtectedRoute)
- **UX:** pełnoekranowe koło emocji jako główny element strony

## 5. Kontekst techniczny
- **Komponenty:** `EmotionWheel`, `MainLayout`
- **API:** brak
- **Dane:** emocje z `data/emotions.ts` (przez EmotionWheel)

## 6. Kroki implementacji
1. Utwórz `Session.tsx` — import `EmotionWheel`, obsługa `onSelect` callback
2. `onSelect(emotion)` → `navigate('/emotion-reflection', { state: { emotion } })`
3. Dodaj trasę `/session` w `App.tsx`

## 7. Kryteria akceptacji
- Strona `/session` wyświetla koło emocji
- Wybór emocji nawiguje do `/emotion-reflection` z poprawnym obiektem emocji
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run build` bez błędów; ręczny test: `/session` → klik sektora → modal → Continue → redirect do `/emotion-reflection`

---
*Status: [x] Zaimplementowany*
