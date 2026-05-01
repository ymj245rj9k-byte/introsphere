# Introsphere - Statystyki Emocji

## Spis Treści
1. [Przegląd Statystyk](#1-przegląd-statystyk)
2. [Statystyki Miesięczne](#2-statystyki-miesięczne)
3. [API & Zapytania Bazodanowe](#3-api--zapytania-bazodanowe)
4. [Komponenty Frontendowe](#4-komponenty-frontendowe)

---

## 1. Przegląd Statystyk

### 1.1 Lokalizacja w UI

```
Ikona: 📊 (chart)
Lokalizacja: Lewy sidebar, pod Calendar

Zachowanie:
- Click = otwiera dashboard statystyk
- Domyślny widok: bieżący miesiąc
- Możliwość zmiany zakresu czasowego
```

### 1.2 Typy Statystyk

| Statystyka | Opis | Źródło danych |
|------------|------|---------------|
| **Monthly Emotion Frequency** | Częstość występowania emocji w miesiącu | `mood_calendar`, `calendar_entries` |
| **Current Streak** | Aktualna seria dni z wpisami | `mood_calendar` |
| **Total Check-ins** | Łączna liczba wpisów | `user_mood_checkins`, `calendar_entries` |
| **Most Common Emotion** | Najczęstsza emocja w okresie | agregacja z `mood_calendar` |
| **Emotional Diversity** | Liczba różnych emocji | agregacja unikalnych emotion_id |
| **Weekly Trend** | Trend emocji tydzień do tygodnia | porównanie tygodni |

---

## 2. Statystyki Miesięczne

### 2.1 Dashboard Statystyk

```
┌─────────────────────────────────────────────────────────────┐
│  📊 Statystyki                    ◀ Marzec 2026 ▶          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   🔥 12     │ │   📅 8      │ │   🎯 85%    │           │
│  │  wpisów     │ │  seria dni  │ │  regularity │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                             │
│  ──────────────────────────────────────────────────────    │
│                                                             │
│  Rozkład emocji w tym miesiącu:                            │
│                                                             │
│  🟡 Radość       ████████████  45%  (12 razy)              │
│  🔵 Smutek       ██████        25%  (7 razy)              │
│  🟠 Złość        ████          15%  (4 razy)               │
│  🔴 Strach       ██            10%  (3 razy)               │
│  🟢 Zaufanie     █              5%  (1 raz)                │
│                                                             │
│  ──────────────────────────────────────────────────────    │
│                                                             │
│  📈 Trend tygodniowy:                                      │
│                                                             │
│  Tydzień 1: 🟡🟡🟡🟡🔵🔵🟠                                  │
│  Tydzień 2: 🟡🟡🔵🔵🔵🟠🟠                                  │
│  Tydzień 3: 🟡🟡🟡🔵🔵🔴🔴                                  │
│  Tydzień 4: 🟡🟡🟡🟡🟡🔵🔵                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Szczegóły Miesiąca

```
Po kliknięciu w konkretny miesiąc:

┌─────────────────────────────────────────────────────────────┐
│  ← Powrót         Statystyki: Marzec 2026                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Podsumowanie:                                              │
│  • 26 dni z wpisami (85% miesiąca)                         │
│  • 12 unikalnych emocji                                    │
│  • Najczęstsza: Radość (45%)                               │
│  • Dominujący nastrój: Pozytywny                           │
│                                                             │
│  ──────────────────────────────────────────────────────    │
│                                                             │
│  Kalendarz ciepła (Heatmap):                               │
│                                                             │
│  Pn  Wt  Śr  Cz  Pt  So  Ni                                │
│  ▓▓  ▓▓  ██  ██  ▓▓  ░░  ░░                               │
│  ██  ██  ██  ██  ▓▓  ░░  ░░                               │
│  ██  ██  ▓▓  ▓▓  ██  ██  ░░                               │
│  ██  ██  ██  ▓▓  ▓▓  ██  ██                               │
│                                                             │
│  ▓▓ = słaby wpis (1)  ██ = dobry wpis (3+)  ░░ = brak     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. API & Zapytania Bazodanowe

### 3.1 Nowe Endpointy API

```typescript
// GET /api/stats/monthly?year=2026&month=3
interface MonthlyStatsResponse {
  month: number;
  year: number;
  totalEntries: number;
  uniqueEmotions: number;
  currentStreak: number;
  longestStreak: number;
  regularity: number; // percentage
  dominantEmotion: {
    id: string;
    name: string;
    count: number;
    percentage: number;
  };
  emotionDistribution: Array<{
    emotionId: string;
    emotionName: string;
    color: string;
    count: number;
    percentage: number;
  }>;
  weeklyData: Array<{
    week: number;
    emotions: Array<{
      emotionId: string;
      count: number;
    }>;
  }>;
}

// GET /api/stats/overview
interface OverviewStatsResponse {
  totalCheckIns: number;
  totalEntries: number;
  currentStreak: number;
  longestStreak: number;
  firstEntryDate: string | null;
  totalDaysWithEntries: number;
  averageEntriesPerDay: number;
}
```

### 3.2 Funkcje Bazodanowe (PostgreSQL)

```sql
-- Funkcja: Pobierz statystyki miesięczne
CREATE OR REPLACE FUNCTION get_monthly_emotion_stats(
  p_user_id UUID,
  p_year INT,
  p_month INT
)
RETURNS TABLE (
  emotion_id VARCHAR(50),
  emotion_name VARCHAR(50),
  color VARCHAR(20),
  count INT,
  percentage DECIMAL(5,2)
) AS $$
BEGIN
  RETURN QUERY
  WITH month_data AS (
    SELECT 
      mc.primary_emotion_id,
      mc.primary_emotion_name,
      mc.color,
      COUNT(*) as cnt
    FROM mood_calendar mc
    WHERE mc.user_id = p_user_id
      AND EXTRACT(YEAR FROM mc.entry_date) = p_year
      AND EXTRACT(MONTH FROM mc.entry_date) = p_month
    GROUP BY mc.primary_emotion_id, mc.primary_emotion_name, mc.color
  )
  SELECT 
    md.primary_emotion_id,
    md.primary_emotion_name,
    md.color,
    md.cnt as count,
    ROUND(100.0 * md.cnt / NULLIF(SUM(md.cnt) OVER(), 0), 2) as percentage
  FROM month_data md
  ORDER BY md.cnt DESC;
END;
$$ LANGUAGE plpgsql;
```

```sql
-- Funkcja: Oblicz aktualną serię (streak)
CREATE OR REPLACE FUNCTION get_current_streak(p_user_id UUID)
RETURNS INT AS $$
DECLARE
  v_streak INT := 0;
  v_current_date DATE := CURRENT_DATE;
  v_check_date DATE;
BEGIN
  -- Sprawdź czy jest wpis na dzisiaj lub wczoraj
  SELECT MAX(entry_date) INTO v_check_date
  FROM mood_calendar
  WHERE user_id = p_user_id
    AND entry_date <= v_current_date;

  IF v_check_date IS NULL THEN
    RETURN 0;
  END IF;

  -- Jeśli ostatni wpis jest starszy niż wczoraj, streak = 0
  IF v_check_date < v_current_date - INTERVAL '1 day' THEN
    RETURN 0;
  END IF;

  -- Licz wstecz
  v_current_date := v_check_date;
  WHILE TRUE LOOP
    IF EXISTS (
      SELECT 1 FROM mood_calendar
      WHERE user_id = p_user_id
        AND entry_date = v_current_date
    ) THEN
      v_streak := v_streak + 1;
      v_current_date := v_current_date - 1;
    ELSE
      EXIT;
    END IF;
  END LOOP;

  RETURN v_streak;
END;
$$ LANGUAGE plpgsql;
```

```sql
-- Funkcja: Pobierz regularność (procent dni z wpisami w miesiącu)
CREATE OR REPLACE FUNCTION get_monthly_regularity(
  p_user_id UUID,
  p_year INT,
  p_month INT
)
RETURNS DECIMAL(5,2) AS $$
DECLARE
  v_days_with_entries INT;
  v_total_days INT;
BEGIN
  -- Policz dni z wpisami
  SELECT COUNT(DISTINCT entry_date) INTO v_days_with_entries
  FROM mood_calendar
  WHERE user_id = p_user_id
    AND EXTRACT(YEAR FROM entry_date) = p_year
    AND EXTRACT(MONTH FROM entry_date) = p_month;

  -- Policz dni w miesiącu (do dzisiejszego dnia jeśli bieżący miesiąc)
  IF p_year = EXTRACT(YEAR FROM CURRENT_DATE) 
     AND p_month = EXTRACT(MONTH FROM CURRENT_DATE) THEN
    v_total_days := EXTRACT(DAY FROM CURRENT_DATE);
  ELSE
    v_total_days := (
      SELECT EXTRACT(DAY FROM (DATE_TRUNC('month', MAKE_DATE(p_year, p_month, 1)) + INTERVAL '1 month' - INTERVAL '1 day'))::INT
    );
  END IF;

  IF v_total_days = 0 THEN
    RETURN 0;
  END IF;

  RETURN ROUND(100.0 * v_days_with_entries / v_total_days, 2);
END;
$$ LANGUAGE plpgsql;
```

### 3.3 Przykładowe Zapytania SQL

```sql
-- Pobierz wszystkie statystyki miesięczne
SELECT 
  -- Podstawowe statystyki
  COUNT(DISTINCT mc.id) as total_entries,
  COUNT(DISTINCT mc.primary_emotion_id) as unique_emotions,
  
  -- Dominująca emocja
  (SELECT mc2.primary_emotion_name 
   FROM mood_calendar mc2 
   WHERE mc2.user_id = mc.user_id 
     AND EXTRACT(YEAR FROM mc2.entry_date) = 2026
     AND EXTRACT(MONTH FROM mc2.entry_date) = 3
   GROUP BY mc2.primary_emotion_id, mc2.primary_emotion_name
   ORDER BY COUNT(*) DESC 
   LIMIT 1) as dominant_emotion,

  -- Regularność
  ROUND(
    100.0 * COUNT(DISTINCT mc.entry_date) / 
    (SELECT COUNT(*) FROM generate_series(1, 31) WHERE generate_series <= 31),
    2
  ) as regularity

FROM mood_calendar mc
WHERE mc.user_id = 'user-uuid'
  AND EXTRACT(YEAR FROM mc.entry_date) = 2026
  AND EXTRACT(MONTH FROM mc.entry_date) = 3
GROUP BY mc.user_id;

-- Pobierz dane tydzień po tygodniu
SELECT 
  EXTRACT(WEEK FROM mc.entry_date) as week_number,
  mc.primary_emotion_id,
  mc.primary_emotion_name,
  mc.color,
  COUNT(*) as count
FROM mood_calendar mc
WHERE mc.user_id = 'user-uuid'
  AND mc.entry_date BETWEEN '2026-03-01' AND '2026-03-31'
GROUP BY EXTRACT(WEEK FROM mc.entry_date), mc.primary_emotion_id, mc.primary_emotion_name, mc.color
ORDER BY week_number, count DESC;
```

---

## 4. Komponenty Frontendowe

### 4.1 Struktura Komponentów

```
src/
├── components/
│   ├── stats/
│   │   ├── StatsDashboard.tsx       # Główny dashboard
│   │   ├── StatsOverview.tsx        # Podstawowe statystyki
│   │   ├── EmotionDistribution.tsx  # Wykres kołowy/słupkowy
│   │   ├── StreakCounter.tsx        # Licznik serii
│   │   ├── WeeklyTrend.tsx          # Trend tygodniowy
│   │   ├── MonthlySelector.tsx     # Wybór miesiąca
│   │   └── HeatmapCalendar.tsx      # Kalendarz ciepła
│   └── ui/
│       ├── ProgressBar.tsx
│       └── Badge.tsx
├── hooks/
│   ├── useMonthlyStats.ts
│   ├── useStreak.ts
│   └── useOverviewStats.ts
├── lib/
│   └── stats.ts                     # Funkcje pomocnicze
└── types/
    └── stats.ts                     # Typy TypeScript
```

### 4.2 Typy TypeScript

```typescript
// types/stats.ts

export interface EmotionStat {
  emotionId: string;
  emotionName: string;
  color: string;
  count: number;
  percentage: number;
}

export interface WeeklyEmotionData {
  week: number;
  weekStart: string;
  weekEnd: string;
  emotions: EmotionStat[];
  totalEntries: number;
}

export interface MonthlyStats {
  month: number;
  year: number;
  totalEntries: number;
  uniqueEmotions: number;
  currentStreak: number;
  longestStreak: number;
  regularity: number;
  dominantEmotion: EmotionStat | null;
  emotionDistribution: EmotionStat[];
  weeklyData: WeeklyEmotionData[];
}

export interface OverviewStats {
  totalCheckIns: number;
  totalEntries: number;
  currentStreak: number;
  longestStreak: number;
  firstEntryDate: string | null;
  totalDaysWithEntries: number;
  averageEntriesPerDay: number;
}

export interface HeatmapDay {
  date: string;
  entryCount: number;
  dominantEmotion: string | null;
  color: string | null;
}
```

### 4.3 Hook: useMonthlyStats

```typescript
// hooks/useMonthlyStats.ts
import { useState, useEffect } from 'react';
import { MonthlyStats } from '@/types/stats';

export function useMonthlyStats(year: number, month: number) {
  const [stats, setStats] = useState<MonthlyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const response = await fetch(`/api/stats/monthly?year=${year}&month=${month}`);
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [year, month]);

  return { stats, loading, error };
}
```

### 4.4 Komponent: EmotionDistribution

```typescript
// components/stats/EmotionDistribution.tsx
import { EmotionStat } from '@/types/stats';

interface EmotionDistributionProps {
  emotions: EmotionStat[];
}

export function EmotionDistribution({ emotions }: EmotionDistributionProps) {
  return (
    <div className="emotion-distribution">
      <h3>Rozkład emocji w tym miesiącu</h3>
      <div className="distribution-list">
        {emotions.map((emotion) => (
          <div key={emotion.emotionId} className="emotion-row">
            <div className="emotion-info">
              <span 
                className="emotion-dot" 
                style={{ backgroundColor: emotion.color }}
              />
              <span className="emotion-name">{emotion.emotionName}</span>
            </div>
            <div className="emotion-bar-container">
              <div 
                className="emotion-bar"
                style={{ 
                  width: `${emotion.percentage}%`,
                  backgroundColor: emotion.color 
                }}
              />
            </div>
            <span className="emotion-count">
              {emotion.count} ({emotion.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 4.5 Komponent: HeatmapCalendar

```typescript
// components/stats/HeatmapCalendar.tsx
import { HeatmapDay } from '@/types/stats';

interface HeatmapCalendarProps {
  days: HeatmapDay[];
}

export function HeatmapCalendar({ days }: HeatmapCalendarProps) {
  const getIntensityColor = (count: number, color: string | null) => {
    if (count === 0 || !color) return 'transparent';
    if (count === 1) return color + '40'; // 25% opacity
    if (count === 2) return color + '80'; // 50% opacity
    return color; // 100% opacity
  };

  return (
    <div className="heatmap-calendar">
      {days.map((day) => (
        <div 
          key={day.date}
          className="heatmap-day"
          style={{ 
            backgroundColor: getIntensityColor(day.entryCount, day.color),
            borderColor: day.color || 'transparent'
          }}
          title={`${day.date}: ${day.entryCount} wpisów`}
        />
      ))}
    </div>
  );
}
```

---

## 5. Walidacja Hipotez (Data-Driven Insights)

### 5.1 Automatyczne Insight-y

System może generować automatyczne statystyki oparte na danych:

| Insight | Warunek | Komunikat |
|---------|---------|-----------|
| **Streak Alert** | currentStreak > 7 | "Gratulacje! Twoja seria wynosi X dni!" |
| **Emotion Pattern** | jedna emocja > 50% | "Zauważyliśmy, że często odczuwasz [emocja]" |
| **Positive Trend** | pozytywne emocje rosną | "Twój nastrój poprawia się z tygodnia na tydzień" |
| **Reflection Needed** | brak wpisów > 3 dni | "Pamiętaj o codziennej refleksji" |

---

## 6. Plan Implementacji

### Faza 1 (MVP)
- [ ] Podstawowe statystyki miesięczne
- [ ] Rozkład emocji (prosty wykres słupkowy)
- [ ] Aktualna seria (streak)
- [ ] Wybór miesiąca

### Faza 2 (Rozszerzenie)
- [ ] Trend tygodniowy
- [ ] Heatmap kalendarz
- [ ] Porównanie miesięcy
- [ ] Automatyczne insight-y

### Faza 3 (Premium)
- [ ] Eksport statystyk (PDF)
- [ ] Porównanie z poprzednimi miesiącami
- [ ] AI-powered insights

---

*Document version 1.0 | 2026-03-22*
