# EmptyState Component - 2026-04-20

## 1. Cel
Stworzenie komponentu pustego stanu używanego gdy brak danych do wyświetlenia (np. brak wpisów w historii, brak journey w toku).

## 2. Zakres
**W zakresie:**
- `src/components/common/EmptyState.tsx` — props: `icon`, `title`, `description`, `action`

**Poza zakresem:**
- Specifyczne empty states per widok (obsługiwane inline w komponentach)

## 3. Wymagania funkcjonalne
- Wyświetla ikonę, tytuł, opcjonalny opis i opcjonalny przycisk akcji
- Props: `icon: ReactNode`, `title: string`, `description?: string`, `action?: ReactNode`

## 4. Wymagania niefunkcjonalne
- **Wydajność:** czysty komponent presentacyjny
- **Bezpieczeństwo:** brak danych wrażliwych
- **UX:** pomocny komunikat kierujący użytkownika do działania

## 5. Kontekst techniczny
- **Komponenty:** używany przez `History.tsx`, `Calendar.tsx`, `Journeys.tsx`
- **API:** brak
- **Dane:** brak stanu

## 6. Kroki implementacji
1. Utwórz `EmptyState.tsx` — layout: ikona + tytuł + opis + slot na akcję
2. Eksportuj z `components/common/index.ts`

## 7. Kryteria akceptacji
- Komponent renderuje się poprawnie z każdą kombinacją props (z/bez description, z/bez action)
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run build` — ✓ 43 modules; ręczny test: empty state widoczny na stronach bez danych

---
*Status: [x] Zaimplementowany*
