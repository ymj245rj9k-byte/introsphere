# TypeScript Types - 2026-04-20

## 1. Cel
Zdefiniowanie wspólnych typów TypeScript dla całej aplikacji Introsphere. Typy stanowią kontrakt między warstwami UI, logiki i danych – zapewniają type safety i czytelność kodu.

## 2. Zakres
**W zakresie:**
- `src/types/emotion.ts` — Emotion, EmotionSubspectrum, AtmosphereTheme
- `src/types/journey.ts` — Journey, JourneyDay, UserJourneyProgress
- `src/types/question.ts` — Question
- `src/types/reflection.ts` — UserResponse
- `src/types/user.ts` — User
- `src/types/index.ts` — barrel export

**Poza zakresem:**
- Typy bazy danych Supabase (osobny plik `types/database.ts`)
- Generowanie typów automatycznie z Supabase CLI

## 3. Wymagania funkcjonalne
- Wszystkie interfejsy eksportowane z `index.ts`
- Typy odzwierciedlają strukturę danych statycznych i DB
- Brak `any` – strict TypeScript

## 4. Wymagania niefunkcjonalne
- **Wydajność:** Tylko typy – zero runtime overhead
- **Bezpieczeństwo:** strict mode, brak implicit any
- **UX:** Czytelne nazwy typów wspierające IntelliSense

## 5. Kontekst techniczny
- **Komponenty:** wszystkie komponenty importują typy z `src/types/`
- **API:** brak – dane statyczne
- **Dane:** `data/emotions.ts`, `data/journeys.ts`, `data/themes.ts` używają tych typów

## 6. Kroki implementacji
1. Utwórz `src/types/emotion.ts` — Emotion, EmotionSubspectrum, AtmosphereTheme
2. Utwórz `src/types/journey.ts` — Journey, JourneyDay, UserJourneyProgress
3. Utwórz `src/types/question.ts` — Question
4. Utwórz `src/types/reflection.ts` — UserResponse
5. Utwórz `src/types/user.ts` — User
6. Utwórz `src/types/index.ts` — barrel export wszystkich typów

## 7. Kryteria akceptacji
- `npm run build` kończy się bez błędów TypeScript
- Wszystkie typy dostępne przez `import { X } from '@/types'`
- Brak użycia `any` w plikach typów

## 8. Testy
- **Unit:** brak (typy są kompilowane, nie testowane jednostkowo)
- **Integracyjne:** `npx tsc --noEmit` — zero błędów typowania w całym projekcie

---
*Status: [x] Zaimplementowany*
