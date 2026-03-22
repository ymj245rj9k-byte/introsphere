# Introsphere - Animations, Accessibility & Tech

## Spis Treści
1. [Zachowania i Animacje](#1-zachowania-i-animacje)
2. [Dostępność (Accessibility)](#2-dostępność-accessibility)
3. [Dane Techniczne (Dla Developera)](#3-dane-techniczne-dla-developera)

---

## 1. Zachowania i Animacje

### 1.1 Globalne Transition

```css
:root {
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
  --transition-page: 400ms ease;

  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
}
```

### 1.2 Specyficzne Animacje

| Element | Animacja | Duration | Easing |
|---------|----------|----------|--------|
| Theme toggle | Icon rotate 180° | 300ms | ease |
| Atmosphere change | Colors fade | 400ms | ease |
| Emotion wheel hover | Scale 1.05 | 200ms | ease-out |
| Emotion selection | Wheel → dropdown slide | 300ms | expo-out |
| Worksheet open | Fade + slide up | 400ms | expo-out |
| Calendar overlay | Slide from left | 300ms | expo-out |
| Save indicator | Fade in/out | 200ms | ease |
| Question change | Slide left/right | 250ms | ease |

### 1.3 Micro-interactions

```
Button hover:
- Scale: 1.02
- Shadow: increase
- Transition: 150ms

Input focus:
- Border color: accent
- Subtle glow (box-shadow with accent at 20% opacity)

Loading states:
- Skeleton screens (shimmer effect)
- Pulsing dots for auto-save indicator
```

---

## 2. Dostępność (Accessibility)

### 2.1 Wymagania

| Standard | Poziom |
|----------|--------|
| WCAG | 2.1 AA |
| Mobile-first | ✓ |
| Keyboard navigation | ✓ |
| Screen reader | ✓ |

### 2.2 Implementacja

```html
<!-- Semantic HTML -->
<nav aria-label="Main navigation">...</nav>
<main>...</main>
<aside aria-label="Calendar">...</aside>

<!-- Focus states -->
:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

<!-- ARIA labels -->
<button aria-label="Toggle theme" aria-pressed="false">...</button>
<button aria-label="Previous question">...</button>

<!-- Keyboard shortcuts -->
- Tab: navigate between sections
- Enter/Space: activate buttons
- Escape: close modals/overlays
- Arrow keys: navigate calendar, questions
```

### 2.3 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 2.4 Kontrast Kolorów

```
Wymagania WCAG AA:
- Tekst na tle: minimum 4.5:1
- Duży tekst (18px+): minimum 3:1
- Elementy UI (ikony, buttony): minimum 3:1

Dark mode:
- bg-primary: #1A1918
- text-primary: #F5F2EE
- Kontrast: ~17:1 ✓

Light mode:
- bg-primary: #FFF8F0
- text-primary: #2D2A26
- Kontrast: ~14:1 ✓
```

---

## 3. Dane Techniczne (Dla Developera)

### 3.1 Stack Rekomendowany

```
Frontend:
- React 18+ (Vite)
- Tailwind CSS (dla utility-first styling)
- Framer Motion (dla animacji)
- Lucide React (ikony)

State:
- Zustand lub Jotai (prosty global state)
- React Query (server state)

Styling:
- CSS Variables dla theme/atmosphere
- Tailwind + custom config

Forms:
- React Hook Form
- Zod (validation)

Backend:
- Firebase (Auth + Firestore)
- Alternatywa: Supabase
```

### 3.2 Struktura Komponentów

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── MainArea.tsx
│   ├── emotion-wheel/
│   │   ├── EmotionWheel.tsx
│   │   ├── EmotionSegment.tsx
│   │   └── EmotionDropdown.tsx
│   ├── worksheet/
│   │   ├── Worksheet.tsx
│   │   ├── QuestionCard.tsx
│   │   └── AnswerInput.tsx
│   ├── calendar/
│   │   ├── Calendar.tsx
│   │   ├── CalendarDay.tsx
│   │   └── DayDetail.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── IconButton.tsx
│       ├── ThemeToggle.tsx
│       ├── AtmospherePicker.tsx
│       └── Modal.tsx
├── hooks/
│   ├── useTheme.ts
│   ├── useAtmosphere.ts
│   └── useAutoSave.ts
├── stores/
│   ├── appStore.ts
│   └── userStore.ts
└── styles/
    └── globals.css (CSS variables)
```

### 3.3 Ścieżki (Routing)

```
/                       → Emotion Wheel (Home)
/journeys               → Wybór journey
/journeys/:id           → Konkretny journey
/worksheet              → Arkusz refleksji
/worksheet/:sessionId   → Sesja z ID
/calendar               → Kalendarz nastrojów
/calendar/:date         → Szczegóły dnia
/history                → Historia wszystkich sesji
/settings               → Ustawienia użytkownika
/settings/atmosphere    → Wybór atmosfery
/settings/theme         → Wybór theme
/login                  → Logowanie
/register               → Rejestracja
```

### 3.4 API Endpoints (Firebase)

```
POST /api/reflections
  - Tworzenie nowej refleksji
  - Body: { emotionId, questionId, answer, atmosphere, theme }

GET /api/reflections
  - Pobranie wszystkich refleksji użytkownika

GET /api/reflections/:id
  - Pobranie pojedynczej refleksji

PUT /api/reflections/:id
  - Aktualizacja refleksji

DELETE /api/reflections/:id
  - Usunięcie refleksji

GET /api/calendar/:year/:month
  - Pobranie wpisów kalendarzowych dla miesiąca

POST /api/journey/start
  - Rozpoczęcie nowego journey

POST /api/journey/:id/progress
  - Zapis postępu w journey
```

### 3.5 Struktura Bazy Danych (Firebase Firestore)

```
collections:
  - users/
    - {userId}/
      - profile: { email, displayName, createdAt }
      - settings: { theme, atmosphere, language }
      - reflections/
        - {reflectionId}: { emotionId, questionId, answer, createdAt }
      - journeys/
        - {journeyId}: { journeyType, currentDay, status, startedAt }
      - calendar/
        - {date}: { dominantEmotion, entries[] }
```

### 3.6 Environment Variables

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## 4. Podsumowanie

### Kluczowe Zasady UX

1. **Emocje w centrum** - każdy element wzmacnia emocjonalne połączenie
2. **Zero friction** - użytkownik może zacząć w 3 kliknięcia
3. **Sofisticated simplicity** - prosty wygląd, bogate wnętrze
4. **Personal = Human** - atmosphere i personalizacja = poczucie własności
5. **Reflective design** - cisza, przestrzeń, skupienie

### Następne Kroki

- [ ] Mockup w Figma (opcjonalnie)
- [ ] Prototyp w kodzie (React/Vite)
- [ ] Testy z użytkownikami
- [ ] Iteracje na podstawie feedbacku

---

*Document version 1.0 | 2026-03-22*
