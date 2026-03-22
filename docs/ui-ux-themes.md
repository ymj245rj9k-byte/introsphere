# Introsphere - UI/UX Themes & Atmosphere

## Spis Treści
1. [System Motywów (Theme)](#1-system-motywów-theme)
2. [System Atmosfery (Skin)](#2-system-atmosfery-skin)

---

## 1. System Motywów (Theme)

### 1.1 Tryb Jasny (Light Mode)

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

### 1.2 Tryb Ciemny (Dark Mode)

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

### 1.3 Theme Toggle

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

## 2. System Atmosfery (Skin)

### 2.1 Definicja

**Atmosphere** = personalizacja wyglądu aplikacji poza trybem jasny/ciemny. Obejmuje:
- Kolorystykę elementów UI (akcenty)
- Czcionkę (font family)
- Zaokrąglenia (border radius)
- Intensywność cieni

### 2.2 Domyślne Atmosfery

| Atmosfera | Kolory | Font | Charakter |
|-----------|--------|------|-----------|
| **Clean Girl Aesthetic** | Beige, cream, soft neutrals, biała przestrzeń, rounded shapes | Sans-serif, clean | Spokojna, minimalistyczna |
| **Cottagecore** | Zielone, ciepłe brązy, kwiaty | Handwritten, serif | Slow life, naturalna |
| **Dark Academia** | Ciemny brąz, burgund, pergamin | Typewriter, serif | Intelektualna, poetycka |
| **Soft Girl Aesthetic** | Pastelowy róż, lawenda, błękit | Cute, rounded | Emocjonalna, wrażliwa |
| **Futuristic Femme** | Chrome, srebrne akcenty | Sleek, sans-serif | Tech-wellness, AI |

* Dodatkowe atmosfery (Premium): retro, vintage, pastel, cyberpunk (placeholder) *

### 2.3 Konfiguracja Atmosfery

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

### 2.4 UI Wyboru Atmosfery

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

*Document version 1.0 | 2026-03-22*
