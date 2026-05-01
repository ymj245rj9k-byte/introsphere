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

### 2.4 Nawigacja

**Sidebar (Desktop)**

| Ikona | Funkcja | Label |
|-------|---------|-------|
| 🌸 / 💭 | Journeys | "Start Journey" |
| 📅 | Calendar | "Mood Calendar" |
| 📖 | History | "My Reflections" |
| ⚙️ | Settings | "Settings" |

**Bottom Navigation (Mobile)**

| Ikona | Funkcja |
|-------|---------|
| 🏠 | Home (Emotion Wheel) |
| 📅 | Calendar |
| 📖 | History |
| ⚙️ | Settings |

**Header (Desktop)**

| Ikona | Funkcja |
|-------|---------|
| ☀️ / 🌙 | Theme toggle |
| 👤 | Login / User profile |
| 🎨 | Atmosphere picker |

---

## 3. Koło Emocji - Główny Interfejs


### 3.1 Budowa Koła

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

### 3.3 Interakcje

| Akcja | Zachowanie |
|-------|------------|
| **Najazd (hover)** | Segment lekko się powiększa (scale 1.05), tooltip z nazwą emocji |
| **Kliknięcie w sektor** | Lista rozwijana emocji (podspektra) + opcja "Zostań na tym poziomie" |
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

### 3.5 Lista Rozwijana Emocji (Dropdown)

```
Po kliknięciu sektora → rozwija się panel:

┌────────────────────────────────────────┐
│  😊 JOY / Radość                       │
├────────────────────────────────────────┤
│  ☐ Zostań na poziomie Radości         │
│  ─────────────────────────────────     │
│  ○ Serenity (Spokój)     - łagodna   │
│  ○ Joy (Radość)           - standardowa│
│  ○ Ecstasy (Ekstaza)     - intensywna │
│  ○ Love (Miłość)         - bliskość   │
└────────────────────────────────────────┘

Elementy:
- **Checkbox "Zostań na poziomie [emocji]"** - wybór głównej kategorii
- **Radio buttons dla podspektów** - wybór konkretnego podspektra
- Kolorowy kwadrat/koło (8px)
- Nazwa emocji
- Subtelny opis (opcjonalnie)
- Hover: podświetlenie

**Logika:**
- Zaznaczenie "Zostań na poziomie" → pytania z głównej kategorii
- Wybór podspektra → pytania z tego podspektra
```


---

## 4. Arkusz Refleksji (Worksheet)

### 4.1 Struktura

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

### 4.2 Nagłówek z Pytaniem

```
Komponent: QuestionCard

Elementy:
1. Pytanie (duży tekst, centered)
2. Nawigacja: [<] [numer/np. 3/12] [>]
3. Kategoria emocji (mały badge)
4. 🎲 Przycisk losowania nowego pytania

Funkcjonalność:
- Strzałki = następne/poprzednie pytanie z bazy pytań tej KONKRETNEJ emocji
- Losowanie: 🎲 przycisk = losuj nowe pytanie z tej samej kategorii emocji
- Indeks pokazuje pozycję w liście pytań wybranej emocji/podspektra
- Transition: slide in/out
- **Krytyczne:** Pytania pochodzą z bazy dopasowanej do wyboru użytkownika:
  - Jeśli wybrał "Zostań na poziomie" → główna kategoria (np. JOY)
  - Jeśli wybrał podspektrum → to podspektrum (np. SERENITY)
```

### 4.3 Obszar Tekstu

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

### 4.4 Zapisywanie

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

## 5. Kalendarz i Historia

### 5.1 Kalendarz Nastrojów

**Dostęp**
```
Ikona: 📅 (calendar)
Lokalizacja: Lewy sidebar, pod Journeys

Zachowanie:
- Click = otwiera overlay / drawer z kalendarzem
- Overlay animuje się: slide in from left (300ms)
- Click outside / ESC = zamyka
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
| **Kliknięcie w dzień** | Otwiera Day Detail drawer |
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
Lokalizacja: Lewy sidebar, pod Calendar

Zachowanie:
- Click = otwiera listę wszystkich sesji
- Sesje posortowane od najnowszych
- Grupowanie po dacie
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

### 6.1 System Motywów (Theme)

Motywy (jasny/ciemny) są zdefiniowane w `index.css` jako CSS custom properties w sekcji `:root` i `.dark`.

**Theme Toggle**
```
Pozycja: Prawa górna, w pasku header
Ikona: Słońce (☀️) / Księżyc (🌙)

Zachowanie:
- Smooth transition: 0.3s ease-in-out
- Ikona rotate 180° przy przejściu
- Preferencja zapisana w localStorage
- Opcja "System" = follow system preference
```

### 6.2 System Atmosfery (Skin)

**Definicja**
**Atmosphere** = personalizacja wyglądu aplikacji poza trybem jasny/ciemny. Obejmuje:
- Kolorystykę elementów UI (akcenty)
- Czcionkę (font family)
- Zaokrąglenia (border radius)
- Intensywność cieni

**Domyślne Atmosfery**

| **Nazwa** | **Paleta** | **Typografia** | **Styl wizualny** |
|---|---|---|---|
| **Cream Calm** | Kremowy (#faf7f2), ciepły beż (#e8ddd0), złamana biel, akcenty nude | Plus Jakarta Sans — lekki, geometryczny | Brak cieni i dekoracji. Karty z 0.5px ramką. Duże odstępy między sekcjami. Śledzenie nastroju jako rząd geometrycznych kółek. |
| **Green Forest** | Mech (#4a6741), szałwia (#8aab7e), ciepły brąz (#6b4c2a), kremowy papier (#f5f0e8) | Caveat (nagłówki), Lora (body) | Tekstura tła imitująca papier akwarelowy. Ikonografia botaniczna — cienkie ilustracje liści. Śledzenie nastroju jako rosnąca roślina. |
| **Dark Ink** | Granat (#1a1f3a), pergamin (#f5eed6), antyczne złoto (#c9a063) | Playfair Display Italic (nagłówki), EB Garamond (body) | Tekstura pergaminu w tle. Nawigacja stylizowana na zakładki księgi. Złote linie jako separatory. Nastroje jako symbole alchemiczne. |
| **Soft Pink** | Pudrowy róż (#f2dde4), mglisty błękit (#dde8f2), lawenda (#e8ddf2), ciepła biel | Instrument Serif Italic (nagłówki), DM Sans (body) | Dekoracje wektorowe — kokardki i kwiaty jako separatory. Nastroje jako pastelowe bąble z opisami. Zaokrąglone karty z dużym paddingiem. |
| **Silver Tech** | Grafit (#0f0f13), srebro (#c0c0c8), turkus (#00d4aa) jako akcent | JetBrains Mono (body, tagi), Geist (nagłówki) | Ostre krawędzie, zero border-radius. Nastrój jako badge (`mood: anxious`). Streak jako siatka w stylu GitHub contribution graph. |
| **Vintage Noir** | Czerń (#0c0c0c), złoto (#c9a84c), ecru (#f5f0e0), bordeaux (#6b1f2a) | Cormorant Garamond (nagłówki), Libre Baskerville (body) | Cienkie złote linie i symetryczne ornamenty art deco. Wysoki kontrast tekstu. Duże, dramatyczne nagłówki z dużym letter-spacing. |
| **Desert Rose** | Terakota (#c4714a), piasek (#d4b896), brudny róż (#c4907a), kakao (#6b3d2a) | Abril Fatface (nagłówki), Lora (body) | Tekstura tła imitująca glinę. Śledzenie nastroju jako koła w gradiencie terakoty — intensywność przez nasycenie koloru. |
| **Ocean Deep** | Granat (#0d2137), morska zieleń (#1a4a4a), stalowy błękit (#2a4a6b), turkus (#00b4d8) | Newsreader Italic (nagłówki), Inter (body) | Gradient tła pogłębiający się ku dołowi. Śledzenie nastroju jako skala głębokości. Miękkie, duże border-radius na kartach. |

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
> **Dostępne atmosfery:** Cream Calm, Green Forest, Dark Ink, Soft Pink, Silver Tech, Vintage Noir, Desert Rose, Ocean Deep

**UI Wyboru Atmosfery**
```
Lokalizacja: Prawa góra, obok login/theme
Ikona: 🎨 (palette)

Po kliknięciu → Dropdown/Panel:
┌─────────────────────────────┐
│  🎨 Wybierz Atmosferę       │
├─────────────────────────────┤
│  🟠 Cream Calm              │
│  🌿 Green Forest            │
│  🖋️ Dark Ink                │
│  🌸 Soft Pink               │
│  ⚙️ Silver Tech             │
│  🎭 Vintage Noir            │
│  🏜️ Desert Rose             │
│  🌊 Ocean Deep              │
└─────────────────────────────┘

Zachowanie:
- Mini preview przy hover
- Klik = natychmiastowa zmiana
- Zapis w localStorage
- Tylko dla zalogowanych (Premium feature option)
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

### 8.2 Struktura Komponentów

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

### 8.3 Ścieżki (Routing)

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

### 8.4 API Endpoints

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

### 8.5 Struktura Bazy Danych

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
