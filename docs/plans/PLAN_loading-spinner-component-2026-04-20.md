# LoadingSpinner Component - 2026-04-20

## 1. Cel
Stworzenie wielokrotnego użytku komponentu spinnera ładowania. Używany w całej aplikacji podczas oczekiwania na dane.

## 2. Zakres
**W zakresie:**
- `src/components/common/LoadingSpinner.tsx` — animowany SVG spinner

**Poza zakresem:**
- Skeleton loaders (do rozważenia w przyszłości)
- Progress bars

## 3. Wymagania funkcjonalne
- Renderuje animowany SVG spinner
- Opcjonalny props `size` i `className`

## 4. Wymagania niefunkcjonalne
- **Wydajność:** CSS animation (nie JS), lekki
- **Bezpieczeństwo:** brak danych wrażliwych
- **UX:** wyśrodkowany, odpowiedni kontrast w każdym motywie atmosfery

## 5. Kontekst techniczny
- **Komponenty:** używany przez strony podczas ładowania danych (Calendar, History, Home)
- **API:** brak
- **Dane:** brak stanu

## 6. Kroki implementacji
1. Utwórz `LoadingSpinner.tsx` — SVG circle z animacją CSS `animate-spin`
2. Eksportuj z `components/common/index.ts`

## 7. Kryteria akceptacji
- Spinner jest widoczny i animowany
- Nie powoduje błędów TypeScript
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run build` — ✓ 43 modules; ręczny test: spinner widoczny na stronach podczas ładowania

---
*Status: [x] Zaimplementowany*
