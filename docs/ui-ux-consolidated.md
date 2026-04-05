# Introsphere - UI/UX Consolidated Documentation

## Spis Treści
1. [Ogólna Filozofia Designu](#1-ogólna-filozofia-designu)
2. [Struktura Layoutu](#2-struktura-layoutu)
3. [System Motywów (Theme)](#3-system-motywów-theme)
4. [System Atmosfery (Skin)](#4-system-atmosfery-skin)
5. [Koło Emocji - Główny Interfejs](#5-koło-emocji---główny-interfejs)
6. [Arkusz Refleksji (Worksheet)](#6-arkusz-refleksji-worksheet)
7. [Kalendarz i Historia](#7-kalendarz-i-historia)
8. [Journeys](#8-journeys)
9. [Animacje i Micro-interactions](#9-animacje-i-micro-interactions)
10. [Dostępność (Accessibility)](#10-dostępność-accessibility)
11. [Specyfikacja Techniczna](#11-specyfikacja-techniczna)

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

### 1.4 Kluczowe Zasady UX

1. **Emocje w centrum** - każdy element wzmacnia emocjonalne połączenie
2. **Zero friction** - użytkownik może zacząć w 3 kliknięcia
3. **Sofisticated simplicity** - prosty wygląd, bogate wnętrze
4. **Personal = Human** - atmosphere i personalizacja = poczucie własności
5. **Reflective design** - cisza, przestrzeń, skupienie

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
| **Header (Top-Right)** | Prawa góra | Atmosphere picker, Login/User | Zawsze dostępny |

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

### 2.4 Nawigacja i Ikony

#### Sidebar (Desktop)

| Ikona | Funkcja | Label |
|-------|---------|-------|
| 🌸 / 💭 | Journeys | "Start Journey" |
| 📅 | Calendar | "Mood Calendar" |
| 📖 | History | "My Reflections" |
| ⚙️ | Settings | "Settings" |

#### Bottom Navigation (Mobile)

| Ikona | Funkcja |
|-------|---------|
| 🏠 | Home (Emotion Wheel) |
| 📅 | Calendar |
| 📖 | History |
| ⚙️ | Settings |

#### Header (Desktop)

| Ikona | Funkcja |
|-------|---------|
| ☀️ / 🌙 | Theme toggle (light/dark) - applies different CSS for each atmosphere in both modes |
| � | Atmosphere picker |
| 👤 | Login / User profile |

---

## 3. System Kolorystki

### 3.1 Theme Toggle + Atmosphere

Aplikacja ma **przełącznik light/dark (toggle)**, który działa inaczej dla każdej atmosfery - jest dostosowany do kodu CSS dla atmosfer w obu trybach. Przełącznik ten zmienia tryb jasny/ciemny, ale style zależą od aktualnie wybranej atmosfery.

> **Jak to działa:**
> - Użytkownik wybiera atmosferę (np. Cream Calm)
> - Następnie może przełączać tryb jasny/ciemny za pomocą jednego toggle
> - Ale kolory są definiowane przez atmosferę - Cream Calm w trybie ciemnym ma inne kolory niż w trybie jasnym
> - Każda z 8 atmosfer ma swoją unikalną paletę dla obu trybów (jasny/ciemny)
> - Toggle zmienia tylko tryb, a CSS dla danej atmosfery określa dokładne kolory dla każdego trybu

```
Pozycja: Prawa górna, w pasku header
Ikony: ☀️ (light) / 🌙 (dark) + 🎨 (atmosphere)

Zachowanie:
- Przełącznik light/dark (toggle) zmienia tryb, ale kolory są dostosowane do wybranej atmosfery
- Smooth transition: 0.3s ease-in-out
- Ikona rotate 180° przy przejściu
- Preferencja zapisana w localStorage
- Opcja "System" = follow system preference
```

### 3.2 Jak definiować kolory w CSS

W CSS każda atmosfera definiuje kolory dla obu trybów (light i dark) w sposób dostosowany do toggle theme. System używa klas CSS, które definiują kolory zarówno dla trybu jasnego jak i ciemnego:

```css
/* Cream Calm - wariant light (domyślny) */
.atmosphere-cream-calm {
  --atmosphere-bg: #FAF8F5;
  --atmosphere-text: #2D2A26;
  --atmosphere-accent: #D4C5B5;
}

/* Cream Calm - wariant dark (aktywowany przez klasę .dark dodawaną przez toggle) */
.dark.atmosphere-cream-calm {
  --atmosphere-bg: #1A1918;
  --atmosphere-text: #F5F2EE;
  --atmosphere-accent: #4A433D;
}
```

Każda z 8 atmosfer ma zdefiniowane oba warianty (light i dark). Toggle theme aktywuje klasę `.dark`, która w połączeniu z klasą atmosfery determinuje, które kolory są używane. Przełącznik light/dark działa inaczej dla każdej atmosfery - dostosowuje się do kodu CSS dla atmosfer w obu trybach.

---

## 4. System Atmosfer (Skin)

### 4.1 Definicja

**Atmosphere** = personalizacja wyglądu aplikacji. Obejmuje:
- Kolorystykę elementów UI (akcenty)
- Czcionkę (font family)
- Zaokrąglenia (border radius)
- Intensywność cieni

### 4.2 Domyślne Atmosfery

| Atmosphere | Kolory | Charakter |
|------------|-------|------------|
| **Cream Calm** | Beige, cream, soft neutrals | Spokojna, minimalistyczna, clean girl aesthetic |
| **Green Forest** | Zielone, ciepłe brązy | Slow life, naturalna |
| **Dark Ink** | Granat, pergamin | Intelektualna, poetycka, dark academia |
| **Soft Pink** | Pastelowy róż, lawenda, błękit | Emocjonalna, wrażliwa |
| **Silver Tech** | Chrome, srebrne akcenty | Tech-wellness, AI, kodowanie |
| **Vintage Noir** | Głęboka czerń, złote akcenty | Klasyczna, ponadczasowa |
| **Desert Rose** | Terakota, piasek, suche róże | Ciepła, ziemista |
| **Ocean Deep** | Głęboki błękit, morskie tonie | Spokojna, głęboka |

### 4.3 Implementacja Atmosfer

> **Źródło prawdy:** Wszystkie kolory i style atmosfer są zdefiniowane w `index.css` jako CSS custom properties.
>
> Każda atmosfera definiuje swoją unikalną paletę dla trybu ciemnego i jasnego (przełączanych przez toggle light/dark), przy użyciu odpowiednich klas CSS.
>
> **Przykład użycia:**
> ```css
> /* Definicja dla trybu jasnego (domyślnego) */
> .atmosphere-cream-calm {
>   --atmosphere-bg: #FAF8F5;
>   --atmosphere-text: #2D2A26;
>   --atmosphere-accent: #D4C5B5;
>   --atmosphere-font: 'Inter', sans-serif;
>   --atmosphere-radius: 24px;
> }
>
> /* Definicja dla trybu ciemnego - aktywowana przez toggle light/dark */
> .dark.atmosphere-cream-calm {
>   --atmosphere-bg: #1A1918;
>   --atmosphere-text: #F5F2EE;
>   --atmosphere-accent: #4A433D;
> }
> ```
>
> W praktyce każda z 8 atmosfer definiuje swoje własne kolory dla obu trybów - wybierając atmosferę użytkownik automatycznie wybiera też jej kolorystykę (nie ma oddzielnego przełącznika).

### 4.4 UI Wyboru Atmosfery

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

## 5. Koło Emocji - Główny Interfejs

### 5.1 Wizualizacja (Nowe Koło Emocji)

```
                   ECSTASY (żółty)
                       ↑
                       │
   ADMIRATION (zielony) ←─────→ TERROR (ciemnozielony)
                       │
                       ↓
   GRIEF ←──────●──────→ LOATHING
   (ciemnoniebieski)    CENTER   (fioletowy)
                       │
                       ↓
   AMAZEMENT ←──────────────→ VIGILANCE
   (morsko-niebieski)          (pomarańczowy)
```

### 5.2 Struktura Koła

```
Nowa struktura:
- 8 głównych sektorów (primary emotions) - Ecstasy (żółty), Admiration (zielony), Terror (ciemnozielony),
  Amazement (morsko-niebieski), Grief (ciemnoniebieski), Loathing (fioletowy),
  Rage (czerwony), Vigilance (pomarańczowy)
- Każdy sektor ma 3 podspektra (sub-emocje)
- Łącznie 24 segmenty + center

Segment = {
  emotion: string,
  intensity: 1 | 2 | 3,
  color: string (from emotion-structure),
  angle: number (start, end)
}
```

### 5.3 Kolory Emocji

| Emocja | Kolor | HEX |
|--------|-------|-----|
| Ecstasy (Ekstaza) | Żółty | #F7DC6F |
| Admiration (Podziw) | Zielony | #82E0AA |
| Terror (Strach) | Ciemnozielony | #2874A6 |
| Amazement (Zachwyt) | Morsko-niebieski | #28B4C8 |
| Grief (Żałoba) | Ciemnoniebieski | #1A5276 |
| Loathing (Odrazy) | Fioletowy | #7D3C98 |
| Rage (Wściekłość) | Czerwony | #EC7063 |
| Vigilance (Ostrożność) | Pomarańczowy | #F5B041 |

### 5.4 Interakcje z Kołem

| Akcja | Zachowanie |
|-------|------------|
| **Najazd (hover)** | Segment lekko się powiększa (scale 1.05), tooltip z nazwą i opisem emocji pojawia się po prawej stronie koła |
| **Kliknięcie w sektor** | Lista rozwijana emocji (pod-emocji) + opcja "Zostań na tym poziomie" |
| **Kliknięcie w pod-emocję** | Otwiera się Arkusz Refleksji z pytaniami do wybranego pod-emocji |
| **Kliknięcie "Zostań na tym poziomie"** | Otwiera się Arkusz Refleksji z pytaniami do głównej emocji |
| **Center click** | Show "How are you?" prompt |

### 5.5 Lista Rozwijana Emocji (Dropdown)

```
Po kliknięciu sektora → rozwija się panel:

┌────────────────────────────────────────┐
│  😊 ECSTASY / Ekstaza                  │
├────────────────────────────────────────┤
│  ☐ Zostań na poziomie Ekstazy         │
│  ─────────────────────────────────     │
│  ○ Joy (Radość)         - miękka      │
│  ○ Serenity (Spuśćność) - spokojna    │
│  ○ Love (Miłość)        - bliskość    │
└────────────────────────────────────────┘

Elementy:
- **Checkbox "Zostań na poziomie [emocji]"** - wybór głównej kategorii
- **Radio buttons dla podspektów** - wybór konkretnego podspektra
- Kolorowy kwadrat/koło (8px)
- Nazwa emocji
- Subtelny opis (opcjonalnie)
- Hover: podświetlenie
```

### 5.6 Logika Wyboru Pytań

Po wyborze sektora (np. ECSTASY), użytkownik widzi listę:
- Opcja: **"Zostań na poziomie [emocji]"** → wyświetla pytania z głównej kategorii (np. ECSTASY)
- Lista pod-emocji → po wybraniu wyświetla pytania do tej pod-emocji

**Przykłady przepływu:**
- ECSTASY → "Zostań na poziomie Ekstazy" → Pytania z sekcji ECSTASY (główne)
- ECSTASY → Joy → Pytania z podspektum Joy
- ECSTASY → Serenity → Pytania z podspektum Serenity
- ECSTASY → Love → Pytania z podspektum Love
- ADMIRATION → "Zostań na poziomie Podziwu" → Główne pytania ADMIRATION

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
│     └───────────────────��─────────────────────────┘    │
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

### 6.4 Zapisywanie (Auto-save)

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

## 7. Kalendarz i Historia

### 7.1 Kalendarz Nastrojów - Dostęp

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
│  │ ←→ (nawigacja między wpisami dnia)              │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  + Dodaj nowy wpis                                          │
└────────────────────────────────────────────────────────────┘
```

### 7.4 Interakcje Kalendarza

| Akcja | Zachowanie |
|-------|------------|
| **Hover na dzień** | Tooltip z liczbą wpisów |
| **Kliknięcie w dzień** | Otwiera Day Detail drawer |
| **Nawigacja miesiąc** | Strzałki ← → zmieniają miesiąc |
| **Swipe (mobile)** | Przesuwanie między miesiącami |

### 7.5 Pusta Stan Kalendarza

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

### 7.6 Historia Sesji - Widok Listy

```
┌─────────────────────────────────────────────────┐
│  📖 Moje Refleksje                    [Filtr] │
├─────────────────────────────────────────────────┤
│                                                 │
│  Dzisiaj                                        │
│  ┌───────────────────────────────────────────┐ │
│  │ 🟡 Joy - "What makes you joyful?"         │ │
│  │ "Spending time with family..."           │ │
│  │ 10:30                                     │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  Wczoraj                                        │
│  ┌───────────────────────────────────────────┐ │
│  │ 🔵 Sadness - "What are you grieving?"    │ │
│  │ "Losing my job was hard but..."          │ │
│  │ 15:45                                     │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  ─────────────────────────────────────────     │
│                                                 │
│  Ten tydzień                                    │
│  ┌───────────────────────────────────────────┐ │
│  │ 🟠 Anger - "What boundary was crossed?"   │ │
│  │ "At work, my manager..."                 │ │
│  │ Poniedziałek, 9:00                       │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### 7.7 Szczegóły Wpisu w Historii

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
│  simple moments. My sister and I talked       │
│  for hours about our childhood...             │
│                                                 │
│  ───────────────────────────────────────────    │
│                                                 │
│  📅 22 marca 2026, 10:30                       │
│  📁 Journey: Wewnętrzne Dziecko (Dzień 3)      │
│                                                 │
│  [✏️ Edytuj]  [🗑️ Usuń]                        │
└─────────────────────────────────────────────────┘
```

---

## 8. Journeys

### 8.1 Ekran Wyboru Journey

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
│                                                 │
└─────────────────────────────────────────────────┘
```

### 8.2 Postęp w Journey

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
│  you learned you needed to be 'productive'?    │
│  When did you last do it?"                    │
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │                                           │  │
│  │   [TEXTAREA - wpisz odpowiedź]          │  │
│  │                                           │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│              [Odpowiedz →]                     │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 9. Animacje i Micro-interactions

### 9.1 Globalne Transition

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

### 9.2 Specyficzne Animacje

| Element | Animacja | Duration | Easing |
|---------|----------|----------|--------|
| Atmosphere picker | Icon rotate 180° przy wyborze | 300ms | ease |
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

## 11. Specyfikacja Techniczna

### 11.1 Stack Technologiczny

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

### 11.3 Ścieżki (Routing)

```
/                         → Emotion Wheel (Home)
/journeys                 → Wybór journey
/journeys/:id             → Konkretny journey
/worksheet                → Arkusz refleksji
/worksheet/:sessionId      → Sesja z ID
/calendar                → Kalendarz nastrojów
/calendar/:date          → Szczegóły dnia
/history                 → Historia wszystkich sesji
/settings                → Ustawienia użytkownika
/settings/atmosphere    → Wybór atmosfery
/settings/theme          → Wybór theme
/login                   → Logowanie
/register                → Rejestracja
```

### 11.4 API Endpoints

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

### 11.5 Struktura Bazy Danych (Firebase Firestore / Supabase)

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

---

## Podsumowanie - Kluczowe Elementy do Implementacji

### Layout
- Sidebar (lewa strona) z ikonami: Journeys, Calendar, History, Settings
- Header (prawa góra) z: Atmosphere picker, User/Login
- Bottom navigation na mobile
- Responsive breakpoints: mobile (<640px), tablet (640-1023px), desktop (1024px+)

### Emotion Wheel
- 8 głównych sektorów emocji z kolorami
- 24 podsegmenty (po 3 na każdy sektor)
- Hover: scale 1.05 + tooltip
- Klik: dropdown z opcją "Zostań na poziomie" + lista podemocji
- Center click: "How are you?" prompt

### Worksheet
- Nagłówek z pytaniem + nawigacja [<] [1/12] [>]
- Textarea min-height 200px, auto-expand
- Auto-save po 2s, manual save Ctrl/Cmd + Enter
- Emoji emocji jako badge

### Calendar
- Widok miesiąca z kolorowymi kropkami
- Hover: tooltip z liczbą wpisów
- Click: szczegóły dnia (Day Detail drawer)
- Nawigacja strzałkami + swipe na mobile

### Journeys
- Lista dostępnych journeys z progress bar
- Widok pojedynczego journey z dniami (1-7)
- Input na odpowiedź + przycisk "Odpowiedz"

### Theme & Atmosphere
- Light/Dark toggle (jeden przycisk) z rotacją ikony 180°, który działa inaczej dla każdej atmosfery - dostosowany do kodu CSS dla atmosfer w obu trybach
- 8 atmosfer do wyboru
- Wszystko w CSS custom properties w index.css
- Toggle theme aktywuje różne zestawy kolorów w zależności od wybranej atmosfery

### Animacje
- Smooth transitions (150-400ms)
- Expo-out easing dla płynności
- Reduced motion media query
- Skeleton screens dla loading states

### Dostępność
- Semantic HTML + ARIA labels
- Focus states z outline
- Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- WCAG 2.1 AA contrast ratios

---

*Document version 1.0 | 2026-03-22 | Scalony z: ui-ux-overview.md, ui-ux-themes.md, ui-ux-calendar.md, ui-ux-emotion-wheel.md, ui-ux-animations-a11y.md*