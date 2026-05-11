# Introsphere - UI/UX Consolidated

## Spis Treści

1. [Ogólna Filozofia Designu](#1-ogólna-filozofia-designu)
2. [Struktura Layoutu](#2-struuktura-layoutu)
3. [Koło Emocji - Główny Interfejs](#3-koło-emocji---główny-interfejs)
4. [Arkusz Refleksji (Worksheet)](#4-arkusz-refleksji-worksheet)
5. [Kalendarz i Historia](#5-kalendarz-i-historia)
6. [System Motywów i Atmosfery](#6-system-motywów-i-atmosfery)
7. [Animacje i Dostępność](#7-animacje-i-dostępność)
8. [Dane Techniczne](#8-dane-techniczne)

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

Aktualna implementacja **nie ma oddzielnych Sidebar/Header komponentów**. Nawigacja jest wbudowana w strony:

- **MainLayout** (components/layout/MainLayout.tsx) — zawiera top navigation bar (logo + linki do Home, Calendar, History, Settings) oraz outlet dla page content.
- **Bottom navigation** — nie zaimplementowane (mobile nav brak).
- **Sidebar (Left)** — nie zaimplementowany jako osobny komponent.
- **Header (Top-Right)** — nie zaimplementowany jako osobny komponent; theme toggle znajduje się w Settings page.

### 2.2 Komponenty Layoutu Istniejące

| Komponent | Opis |
|-----------|------|
| `MainLayout.tsx` | Layout wrapper z nawigacją górną |
| `AuthLayout.tsx` | Layout dla strony logowania/rejestracji |
| `OnboardingLayout.tsx` | Layout dla procesu onboardingu |
| `ProtectedRoute.tsx` | Wrapper ochrony tras dla zalogowanych |

---

## 3. Koło Emocji - Główny Interfejs

### 3.1 Budowa Koła — aktualna implementacja

Struktura (EmotionWheel.tsx + EmotionDetails.tsx):
- 8 Primary (L3) emocji jako sektory SVG (45° każdy) – renderowane w EmotionWheel.tsx
- Kliknięcie w sektor → otwiera **modal (overlay)** EmotionDetails z opcjami:
  • Checkbox "Zostań na poziomie [L3]" – wybiera główną emocję
  • Radio buttons dla podspektrów (L2/L1) – wybór konkretnego wariantu
- Po wyborze → przekierowanie do /emotion-reflection z emotion w location.state

**Różnice vs. oryginalny plan UX:**
- Brak EmotionNode.tsx (wszystko w EmotionWheel.tsx)
- Brak EmotionDropdown.tsx – zastąpione przez modal EmotionDetails
- Nie ma "listy rozwijanej z checkboxami/radio" – użyto modal z radio/checkbox

**Struktura segmentów:**
- 8 głównych sektorów (L3)
- Każdy sektor ma 2–3 podspektra (L2/L1) – razem 24 warianty
- Segment: { emotion, intensity, color, angle }

### 3.3 Interakcje

| Akcja | Zachowanie |
|-------|------------|
| **Najazd (hover)** | Segment lekko się powiększa (scale 1.05), tooltip z nazwą emocji |
| **Kliknięcie w sektor** | Modal z wyborem emocji (podspektra + opcja "Zostań na tym poziomie") |
| **Kliknięcie w podspektrum** | Otwiera się Arkusz Refleksji z pytaniami do wybranego podspektra |
| **Kliknięcie "Zostań na tym poziomie"** | Otwiera się Arkusz Refleksji z pytaniami do głównej emocji |
| **Center click** | Show "How are you?" prompt |

### 3.4 Logika Wyboru Pytań

Po wyborze sektora (np. JOY), użytkownik widzi listę:
- Opcja: **"Zostań na poziomie [emocji]"** → wyświetla pytania z głównej kategorii (np. JOY)
- Lista podspektów → po wybraniu wyświetla pytania do tego podspektu

**Przykłady przepływu:**
- JOY → "Zostań na poziomie Radości" → Pytania z sekcji JOY (główne)
- JOY → Serenity → Pytania z podspektum Serenity
- JOY → Ecstasy → Pytania z podspektum Ecstasy
- ANGER → "Zostań na poziomie Złości" → Główne pytania ANGER

### 3.5 Okno Wyboru Emocji (Modal)

Po kliknięciu sektora pojawia się modalne okno (EmotionDetails) z listą opcji:

```
┌────────────────────────────────────────┐
│  😊 JOY / Radość                       │
├────────────────────────────────────────┤
│  ☐ Zostań na poziomie Radości         │
│  ─────────────────────────────────────│
│  ○ Serenity (Spokój)     [●] Selected │
│  ○ Joy (Radość)           [ ]          │
│  ○ Ecstasy (Ekstaza)     [ ]          │
│  ○ Love (Miłość)         [ ]          │
│                                        │
│           [ Continue ]                 │
└────────────────────────────────────────┘
```

- **Checkbox** "Zostań na poziomie [L3]" – wybiera główną emocję.
- **Radio buttons** dla podspektrów – wybór L2/L1.
- Kolorowe kropki/ikony przy opcjach.
- Przycisk "Continue" potwierdza i przechodzi do strony refleksji.


---

## 4. Arkusz Refleksji (EmotionReflection)

### 4.1 Struktura — aktualna implementacja

```
Strona: /emotion-reflection (EmotionReflection.tsx)

Przepływ:
1. Użytkownik wybiera emocję z koła (/session) → przekierowanie do /emotion-reflection z emotionId w location.state
2. Na /emotion-reflection:
   - emotionId pobierany z location.state
   - Pytania są hardcoded w pliku (3 na emocję, 48 total dla 16 emocji L2/L1)
   - Brak użycia data/questions.ts (że są tylko 10 ogólnych pytań)
   - UI: pytanie + textarea + przycisk "Dalej" → zapisuje do calendar_entries

Komponenty:
- EmotionReflection.tsx (page) — zawiera całą logikę refleksji
- Brak osobnych: Worksheet.tsx, QuestionCard.tsx, AnswerInput.tsx
```

**Różnice vs. oryginalny plan UX:**
- Nie ma osobnego komponentu `Worksheet`
- Pytania nie pochodzą z `data/questions.ts` — są hardcoded w `EmotionReflection.tsx`
- Brak auto-save (tylko manual save)
- Brak losowania pytań (sequential)
- Brak nawigacji między pytaniami (tylko jedno pytanie na sesję)

---

## 5. Kalendarz i Historia

### 5.1 Kalendarz Nastrojów — aktualna implementacja

**Dostęp**
```
Ikona: 📅 (calendar)
Lokalizacja: Górna nawigacja w MainLayout (po prostu link "/calendar")
Zachowanie: Click = przejście na pełną stronę Calendar (nie overlay/drawer)
```

**Widok Kalendarza** — implementacja w MoodCalendar.tsx:
- Grid 7 kolumn (Pon–Niedz)
- Dni z wpisami mają kropkę w kolorze emocji
- Kliknięcie w dzień → przejście na `/calendar?date=YYYY-MM-DD` ( filtr w Calendar page, nie drawer)
- **Drawer/Day Detail nie istnieje** — zamiast tego pełna strona `/journey/:id/day/:dayNumber` dla journey days

**Widok Dnia (Journey Day)**
```
Route: /journey/:id/day/:dayNumber (DayView.tsx — pełna strona)
Nie jest to drawer nałożony na kalendarz.
```

**Różnice vs. planie UX:**
- Brak overlay/drawer dla kalendarza — to osobna strona
- Brak "Day Detail drawer" z wpisami — zamiast tego:
  - Journey days: pełna strona DayView.tsx
  - Mood entries: pokazywane w Calendar page po kliknięciu daty (expandowanie)
Ikona: 📅 (calendar)
Lokalizacja: Górna nawigacja w MainLayout (link "/calendar")
Zachowanie:
- Click = przejście na pełną stronę Calendar (nie overlay/drawer)
- Kalendarz wyświetla siatkę 7 kolumn × 6 wierszy, kropki w kolorze emocji
- Kliknięcie w dzień = przejście na `/calendar?date=...` z wpisami dnia
```

**Widok Kalendarza**
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

**Widok Dnia (Day Detail)**
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

**Interakcje Kalendarza**

| Akcja | Zachowanie |
|-------|------------|
| **Hover na dzień** | Tooltip z liczbą wpisów |
| **Kliknięcie w dzień** | Przechodzi na stronę `/calendar?date=YYYY-MM-DD` z rozszerzoną listą wpisów dla tego dnia |
| **Nawigacja miesiąc** | Strzałki ← → zmieniają miesiąc |
| **Swipe (mobile)** | Przesuwanie między miesiącami |

**Pusta Stan Kalendarza**
```
Jeśli brak wpisów w danym miesiącu:

┌─────────────────────────────────────────┐
│          🎯 Pierwsze kroki              │
├─────────────────────────────────────────┤
│  Twoja historia nastrojów pojawi się   │
│  tutaj po ukończeniu pierwszej sesji.  │
│                                         │
│  [Rozpocznij sesję →]                   │
└─────────────────────────────────────────┘
```

### 5.2 Historia Sesji

**Dostęp**
```
Ikona: 📖 (history)
Lokalizacja: Górna nawigacja w MainLayout (link "/history")
Zachowanie:
- Click = przejście na pełną stronę History z listą wszystkich wpisów
- Wpisy pogrupowane według daty (Today, Yesterday, This week, Older)
- Każdy wpis pokazuje emocję, podgląd tekstu, timestamp, ewentualnie journey info
```

**Widok Listy Sesji**
```
┌─────────────────────────────────────────────────┐
│  📖 Moje Refleksje                    [Filtr] │
├─────────────────────────────────────────────────┤
│                                                 │
│  Dzisiaj                                        │
│  ┌───────────────────────────────────────────┐ │
│  │ 🟡 Joy - "What makes you joyful?"        │ │
│  │ "Spending time with family..."            │ │
│  │ 10:30                                     │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  Wczoraj                                        │
│  ┌───────────────────────────────────────────┐ │
│  │ 🔵 Sadness - "What are you grieving?"    │ │
│  │ "Losing my job was hard but..."           │ │
│  │ 15:45                                     │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  ─────────────────────────────────────────     │
│                                                 │
│  Ten tydzień                                    │
│  ┌───────────────────────────────────────────┐ │
│  │ 🟠 Anger - "What boundary was crossed?"  │ │
│  │ "At work, my manager..."                  │ │
│  │ Poniedziałek, 9:00                       │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

**Szczegóły Wpisu**
```
Po kliknięciu w wpis:

┌─────────────────────────────────────────────────┐
│  ← Powrót                                       │
├─────────────────────────────────────────────────┤
│                                                 │
│  🟡 Joy                                         │
│                                                 │
│  "What makes you joyful?"                       │
│                                                 │
│  ───────────────────────────────────────────    │
│                                                 │
│  Spending time with family this weekend        │
│  made me realize how much I value these       │
│  simple moments. My sister and I talked         │
│  for hours about our childhood...              │
│                                                 │
│  ───────────────────────────────────────────    │
│                                                 │
│  📅 22 marca 2026, 10:30                       │
│  📁 Journey: Wewnętrzne Dziecko (Dzień 3)      │
│                                                 │
│  [✏️ Edytuj]  [🗑️ Usuń]                        │
└─────────────────────────────────────────────────┘
```

### 5.3 Journeys - Wygląd Listy

**Ekran Wyboru Journey**
```
┌─────────────────────────────────────────────────┐
│  Wybierz Journey                                │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │  🌸 Wewnętrzne Dziecko                    │  │
│  │  A week of gentle return to yourself    │  │
│  │  7 dni • 0/7 ukończonych                │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │  🚧 Granice                               │  │
│  │  Where do I end and someone begins?     │  │
│  │  7 dni • 3/7 ukończonych                │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │  ⚡ Energia                               │  │
│  │  What fuels me and what drains me?       │  │
│  │  7 dni • nie rozpoczęty                  │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

**Postęp w Journey**
```
Ekran po wybraniu journey:

┌─────────────────────────────────────────────────┐
│  ← Wróć            🌸 Wewnętrzne Dziecko       │
├─────────────────────────────────────────────────┤
│                                                 │
│  📅 Dzień 3 z 7                                │
│                                                 │
│  ─────────────────────────────────────────     │
│                                                 │
│  Postęp:                                        │
│  [✓] [✓] [○] [○] [○] [○] [○]                  │
│   1   2   3   4   5   6   7                   │
│                                                 │
│  ───────────────────────────────────────────    │
│                                                 │
│  Pytanie na dziś:                              │
│                                                 │
│  "What entertained you endlessly before       │
│  you learned you needed to be 'productive'?   │
│  When did you last do it?"                    │
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │                                           │  │
│  │   [TEXTAREA - wpisz odpowiedź]           │  │
│  │                                           │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│              [Odpowiedz →]                     │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 6. System Motywów i Atmosfery

### 6.1 System Motywów (Theme) — aktualna implementacja

**Theme** = tryb jasny/ciemny.

**Theme Toggle**
```
Pozycja: Settings page (nie w Header)
Zachowanie:
- Toggle switch: Light / Dark
- Smooth transition: 0.3s ease-in-out
- Zapis w localStorage (themeStore.isDark)
- Default: light mode (isDark: false)
```

**Implementacja:**

```typescript
// stores/themeStore.ts
interface ThemeStore {
  atmosphere: AtmosphereType;   // np. 'cream-calm'
  isDark: boolean;              // false = light, true = dark
  setAtmosphere: (atmosphere) => void;
  setIsDark: (isDark) => void;
}
```

**Różnice vs. planie UX:**
- Brak osobnego `ThemeToggle.tsx` komponentu
- Brak theme toggle w Header (Header nie istnieje)
- Nie ma opcji "System" (follow system preference) — tylko binary Light/Dark
- W technical.md błędnie podano `theme: 'light' | 'dark'` — właściwie `isDark: boolean`

```

### 6.2 System Atmosfery (Skin)

**Definicja**
**Atmosphere** = personalizacja wyglądu aplikacji poza trybem jasny/ciemny. Obejmuje:
- Kolorystykę elementów UI (akcenty)
- Czcionkę (font family)
- Zaokrąglenia (border radius)
- Intensywność cieni

### 6.2 System Atmosfery (Skin) — aktualnie zaimplementowane

**Definicja**
Atmosphere = personalizacja wyglądu aplikacji (kolorystyka, fonty, border-radius, cienie).

**Dostępne Atmosfery** (8 total, z `data/themes.ts`):

| ID | Nazwa | Paleta | Status |
|----|-------|--------|--------|
| `cream-calm` | Cream Calm | Kremowy, beż, biel | ✓ MVP |
| `green-forest` | Green Forest | Mech, szałwia, brąz | ✓ MVP |
| `dark-ink` | Dark Ink | Granat, pergamin, złoto | ✓ MVP |
| `soft-pink` | Soft Pink | Pudrowy róż, mglisty błękit, lawenda | ✓ MVP |
| `silver-tech` | Silver Tech | Grafit, srebro, turkus | ✓ MVP |
| `solar-flare` | Solar Flare | Pomarańcz, żółty, czerwień (intensywny) | ⚡ Stretch |
| `desert-rose` | Desert Rose | Terakota, piasek, brudny róż, kakao | ⚡ Stretch |
| `ocean-deep` | Ocean Deep | Granat, morska zieleń, stalowy błękit, turkus | ⚡ Stretch |

**Nieimplementowane (z dokumentacji UX):**
- `vintage-noir` — nie ma w kodzie

**Implementacja:**
- CSS custom properties w `index.css` z klasami `.atmosphere-{id}`
- Wybór w Settings page (nie osobny picker w header)
- Brak `AtmospherePicker.tsx` jako osobny komponent

**Implementacja**

> **Źródło prawdy:** Wszystkie kolory i style atmosfer są zdefiniowane w `index.css` jako CSS custom properties.
>
> Każdy atmosfera ma klasę `.atmosphere-{nazwa}` z wariantami dla trybu jasnego i ciemnego (`.dark.atmosphere-{nazwa}`).
>
> **Przykład użycia:**
> ```css
> .atmosphere-cream-calm {
>   --atmosphere-bg: #FAF8F5;
>   --atmosphere-accent: #D4C5B5;
>   --atmosphere-font: 'Inter', sans-serif;
>   --atmosphere-radius: 24px;
> }
> ```
>
> **Dostępne atmosfery:** Cream Calm, Green Forest, Dark Ink, Soft Pink, Silver Tech, Solar Flare, Desert Rose, Ocean Deep

**UI Wyboru Atmosfery**
```
Lokalizacja: Settings page → "Atmosphere" section (nie w Header)
Brak osobnego AtmospherePicker.tsx — to prosty select/button group w Settings.

Zachowanie:
- Klik = natychmiastowa zmiana (apply)
- Zapis w localStorage (themeStore.atmosphere)
- Dla wszystkich użytkowników (free i premium) — wszystkie 8 atmosfer dostępne
```

---

## 7. Animacje i Dostępność

### 7.1 Globalne Transition

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

### 7.2 Specyficzne Animacje

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

### 7.3 Micro-interactions

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

### 7.4 Dostępność (Accessibility)

**Wymagania**

| Standard | Poziom |
|----------|--------|
| WCAG | 2.1 AA |
| Mobile-first | ✓ |
| Keyboard navigation | ✓ |
| Screen reader | ✓ |

**Implementacja**

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

**Reduced Motion**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Kontrast Kolorów**

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

## 8. Dane Techniczne

### 8.1 Stack Rekomendowany

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
- Supabase (Auth + PostgreSQL)
- Alternatywa: Firebase
```

### 8.2 Struktura Komponentów — aktualna implementacja

```
src/components/
├── layout/
│   ├── MainLayout.tsx           ← top navigation bar + outlet
│   ├── AuthLayout.tsx
│   ├── OnboardingLayout.tsx
│   └── ProtectedRoute.tsx
├── emotion-wheel/
│   ├── EmotionWheel.tsx         ← SVG sectors, click → modal
│   └── EmotionDetails.tsx       ← emotion info tooltip/popover
├── journey/
│   ├── JourneyCard.tsx          ← journey list item
│   ├── JourneyProgress.tsx      ← progress indicator (7 days)
│   └── DayView.tsx              ← full page: question + textarea + submit
├── calendar/
│   ├── MoodCalendar.tsx         ← monthly grid, day dots
│   └── CalendarEntry.tsx       ← entry preview (inline)
└── common/
    ├── LoadingSpinner.tsx
    └── EmptyState.tsx

src/pages/
├── Landing.tsx
├── Intro.tsx
├── HowItWorks.tsx
├── Auth.tsx
├── Onboarding.tsx
├── Home.tsx
├── Journeys.tsx
├── Journey.tsx            ← journey overview + continue button
├── DayView.tsx            ← day detail (full page)
├── Session.tsx            ← emotion wheel only
├── EmotionReflection.tsx  ← answer question (emotion-specific)
├── QuickEntry.tsx         ← quick mood logging
├── Calendar.tsx           ← calendar view
├── History.tsx            ← list of entries
└── Settings.tsx           ← theme/atmosphere toggle

src/hooks/
├── useAuth.ts
├── useCalendar.ts
├── useHomeStats.ts
└── useHistory.ts

src/stores/
├── authStore.ts
├── themeStore.ts
├── journeyStore.ts         ← localStorage persist (completedDays)
└── sessionStore.ts        ← entry deletion counter only
```

**Komponenty NIEZIMPLEMENTOWANE (z oryginalnego UX planu):**
- `Sidebar.tsx` — nie istnieje, nawigacja w `MainLayout.tsx`
- `Header.tsx` — nie istnieje
- `EmotionNode.tsx` — nie istnieje (sektory w `EmotionWheel.tsx`)
- `EmotionSegment.tsx` — nie istnieje
- `EmotionDropdown.tsx` — nie istnieje
- `Worksheet.tsx` — zastąpione przez `EmotionReflection.tsx`
- `QuestionCard.tsx` — nie istnieje
- `AnswerInput.tsx` — nie istnieje
- `CalendarDay.tsx` — nie istnieje
- `DayDetail.tsx` — zastąpione przez `DayView.tsx` (pełna strona, nie drawer)
- `MainArea.tsx` — nie istnieje

### 8.3 Ścieżki (Routing) — aktualnie zaimplementowane

**Routes zaimplementowane w App.tsx:**

| Route | Page | Opis |
|-------|------|------|
| `/` | Landing.tsx | Landing page (public) |
| `/intro` | Intro.tsx | Intro/onboarding entry point |
| `/how-it-works` | HowItWorks.tsx | Product explanation |
| `/auth` | Auth.tsx | Login/Register |
| `/onboarding` | Onboarding.tsx | Onboarding flow (protected) |
| `/home` | Home.tsx | Dashboard (protected) |
| `/journeys` | Journeys.tsx | Lista journey (protected) |
| `/journey/:id` | Journey.tsx | Journey overview (protected) |
| `/journey/:id/day/:dayNumber` | Journey.tsx | Specific journey day (protected) - renders DayView component |
| `/session` | Session.tsx | Emotion picker → redirects to emotion-reflection |
| `/emotion-reflection` | EmotionReflection.tsx | Reflection page (protected) |
| `/quick-entry` | QuickEntry.tsx | Quick mood entry (protected) |
| `/calendar` | Calendar.tsx | Mood calendar (protected) |
| `/history` | History.tsx | Past entries (protected) |
| `/settings` | Settings.tsx | User settings (protected) |

**Routes z dokumentacji NIEZIMPLEMENTOWANE:**
- `/worksheet` — nie istnieje (zastąpione przez `/emotion-reflection`)
- `/worksheet/:sessionId` — nie istnieje
- `/calendar/:date` — nie istnieje (kalendarz na jednej stronie)
- `/settings/atmosphere` — nie istnieje (atmosfera wybierana w Settings page)
- `/settings/theme` — nie istnieje (theme toggle w Settings page)
- `/login`, `/register` — nie istnieją (połączone w `/auth`)
- `/premium` — nie istnieje

### 8.4 API Endpoints — aktualnie nie zaimplementowane

Aplikacja używa Supabase client bezpośrednio (nie ma dedykowanych API routes). Wszystkie zapytania idą przez Supabase JS client z RLS.

**Przykłady operacji (z `lib/database.ts`):**

```typescript
// Mood entry
await supabase.from('calendar_entries').insert({
  user_id: userId,
  content,
  emotion_id,
  journey_id,      // optional
  journey_day,     // optional
});

// Fetch month entries
await supabase.from('mood_calendar')
  .select('*, entries:calendar_entries(*)')
  .eq('user_id', userId)
  .gte('entry_date', startDate)
  .lte('entry_date', endDate);

// Delete
await supabase.from('calendar_entries').delete().eq('id', entryId);
```

**Nieistniejące endpointy z dokumentacji UX:**
- `POST /api/reflections` — nie ma
- `GET /api/reflections` — nie ma
- `GET /api/calendar/:year/:month` — nie ma (użyj `getCalendarEntriesForMonth`)
- `POST /api/journey/start` — nie ma
- `POST /api/journey/:id/progress` — nie ma

### 8.5 Struktura Bazy Danych — aktualna (Supabase)

**Tabele używane w aplikacji:**

```sql
-- Journeys (static data, 6 rows)
journeys (id, title, titleEn, subtitle, icon, is_active, display_order)

-- Journey days (static, 7 per journey)
journey_days (id, journey_id, day_number, question, question_en)

-- User journeys progress — NOT USED (see notes)
-- user_journey_progress exists but no code reads/writes it

-- Mood calendar entries (mood_calendar + calendar_entries)
mood_calendar (id, user_id, entry_date, primary_emotion_id)
calendar_entries (id, calendar_id, user_id, content, emotion_id, journey_id, journey_day, source_type)

-- Emotions (static data)
emotions (id, name, nameEn, spectrum, parentId, wheelPos, color)

-- User profiles
profiles (id, email, timezone, created_at)

-- User settings (optional)
user_settings (id, user_id, theme, atmosphere, ...)

-- User responses — NOT USED (replaced by calendar_entries)
-- user_responses exists but no code uses it

-- User mood checkins — NOT USED
-- user_mood_checkins exists but no code uses it
```

**Relacje:**
- journeys (1) → journey_days (N)
- mood_calendar (1) → calendar_entries (N)
- users (1) → mood_calendar (N)
- emotions (1) → mood_calendar/calendar_entries (N)

**Important:** Journey progress is calculated from `calendar_entries` (WHERE `journey_id` IS NOT NULL), NOT from `user_journey_progress`. That table is currently unused.

### 8.6 Environment Variables

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## 9. Podsumowanie

### Kluczowe Zasady UX

1. **Emocje w centrum** - każdy element wzmacnia emocjonalne połączenie
2. **Zero friction** - użytkownik może zacząć w 3 kliknięcia
3. **Sophisticated simplicity** - prosty wygląd, bogate wnętrze
4. **Personal = Human** - atmosphere i personalizacja = poczucie własności
5. **Reflective design** - cisza, przestrzeń, skupienie

### Następne Kroki

- [ ] Mockup w Figma (opcjonalnie)
- [ ] Prototyp w kodzie (React/Vite)
- [ ] Testy z użytkownikami
- [ ] Iteracje na podstawie feedbacku

---

*Document version 1.0 | 2026-03-22*
*Consolidated from: ui-ux-overview.md, ui-ux-emotion-wheel.md, ui-ux-themes.md, ui-ux-calendar.md, ui-ux-animations-a11y.md*
