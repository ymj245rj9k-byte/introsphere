# Introsphere - Calendar

## Spis Treści
1. [Kalendarz Nastrojów](#1-kalendarz-nastrojów)

---

## 1. Kalendarz Nastrojów

### 1.1 Dostęp

```
Ikona: 📅 (calendar)
Lokalizacja: Lewy sidebar, pod Journeys

Zachowanie:
- Click = otwiera overlay / drawer z kalendarzem
- Overlay animuje się: slide in from left (300ms)
- Click outside / ESC = zamyka
```

### 1.2 Widok Kalendarza

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

### 1.3 Widok Dnia (Day Detail)

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

### 1.4 Kolory w Kalendarzu

| Emocja | Kolor HEX | Użycie |
|--------|------------|--------|
| Joy | #F7DC6F | Tło dnia, badge |
| Trust | #82E0AA | Tło dnia, badge |
| Fear | #F1948A | Tło dnia, badge |
| Sadness | #5DADE2 | Tło dnia, badge |
| Anger | #F5B041 | Tło dnia, badge |
| Disgust | #AF7AC5 | Tło dnia, badge |
| Surprise | #9B59B6 | Tło dnia, badge |

### 1.5 Kalendarz - Szczegóły Implementacji

```
Struktura danych dla kalendarza:

interface CalendarDay {
  date: Date;
  entries: CalendarEntry[];
  dominantEmotion?: Emotion;
}

interface CalendarEntry {
  id: string;
  content: string;
  emotionId: string;
  emotionName: string;
  color: string;
  sourceType: 'journey' | 'mood_checkin' | 'free_write';
  createdAt: Date;
}
```

### 1.6 Interakcje Kalendarza

| Akcja | Zachowanie |
|-------|------------|
| **Hover na dzień** | Tooltip z liczbą wpisów |
| **Kliknięcie w dzień** | Otwiera Day Detail drawer |
| **Nawigacja miesiąc** | Strzałki ← → zmieniają miesiąc |
| **Swipe (mobile)** | Przesuwanie między miesiącami |

### 1.7 Pusta Stan Kalendarza

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

---

## 2. Historia Sesji

### 2.1 Dostęp

```
Ikona: 📖 (history)
Lokalizacja: Lewy sidebar, pod Calendar

Zachowanie:
- Click = otwiera listę wszystkich sesji
- Sesje posortowane od najnowszych
- Grupowanie po dacie
```

### 2.2 Widok Listy Sesji

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

### 2.3 Szczegóły Wpisu

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

## 3. Journeys - Wygląd Listy

### 3.1 Ekran Wyboru Journey

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

### 3.2 Postęp w Journey

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
│  │   [TEXTAREA - wpisz odpowiedź]          │  │
│  │                                           │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│              [Odpowiedz →]                     │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

*Document version 1.0 | 2026-03-22*
