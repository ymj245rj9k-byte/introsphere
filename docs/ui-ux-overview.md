# Introsphere - UI/UX Overview

## Spis Treści
1. [Ogólna Filozofia Designu](#1-ogólna-filozofia-designu)
2. [Struktura Layoutu](#2-struktura-layoutu)

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

## 3. Nawigacja i Ikony

### 3.1 Sidebar (Desktop)

| Ikona | Funkcja | Label |
|-------|---------|-------|
| 🌸 / 💭 | Journeys | "Start Journey" |
| 📅 | Calendar | "Mood Calendar" |
| 📖 | History | "My Reflections" |
| ⚙️ | Settings | "Settings" |

### 3.2 Bottom Navigation (Mobile)

| Ikona | Funkcja |
|-------|---------|
| 🏠 | Home (Emotion Wheel) |
| 📅 | Calendar |
| 📖 | History |
| ⚙️ | Settings |

### 3.3 Header (Desktop)

| Ikona | Funkcja |
|-------|---------|
| ☀️ / 🌙 | Theme toggle |
| 👤 | Login / User profile |
| 🎨 | Atmosphere picker |

---

*Document version 1.0 | 2026-03-22*
