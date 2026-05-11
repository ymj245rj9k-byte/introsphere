# EmotionDetails Component - 2026-04-20

## 1. Cel
Stworzenie modalu szczegółów emocji wyświetlanego po wyborze sektora z koła. Pozwala użytkownikowi doprecyzować emocję (L3 → L2/L1) przed rozpoczęciem sesji.

## 2. Zakres
**W zakresie:**
- `src/components/emotion-wheel/EmotionDetails.tsx` — dialog z opisem emocji i wyborem podspektrum

**Poza zakresem:**
- Animowane przejścia (do rozważenia w przyszłości)
- Integracja z backendem (zapis – osobny plan)

## 3. Wymagania funkcjonalne
- Wyświetla nazwę i opis wybranej emocji L3
- Checkbox „Zostań przy L3" lub radio buttons dla podspektrów L2/L1
- Przycisk „Continue" przekazuje wybraną emocję do rodzica przez `onSelect`
- Przycisk zamknięcia wywołuje `onClose`

## 4. Wymagania niefunkcjonalne
- **Wydajność:** brak zewnętrznych zapytań
- **Bezpieczeństwo:** brak danych wrażliwych
- **UX:** modal dostępny klawiaturowo (focus trap), czytelny kontrast

## 5. Kontekst techniczny
- **Komponenty:** child `EmotionWheel.tsx`; używa `dialog.tsx` z Shadcn
- **API:** brak
- **Dane:** `getSubspectrum(emotionId)` z `data/emotions.ts`

## 6. Kroki implementacji
1. Utwórz `EmotionDetails.tsx` — props: `emotion`, `onSelect`, `onClose`
2. Dodaj listę podspektrów z radio buttons
3. Zaimplementuj logikę wyboru i przekazania przez `onSelect`

## 7. Kryteria akceptacji
- Modal otwiera się po kliknięciu sektora koła
- Poprawnie wyświetla podspektry dla każdej z 8 emocji L3
- Continue z zaznaczoną opcją wywołuje `onSelect(selectedEmotion)`
- Zamknięcie bez wyboru nie modyfikuje stanu rodzica

## 8. Testy
- **Unit:** brak (pokryty przez `EmotionWheel.test.tsx`)
- **Integracyjne:** `npm run build` bez błędów; ręczny test: wybór podspektrum → Continue → redirect

---
*Status: [x] Zaimplementowany*
