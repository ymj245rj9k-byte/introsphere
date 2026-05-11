# Home Page Quick Action Button - 2026-05-08

## 1. Cel
Dodanie przycisku szybkiej akcji „Quick Entry" na stronie głównej. Umożliwia użytkownikowi przejście bezpośrednio do formularza szybkiego wpisu bez przechodzenia przez pełne koło emocji.

## 2. Zakres
**W zakresie:**
- Nowy przycisk/link w siatce szybkich akcji na `Home.tsx` (ikona FileText, etykieta „Quick Entry")

**Poza zakresem:**
- Tworzenie strony/komponentu formularza (osobny plan: `PLAN_quick-entry-form-component`)
- Zapis wpisu do bazy (osobny plan: `PLAN_new-entry-data-layer`)
- Wyświetlanie wpisów w kalendarzu i historii

## 3. Wymagania funkcjonalne
- Przycisk „Quick Entry" widoczny w siatce akcji na `/home`
- Kliknięcie nawiguje do `/quick-entry`
- Ikona: `FileText` (lucide-react)

## 4. Wymagania niefunkcjonalne
- **Wydajność:** statyczny element UI, brak logiki
- **Bezpieczeństwo:** brak – przycisk tylko nawiguje
- **UX:** konsekwentny styl z innymi przyciskami w siatce akcji

## 5. Kontekst techniczny
- **Komponenty:** `Home.tsx` — siatka szybkich akcji
- **API:** brak
- **Dane:** brak

## 6. Kroki implementacji
1. W `Home.tsx` dodaj link/button z ikoną FileText i etykietą „Quick Entry" → `navigate('/quick-entry')`

## 7. Kryteria akceptacji
- Przycisk „Quick Entry" widoczny na stronie `/home`
- Kliknięcie nawiguje do `/quick-entry`
- Styl zgodny z pozostałymi przyciskami akcji
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run build` bez błędów; ręczny test: przycisk widoczny na Home, klik → `/quick-entry`

---
*Status: [x] Zaimplementowany*
