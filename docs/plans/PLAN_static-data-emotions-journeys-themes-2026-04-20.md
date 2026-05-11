# Static Data – Emotions, Journeys, Themes - 2026-04-20

## 1. Cel
Stworzenie danych statycznych dla aplikacji Introsphere. Dane zawierają emocje, programy journey i motywy atmosfery – stanowią treść aplikacji niezależną od bazy danych.

## 2. Zakres
**W zakresie:**
- `src/data/emotions.ts` — 8 emocji głównych (L3) + 24 podspektrów (L2/L1)
- `src/data/journeys.ts` — 6 journey × 7 pytań = 42 pytania łącznie
- `src/data/themes.ts` — 8 motywów atmosfery

**Poza zakresem:**
- Dane dynamiczne z Supabase (personal entries, user progress)
- Tłumaczenia (i18n)

## 3. Wymagania funkcjonalne
- Emocje: każda z id, nazwy PL/EN, koloru, pozycji na kole, parentId
- Journeys: każdy z id, tytułu, opisu, ikony, tablicy 7 pytań
- Themes: każdy z id, nazwy, palety kolorów CSS

## 4. Wymagania niefunkcjonalne
- **Wydajność:** dane statyczne – importowane w bundle, zero network calls
- **Bezpieczeństwo:** brak danych wrażliwych
- **UX:** spójne nazwy PL/EN – używane w UI i filtrach

## 5. Kontekst techniczny
- **Komponenty:** EmotionWheel, JourneyCard, AtmospherePicker importują z `data/`
- **API:** brak – dane w bundlu
- **Dane:** tablice obiektów typowanych zgodnie z `src/types/`

## 6. Kroki implementacji
1. Utwórz `src/data/emotions.ts` — 8 L3 + 24 L2/L1 emocji z kolorami i pozycjami SVG
2. Utwórz `src/data/journeys.ts` — 6 journey z tablicami 7 pytań każdy
3. Utwórz `src/data/themes.ts` — 8 motywów z paletami CSS variables

## 7. Kryteria akceptacji
- Koło emocji renderuje 8 sektorów i 24 podspektry
- Lista journeys wyświetla 6 kart
- Picker motywów pokazuje 8 opcji
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak (dane statyczne)
- **Integracyjne:** `npm run build` — brak błędów; ręczna weryfikacja liczby elementów w UI

---
*Status: [x] Zaimplementowany*
