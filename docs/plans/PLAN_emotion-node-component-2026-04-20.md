# EmotionNode Component - 2026-04-20

## 1. Cel
Stworzenie atomowego komponentu węzła emocji na kole SVG. Reprezentuje pojedynczy sektor z kolorem i etykietą.

> **Uwaga:** Komponent ten nie jest używany w finalnej implementacji. Sektory są renderowane inline w `EmotionWheel.tsx`. Plan zachowany dla dokumentacji decyzji projektowej.

## 2. Zakres
**W zakresie:**
- `src/components/emotion-wheel/EmotionNode.tsx` — węzeł SVG z kolorem i efektem hover

**Poza zakresem:**
- Animowane przejścia
- Integracja z backendem

## 3. Wymagania funkcjonalne
- Renderuje ścieżkę SVG z kolorem emocji
- Obsługuje stan hover (podświetlenie)
- Wywołuje `onClick` przy kliknięciu

## 4. Wymagania niefunkcjonalne
- **Wydajność:** czysty SVG element, zero dodatkowych zależności
- **Bezpieczeństwo:** brak danych wrażliwych
- **UX:** widoczny stan hover, cursor pointer

## 5. Kontekst techniczny
- **Komponenty:** planowany jako child `EmotionWheel.tsx` (ostatecznie zintegrowany inline)
- **API:** brak
- **Dane:** props: `color`, `label`, `onClick`, `isHovered`

## 6. Kroki implementacji
1. Utwórz `EmotionNode.tsx` — props SVG path z kolorem i hover state

## 7. Kryteria akceptacji
- Renderuje sektor SVG z poprawnym kolorem
- Hover zmienia opacity/brightness sektora

## 8. Testy
- **Unit:** brak (komponent niezintegrowany z głównym flow)
- **Integracyjne:** `npm run build` bez błędów

---
*Status: [x] Zaimplementowany (komponent istnieje, sektory finalnie renderowane inline w EmotionWheel)*
