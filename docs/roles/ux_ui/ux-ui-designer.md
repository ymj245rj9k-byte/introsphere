# UX/UI Designer – Introsphere

## Zasady UX

1. **Speed to value** – od otwarcia do pierwszego wpisu < 2 minuty
2. **Prowadzenie za rękę** – żadnego "napisz cokolwiek", zawsze konkretne pytanie
3. **Progressive disclosure** – proste opcje najpierw, głębokość na żądanie
4. **Emotional resonance** – estetyka "aesthetic", nie korporacyjna
5. **Minimalizm** – max 2–3 kliknięcia do akcji

---

## Przepływy Użytkownika

### Główny flow: Sesja emocjonalna
```
Strona główna
  → /session (koło emocji)
    → klik sektora → EmotionDetails modal
      → wybór podspektrum (opcjonalne)
        → Continue → /emotion-reflection
          → pytanie + textarea
            → Zapisz → /home
```

### Flow: Guided Journey
```
/home → /journeys → /journey/:id
  → JourneyProgress (7 kroków)
    → Continue day N → /journey/:id/day/:N
      → pytanie + textarea → Zapisz
        → /journey/:id (postęp zaktualizowany)
```

### Flow: Quick Entry
```
/home → Quick Entry button
  → /quick-entry (textarea + Zapisz)
    → Zapisz → /home
```

### Flow: Rejestracja/Logowanie
```
/ (Landing) → /auth
  → Rejestracja lub Logowanie
    → /onboarding (3 kroki)
      → /home
```

### Flow: Przeglądanie historii
```
/home → /calendar (kolorowy kalendarz)
  → klik dnia → CalendarEntry dialog (szczegóły wpisu)
    → opcjonalnie: Usuń wpis → potwierdzenie

/home → /history (lista wpisów)
  → Filter button → wybór emocji lub journey
    → przefiltrowana lista
```

---

## Architektura Informacji

```
Nawigacja główna (MainLayout):
├── Home (hub)
├── Session (koło emocji)
├── Journeys (lista programów)
├── Calendar (kalendarz nastrojów)
├── History (lista wpisów)
└── Settings (konto + atmosfera)

Strony publiczne:
├── Landing (/)
├── How It Works (/how-it-works)
├── Intro (/intro)
└── Auth (/auth)
```

---

## Design System

### Motywy Atmosfery (8 tematów)

| ID | Nazwa | Charakter |
|----|-------|-----------|
| cream-calm | Cream Calm | Ciepły, pastelowy, spokojny |
| green-forest | Green Forest | Naturalny, zielony, ziemski |
| dark-ink | Dark Ink | Ciemny, elegancki, skupiony |
| soft-pink | Soft Pink | Różowy, miękki, delikatny |
| silver-tech | Silver Tech | Chłodny, minimalistyczny |
| solar-flare | Solar Flare | Ciepły, pomarańczowy, energetyczny |
| desert-rose | Desert Rose | Ziemisty, różowy, suchy |
| ocean-deep | Ocean Deep | Niebieski, głęboki, spokojny |

Motywy zaimplementowane jako CSS variables (`--color-background`, `--color-surface`, `--color-primary`, `--color-text`) w `src/index.css`. Zmiana przez `themeStore.atmosphere`.

### Kolory Emocji (8 L3)
Każda z 8 emocji L3 ma przypisany kolor SVG widoczny na kole emocji i w kalendarzu nastrojów. Kolory odzwierciedlają psychologiczne konotacje (np. radość = żółty, złość = czerwony).

### Komponenty UI (Shadcn base)
- `button.tsx` – primary, secondary, ghost, destructive
- `card.tsx` – kontener z zaokrąglonymi rogami i cieniem
- `dialog.tsx` – modal z overlay (używany przez CalendarEntry, EmotionDetails, ConfirmDialog)
- `input.tsx`, `textarea.tsx` – pola formularzy
- `icon-button.tsx` – przycisk tylko z ikoną + aria-label

---

## Zasady Dostępności

- Wszystkie buttony z ikonami mają `aria-label`
- Focus states widoczne dla wszystkich elementów interaktywnych
- Kontrast kolorów zgodny z WCAG 2.1 AA
- Nawigacja klawiaturą przez koło emocji (tab + enter)
- Dialog z focus trap (Shadcn dialog)

---

## Responsywność

- Mobile-first design
- Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`
- Koło emocji: prop `size` – responsywny (mniejsze na mobile)
- Nawigacja: hamburger menu na mobile (MainLayout)

---

## Onboarding (3 kroki)

| Krok | Treść |
|------|-------|
| 1 | Powitanie + wyjaśnienie czym jest Introsphere |
| 2 | Jak działa koło emocji (preview) |
| 3 | Wybór pierwszego journey lub start sesji |

Implementacja: `OnboardingLayout` z paskiem postępu + `Onboarding.tsx`.

---

## Znane Problemy UX (do rozwiązania)

- Quick entries nie są widoczne w kalendarzu i historii (feature w toku)
- Brak pustego stanu na stronie Journey gdy brak ukończonych dni
- Brak potwierdzenia wizualnego po zapisaniu wpisu (toast/snackbar)
