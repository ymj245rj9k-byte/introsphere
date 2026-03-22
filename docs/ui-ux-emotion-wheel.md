# Introsphere - Emotion Wheel & Worksheet

## Spis Treści
1. [Koło Emocji - Główny Interfejs](#1-koło-emocji---główny-interfejs)
2. [Arkusz Refleksji (Worksheet)](#2-arkusz-refleksji-worksheet)

---

## 1. Koło Emocji - Główny Interfejs

### 1.1 Wizualizacja

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

### 1.2 Budowa Koła

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

### 1.3 Interakcje

| Akcja | Zachowanie |
|-------|------------|
| **Najazd (hover)** | Segment lekko się powiększa (scale 1.05), tooltip z nazwą emocji |
| **Kliknięcie w sektor** | Lista rozwijana emocji (podspektra) + opcja "Zostań na tym poziomie" |
| **Kliknięcie w podspektrum** | Otwiera się Arkusz Refleksji z pytaniami do wybranego podspektra |
| **Kliknięcie "Zostań na tym poziomie"** | Otwiera się Arkusz Refleksji z pytaniami do głównej emocji |
| **Center click** | Show "How are you?" prompt |

### 1.4 Logika Wyboru Pytań

Po wyborze sektora (np. JOY), użytkownik widzi listę:
- Opcja: **"Zostań na poziomie [emocji]"** → wyświetla pytania z głównej kategorii (np. JOY)
- Lista podspektów → po wybraniu wyświetla pytania do tego podspektu

**Przykłady przepływu:**
- JOY → "Zostań na poziomie Radości" → Pytania z sekcji JOY (główne)
- JOY → Serenity → Pytania z podspektum Serenity
- JOY → Ecstasy → Pytania z podspektum Ecstasy
- ANGER → "Zostań na poziomie Złości" → Główne pytania ANGER

### 1.5 Lista Rozwijana Emocji (Dropdown)

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

## 2. Arkusz Refleksji (Worksheet)

### 2.1 Struktura

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

### 2.2 Nagłówek z Pytaniem

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

### 2.3 Obszar Tekstu

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

### 2.4 Zapisywanie

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

## 3. Kolory Emocji (do użycia w UI)

### 3.1 Mapowanie Kolorów

| Emocja | Kolor | HEX |
|--------|-------|-----|
| Joy (Radość) | Żółty | #F7DC6F |
| Trust (Zaufanie) | Zielony | #82E0AA |
| Fear (Strach) | Czerwony jasny | #F1948A |
| Sadness (Smutek) | Niebieski | #5DADE2 |
| Anger (Złość) | Pomarańczowy | #F5B041 |
| Disgust (Wstręt) | Fioletowy | #AF7AC5 |
| Surprise (Zaskoczenie) | Różowy | #9B59B6 |

### 3.2 Użycie w Kalendarzu

```
Każdy dzień w kalendarzu wyświetla:
- Kolorowy bloczek = kolor dominującej emocji
- Nazwa emocji pod spodem (np. "Joy", "Sadness")

Styl:
- Border radius: 8px
- Padding: 8px
- Background: kolor emocji z 20% opacity
- Text: kolor emocji (100% opacity)
```

---

*Document version 1.0 | 2026-03-22*
