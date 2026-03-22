# Introsphere - Specyfikacja UI/UX

## Spis Treści
1. [Ogólna Filozofia Designu](#1-ogólna-filozofia-designu)
2. [Struktura Layoutu](#2-struktura-layoutu)
3. [System Motywów (Theme)](#3-system-motywów-theme)
4. [System Atmosfery (Skin)](#4-system-atmosfery-skin)
5. [Koło Emocji - Główny Interfejs](#5-koło-emocji---główny-interfejs)
6. [Arkusz Refleksji (Worksheet)](#6-arkusz-refleksji-worksheet)
7. [Kalendarz](#7-kalendarz)
8. [Nawigacja i Ikony](#8-nawigacja-i-ikony)
9. [Zachowania i Animacje](#9-zachowania-i-animacje)
10. [Dostępność (Accessibility)](#10-dostępność-accessibility)

---

## 1. Ogólna Filozofia Designu

### 1.1 Wizja
Introsphere to aplikacja do **samopoznania poprzez emocje**. Design ma być:
- **Zachęcający** - użytkownik chce wracać
- **Intuicyjny** - zero instrukcji, pełna intuicja
- **Estetyczny** - "aesthetically pleasing" w każdym detalu
- **Ciemny** - skupienie na wewnętrznych przeżyciach

### 1.2 Principle Design

| Zasada | Opis |
|--------|------|
| **Emocje pierwsze** | Każdy element wzmacnia połączenie z emocjami |
| **Minimalizm kognitywny** | Tylko niezbędne elementy, każdy ma sens |
| **Płynność** | Płynne przejścia między stanami |
| **Personalizacja** | Użytkownik czuje, że to *jego* przestrzeń |

### 1.3 Typography Base

```
Font Primary: "Inter" (Google Fonts) - dla treści
Font Display: "Playfair Display" - dla nagłówków emocji
Font Mono: "JetBrains Mono" - dla dat w kalendarzu

Scale:
- H1: 2.5rem / 700
- H2: 1.75rem / 600
- H3: 1.25rem / 600
- Body: 1rem / 400
- Small: 0.875rem / 400
```

---

## 2. Struktura Layoutu

### 2.1 Ogólna Struktura (Desktop)

```
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────┐                           ┌─────┐ ┌─────────┐ │
│  │          │                           │ ☀️  │ │ 👤     │ │
│  │ JOURNEYS │      EMOTION WHEEL       │ 🌙  │ │ Login  │ │
│  │  icon    │         (CENTER)          │     │ │ /User  │ │
│  │          │                           │     │ │        │ │
│  │ 📅 icon  │                           │     │ │ 🎨    │ │
│  │          │                           │     │ │Atmosph.│ │
│  └──────────┘                           └─────┘ └─────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Regiony Layoutu

| Region | Pozycja | Zawartość | Zachowanie |
|--------|---------|-----------|------------|
| **Sidebar (Left)** | Lewa krawędź, pełna wysokość | Przycisk Journeys, Ikona Kalendarza | Zawsze widoczny, zwija się na mobile |
| **Main Area** | Centrum | Koło emocji / Arkusz / Kalendarz | Główna przestrzeń robocza |
| **Header (Top-Right)** | Prawa góra | Theme toggle, Login/User, Atmosphere | Zawsze dostępny |

### 2.3 Responsive Breakpoints

```css
/* Mobile First */
--mobile: 0 - 639px
--tablet: 640px - 1023px
--desktop: 1024px+

/* Na mobile: sidebar staje się bottom nav */
@media (max-width: 639px) {
  .sidebar → bottom navigation bar
  .emotion-wheel → pełny ekran z gesture
}
```

---

## 3. System Motywów (Theme)

### 3.1 Tryb Jasny (Light Mode)

```css
/* Palette - White-Orange Theme */
--bg-primary: #FFF8F0;        /* Główne tło - kremowa biel */
--bg-secondary: #FFFFFF;     /* Karty, panele */
--bg-tertiary: #FFECD9;       /* Subtelne akcenty */

--text-primary: #2D2A26;       /* Główny tekst */
--text-secondary: #6B6560;    /* Drugorzędny tekst */
--text-muted: #A39E99;         /* Hinty, placeholders */

--accent-primary: #FF8C42;    /* Główny pomarańczowy */
--accent-secondary: #FFB074;  /* Jaśniejszy pomarańcz */
--accent-warm: #FFECD9;       /* Ciepły akcent */

--border-light: #F0E6DC;       /* Subtelne obramowania */
--shadow-soft: rgba(45, 42, 38, 0.08);
```

### 3.2 Tryb Ciemny (Dark Mode)

```css
/* Palette - Deep Night */
--bg-primary: #1A1918;         /* Główne tło - ciepła czerń */
--bg-secondary: #252322;      /* Karty, panele */
--bg-tertiary: #302D2B;       /* Subtelne akcenty */

--text-primary: #F5F2EE;       /* Główny tekst */
--text-secondary: #A8A29E;    /* Drugorzędny tekst */
--text-muted: #6B6560;        /* Hinty, placeholders */

--accent-primary: #FF9F5E;    /* Pomarańczowy - jaśniejszy dla kontrastu */
--accent-secondary: #FFB586;  /* Cieplejszy akcent */
--accent-deep: #3D3530;        /* Ciemny akcent */

--border-dark: #3D3835;        /* Subtelne obramowania */
--shadow-glow: rgba(255, 140, 66, 0.15);
```

### 3.3 Theme Toggle

```
Pozycja: Prawa górna, w pasku header
Ikona: Słońce (☀️) / Księżyc (🌙)

Zachowanie:
- Smooth transition: 0.3s ease-in-out
- Ikona rotate 180° przy przejściu
- Preferencja zapisana w localStorage
- Opcja "System" = follow system preference
```

---

## 4. System Atmosfery (Skin)

### 4.1 Definicja

**Atmosphere** = personalizacja wyglądu aplikacji poza trybem jasny/ciemny. Obejmuje:
- Kolorystykę elementów UI (akcenty)
- Czcionkę (font family)
- Zaokrąglenia (border radius)
- Intensywność cieni

### 4.2 Domyślne Atmosfery

| Atmosfera | Kolory | Font | Charakter |
|-----------|--------|------|-----------|
| **Clean Girl Aesthetic** | Beige, cream, soft neutrals, biała przestrzeń, rounded shapes | Sans-serif, clean | Spokojna, minimalistyczna |
| **Cottagecore** | Zielone, ciepłe brązy, kwiaty | Handwritten, serif | Slow life, naturalna |
| **Dark Academia** | Ciemny brąz, burgund, pergamin | Typewriter, serif | Intelektualna, poetycka |
| **Soft Girl Aesthetic** | Pastelowy róż, lawenda, błękit | Cute, rounded | Emocjonalna, wrażliwa |
| **Futuristic Femme** | Chrome, srebrne akcenty | Sleek, sans-serif | Tech-wellness, AI |

* Dodatkowe atmosfery (Premium): retro, vintage, pastel, cyberpunk (placeholder) *

### 4.3 Konfiguracja Atmosfery

```javascript
const atmospheres = {
  cleanGirl: {
    name: 'Clean Girl Aesthetic',
    colors: {
      bg: '#FAF8F5',
      bgSecondary: '#FFFFFF',
      accent: '#D4C5B5',
      text: '#2D2A26',
    },
    font: 'Inter',
    borderRadius: '24px',
    style: 'soft, minimal, rounded'
  },
  cottagecore: {
    name: 'Cottagecore',
    colors: {
      bg: '#F5F0E8',
      bgSecondary: '#FFFEF8',
      accent: '#8B9A6B',
      text: '#4A4036',
    },
    font: 'Caveat',
    borderRadius: '8px',
    style: 'nature, handwritten, organic'
  },
  darkAcademia: {
    name: 'Dark Academia',
    colors: {
      bg: '#1A1512',
      bgSecondary: '#2C2420',
      accent: '#6B4423',
      text: '#E8E0D5',
    },
    font: 'Courier Prime',
    borderRadius: '4px',
    style: 'introspective, vintage'
  },
  softGirl: {
    name: 'Soft Girl Aesthetic',
    colors: {
      bg: '#FDF4F8',
      bgSecondary: '#FFFFFF',
      accent: '#E8B4D9',
      text: '#4A3F47',
    },
    font: 'Nunito',
    borderRadius: '20px',
    style: 'cute, pastel, vulnerable'
  },
  futuristicFemme: {
    name: 'Futuristic Femme',
    colors: {
      bg: '#0A0A0F',
      bgSecondary: '#15151F',
      accent: '#C0C0C0',
      text: '#F0F0F5',
    },
    font: 'Inter',
    borderRadius: '12px',
    style: 'sleek, chrome, tech'
  }
};
```

### 4.4 UI Wyboru Atmosfery

```
Lokalizacja: Prawa góra, obok login/theme
Ikona: 🎨 (palette)

Po kliknięciu → Dropdown/Panel:
┌─────────────────────────────┐
│  🎨 Wybierz Atmosferę       │
├─────────────────────────────┤
│  🟠 Sunrise                 │
│  🔵 Ocean                   │
│  🟢 Forest                  │
│  🟣 Lavender                │
│  ⚫ Monochrome              │
│  🔴 Midnight               │
└─────────────────────────────┘

Zachowanie:
- Mini preview przy hover
- Klik = natychmiastowa zmiana
- Zapis w localStorage
- Tylko dla zalogowanych (Premium feature option)
```

---

## 5. Koło Emocji - Główny Interfejs

### 5.1 Wizualizacja

```
                    JOY (żółty)
                       ↑
                       │
    TRUST (zielony) ←─────→ FEAR (czerwony)
                       │
                       ↓
    SADNESS ←──────●──────→ ANGER
    (niebieski)    CENTER   (pomarańczowy)
                       │
                       ↓
    DISGUST ←──────────────→ SURPRISE
    (brązowy)                  (fioletowy)
```

### 5.2 Budowa Koła

```
Struktura:
- 8 głównych sektorów (primary emotions)
- Każdy sektor ma 3 podspektra (intensity levels)
- Łącznie 24 segmenty + center

Segment = {
  emotion: string,
  intensity: 1 | 2 | 3,
  color: string (from emotion-structure),
  angle: number (start, end)
}
```

### 5.3 Interakcje

| Akcja | Zachowanie |
|-------|------------|
| **Najazd (hover)** | Segment lekko się powiększa (scale 1.05), tooltip z nazwą emocji |
| **Kliknięcie w sektor** | Lista rozwijana emocji (podspektra) |
| **Kliknięcie w podspektrum** | Otwiera się Arkusz Refleksji |
| **Center click** | Show "How are you?" prompt |

### 5.4 Lista Rozwijana Emocji (Dropdown)

```
Po kliknięciu sektora → rozwija się panel:

┌────────────────────────────────────────┐
│  😊 JOY / Radość                       │
├────────────────────────────────────────┤
│  ┌────┐  Ecstasy (Ekstaza)             │
│  │ 💛│  - intensywna radość             │
│  └────┘                                │
│  ┌────┐  Joy (Radość)                   │
│  │ 🟡│  - standardowa radość            │
│  └────┘                                │
│  ┌────┐  Serenity (Spokój)             │
│  │ 💚│  - łagodna radość                │
│  └────┘                                │
│  ┌────┐  Love (Miłość)                 │
│  │ ❤️│  - radość z bliskości           │
│  └────┘                                │
└────────────────────────────────────────┘

Każdy element:
- Kolorowy kwadrat/koło (8px)
- Nazwa emocji
- Subtelny opis (opcjonalnie)
- Hover: podświetlenie
```

---

## 6. Arkusz Refleksji (Worksheet)

### 6.1 Struktura

```
┌─────────────────────────────────────────────────────────┐
│  ← Back                                    💾 Auto-save│
├─────────────────────────────────────────────────────────┤
│                                                         │
│     ┌─────────────────────────────────────────────┐    │
│     │         "PYTANIE..."                         │    │
│     │                                             │    │
│     │    ← poprzednie  [1/12]  następne →        │    │
│     └─────────────────────────────────────────────┘    │
│                                                         │
│     Emocja: 😊 Joy / Radość                            │
│                                                         │
│     ┌─────────────────────────────────────────────┐    │
│     │                                             │    │
│     │   [TEXTAREA - wpisz odpowiedź]             │    │
│     │                                             │    │
│     │   Min height: 200px                         │    │
│     │   Auto-expand                               │    │
│     │                                             │    │
│     └─────────────────────────────────────────────┘    │
│                                                         │
│              [💾 Zapisz]  lub  Auto-save indicator      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 6.2 Nagłówek z Pytaniem

```
Komponent: QuestionCard

Elementy:
1. Pytanie (duży tekst, centered)
2. Nawigacja: [<] [numer/np. 3/12] [>]
3. Kategoria emocji (mały badge)

Funkcjonalność:
- Strzałki = następne/poprzednie pytanie z bazy
- Losowanie: 🎲 przycisk = losuj nowe pytanie
- Indeks pokazuje pozycję w liście pytań tej emocji
- Transition: slide in/out
```

### 6.3 Obszar Tekstu

```
TextArea Component:

- Placeholder: "Your thoughts here..." (lokalizowane)
- Auto-resize (min 200px, max 60vh)
- Character count (opcjonalnie, pod spodem)
- Auto-save indicator: "✓ Zapisano" (po 2s bez pisania)
- Keyboard: Ctrl/Cmd + Enter = manual save

Styling:
- Border: none (clean look)
- Background: --bg-secondary
- Padding: 1.5rem
- Font: --font-body
- Line-height: 1.7
```

### 6.4 Zapisywanie

```
Mechanizm:

1. AUTO-SAVE:
   - Trigger: 2 sekundy po ostatnim keypress
   - API: POST /api/reflections
   - Feedback: "✓ Zapisano" (fade in/out, 2s)

2. MANUAL SAVE:
   - Button: "Zapisz" / "Save"
   - API: POST /api/reflections
   - Feedback: Button changes to "✓!" (green), then back

3. DANE ZAPISYWANE:
   {
     emotionId: string,
     questionId: string,
     answer: string,
     timestamp: ISO8601,
     atmosphere: string,
     theme: 'light' | 'dark'
   }
```

---

## 7. Kalendarz

### 7.1 Dostęp

```
Ikona: 📅 (calendar)
Lokalizacja: Lewy sidebar, pod Journeys

Zachowanie:
- Click = otwiera overlay / drawer z kalendarzem
- Overlay animuje się: slide in from left (300ms)
- Click outside / ESC = zamyka
```

### 7.2 Widok Kalendarza

```
┌────────────────────────────────────────────────────────────┐
│  ◀ Marzec 2026  ▶                        ✕ (close)       │
├────────────────────────────────────────────────────────────┤
│  Pn  Wt  Śr  Cz  Pt  So  Ni                                  │
│              1   2   3   4                                   │
│  5   6   7   8   9  10  11    ← daty                        │
│  12  13  14  15  16  17  18                                  │
│  19  20  21  22  23  24  25                                  │
│  26  27  28  29  30  31                                      │
├────────────────────────────────────────────────────────────┤
│  LEGENDA:                                                   │
│  🟡 Joy  🟢 Trust  🔴 Fear  🔵 Sadness  🟠 Anger  🟣 Disgust │
└────────────────────────────────────────────────────────────┘

Na każdym dniu z wpisem:
- Mały kolorowy kropka/kółko = kolor emocji
- Hover: tooltip z "X reflections"
- Click: otwiera dzień (szczegóły)
```

### 7.3 Widok Dnia (Day Detail)

```
Po kliknięciu w datę:

┌────────────────────────────────────────────────────────────┐
│  📅 22 marca 2026                                          │
│  Środa                                                     │
├────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🟡 Joy - "What makes you joyful?"                    │  │
│  │ "Spending time with family this weekend..."         │  │
│  │ ←→ (nawigacja między wpisami dnia)                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  + Dodaj nowy wpis                                          │
└────────────────────────────────────────────────────────────┘
```

### 7.4 Kolory w Kalendarzu

```
Mapping emocji na kolory (do użycia w kalendarzu):

Joy       → #F7DC6F (żółty)
Trust     → #82E0AA (zielony)
Fear      → #F1948A (czerwony jasny)
Sadness   → #85C1E9 (niebieski)
Disgust   → #D7BDE2 (fiolet jasny)
Anger     → #E59866 (pomarańczowy)
Surprise  → #FAD7A0 (kremowy)

Styling kropki:
- Size: 6px circle
- Position: bottom-center daty
- Gdy wiele emocji = stacked dots (max 3)
```

---

## 8. Nawigacja i Ikony

### 8.1 Lewy Sidebar

```
┌──────┐
│ 🧭  │  ← Journeys (przejścia/ścieżki)
│      │
│ Jour│  ← Label (opcjonalnie, zwija się)
├──────┤
│ 📅  │  ← Kalendarz
│      │
│ Cal │  ← Label
└──────┘

Style:
- Width: 60px (collapsed) / 200px (expanded)
- Hover: BG highlight
- Active: accent color left border
- Mobile: bottom bar (równe ikony)
```

### 8.2 Prawy Header

```
┌──────────────────────────────────────┐
│  [Theme Toggle]  [Atmosphere]  [👤] │
└──────────────────────────────────────┘

Stack (pionowo na desktop, poziomo mobile)

Login state:
- Not logged: "Zaloguj" button
- Logged: Avatar + dropdown (Profile, Settings, Logout)
```

### 8.3 Ikony (System)

```
Używamy: Lucide Icons (React) lub Heroicons

Mapping:
- Theme toggle: sun / moon
- Atmosphere: palette
- Journeys: compass
- Calendar: calendar-days
- Back: arrow-left
- Save: save / check
- Random: dice-5
- Previous: chevron-left
- Next: chevron-right
- Close: x
- User: user
- Settings: settings
```

---

## 9. Zachowania i Animacje

### 9.1 Global Transitions

```css
:root {
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
  --transition-slow: 500ms ease;
  
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
}
```

### 9.2 Specyficzne Animacje

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

### 9.3 Micro-interactions

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

## 10. Dostępność (Accessibility)

### 10.1 Wymagania

| Standard | Poziom |
|----------|--------|
| WCAG | 2.1 AA |
| Mobile-first | ✓ |
| Keyboard navigation | ✓ |
| Screen reader | ✓ |

### 10.2 Implementacja

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

### 10.3 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 11. Dane Techniczne (Dla Developera)

### 11.1 Stack Rekomendowany

```
Frontend:
- React 18+ (lub Vue 3 / Svelte)
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
```

### 11.2 Struktura Komponentów

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

---

## 12. Podsumowanie

### Kluczowe Zasady UX

1. **Emocje w centrum** - każdy element wzmacnia emocjonalne połączenie
2. **Zero friction** - użytkownik może zacząć w 3 kliknięcia
3. **Sofisticated simplicity** - prosty wygląd, bogate wnętrze
4. **Personal = Human** - atmosphere i personalizacja = poczucie własności
5. **Reflective design** - cisza, przestrzeń, skupienie

### Następne Kroki

- [ ] Mockup w Figma (opcjonalnie)
- [ ] Prototyp w kodzie (React/Vue)
- [ ] Testy z użytkownikami
- [ ] Iteracje na podstawie feedbacku

---

*Dokument wersja 1.0 | 2026-03-22*
