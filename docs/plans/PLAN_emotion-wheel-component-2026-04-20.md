# EmotionWheel Component - 2026-04-20

## 1. Cel
Stworzenie interaktywnego koła emocji – głównego elementu nawigacyjnego aplikacji. Użytkownik wybiera emocję klikając sektor, co inicjuje sesję refleksji.

## 2. Zakres
**W zakresie:**
- `src/components/emotion-wheel/EmotionWheel.tsx` — SVG wheel z 8 sektorami (L3 emotions)
- Kliknięcie sektora → otwarcie modalu EmotionDetails
- `src/components/emotion-wheel/EmotionDetails.tsx` — modal z wyborem podspektrum

**Poza zakresem:**
- Oddzielny `EmotionNode.tsx` — sektory renderowane inline w EmotionWheel
- `EmotionDropdown.tsx` — zastąpiony przez modal

## 3. Wymagania funkcjonalne
- Wyświetla 8 sektorów SVG z kolorami i nazwami emocji
- Kliknięcie sektora otwiera EmotionDetails modal
- Modal umożliwia wybór: pozostanie na L3 lub wybór L2/L1 (radio buttons)
- Po potwierdzeniu wywołuje `onSelect(emotion)` callback do rodzica

## 4. Wymagania niefunkcjonalne
- **Wydajność:** SVG renderowany statycznie, bez re-renderów przy hover
- **Bezpieczeństwo:** brak danych wrażliwych
- **UX:** czytelne etykiety sektorów, focus state dla nawigacji klawiaturą, responsywny rozmiar (`size` prop)

## 5. Kontekst techniczny
- **Komponenty:** używany przez `Session.tsx`; zawiera `EmotionDetails` jako child
- **API:** brak – dane z `data/emotions.ts`
- **Dane:** `getLevel3Emotions()`, `getSubspectrum()` z `data/emotions.ts`

## 6. Kroki implementacji
1. Utwórz `EmotionWheel.tsx` — SVG z 8 sektorami, click handler
2. Utwórz `EmotionDetails.tsx` — modal z checkbox L3 i radio buttons L2/L1
3. Zintegruj z `Session.tsx` — przekazanie `onSelect` callback
4. Eksportuj z `components/emotion-wheel/index.ts`

## 7. Kryteria akceptacji
- Koło wyświetla 8 sektorów z poprawnymi kolorami
- Kliknięcie sektora otwiera modal z podspektrami
- Wybór emocji + Continue → przekazanie obiektu emocji do rodzica
- Redirect do `/emotion-reflection` z emocją w `location.state`

## 8. Testy
- **Unit:** `EmotionWheel.test.tsx` — renderowanie 8 sektorów, click events
- **Integracyjne:** `npm run build` bez błędów; ręczny test: klik → modal → Continue → redirect

---
*Status: [x] Zaimplementowany*
