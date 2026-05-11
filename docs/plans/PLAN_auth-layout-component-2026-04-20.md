# AuthLayout Component - 2026-04-20

## 1. Cel
Stworzenie layoutu dla stron autoryzacji (logowanie, rejestracja). Zapewnia spójny wygląd z wycentrowaną kartą i logo.

## 2. Zakres
**W zakresie:**
- `src/components/layout/AuthLayout.tsx` — centered card layout z logo, title, children

**Poza zakresem:**
- Logika autoryzacji (osobny plan authStore / Auth page)
- Animacje przejść między krokami

## 3. Wymagania funkcjonalne
- Wyświetla header z logo aplikacji
- Centralnie umieszczona karta z `children`
- Props: `title` (opcjonalny nagłówek karty), `children`

## 4. Wymagania niefunkcjonalne
- **Wydajność:** czysty komponent layoutu, brak logiki
- **Bezpieczeństwo:** brak danych wrażliwych
- **UX:** responsywny, wyśrodkowany na wszystkich ekranach

## 5. Kontekst techniczny
- **Komponenty:** używany przez `Auth.tsx`; używa `card.tsx` z Shadcn
- **API:** brak
- **Dane:** brak stanu

## 6. Kroki implementacji
1. Utwórz `AuthLayout.tsx` — struktura: header z logo, `<main>` z kartą, optional footer
2. Eksportuj z `components/layout/index.ts`

## 7. Kryteria akceptacji
- Strona `/auth` renderuje layout z kartą i logo
- Komponent akceptuje `children` i `title`
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run build` — ✓ 43 modules; ręczny test: `/auth` wyświetla poprawny layout

---
*Status: [x] Zaimplementowany*
