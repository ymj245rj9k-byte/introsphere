# OnboardingLayout Component - 2026-04-20

## 1. Cel
Stworzenie layoutu dla 3-krokowego wizarda onboardingu. Zapewnia spójny wygląd z paskiem postępu i nawigacją między krokami.

## 2. Zakres
**W zakresie:**
- `src/components/layout/OnboardingLayout.tsx` — wizard layout z progress indicator, treścią kroku i nawigacją
- Progress bar (inline lub osobny komponent)

**Poza zakresem:**
- Logika kroków onboardingu (w `Onboarding.tsx`)
- Animacje przejść

## 3. Wymagania funkcjonalne
- Props: `currentStep`, `totalSteps`, `children`, `onNext`, `onBack`
- Wyświetla pasek postępu (n/totalSteps)
- Przyciski „Wstecz" / „Dalej" z odpowiednimi callbackami

## 4. Wymagania niefunkcjonalne
- **Wydajność:** czysty layout, brak state
- **Bezpieczeństwo:** brak danych wrażliwych
- **UX:** pasek postępu daje użytkownikowi orientację w procesie

## 5. Kontekst techniczny
- **Komponenty:** używany przez `Onboarding.tsx`
- **API:** brak
- **Dane:** brak – props-driven

## 6. Kroki implementacji
1. Utwórz `OnboardingLayout.tsx` — progress bar + slot na children + nawigacja
2. Eksportuj z `components/layout/index.ts`

## 7. Kryteria akceptacji
- Progress bar poprawnie odzwierciedla bieżący krok
- Przycisk „Wstecz" nieaktywny na kroku 1
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run build` — ✓ 43 modules; ręczny test: onboarding wyświetla 3 kroki z paskiem postępu

---
*Status: [x] Zaimplementowany*
