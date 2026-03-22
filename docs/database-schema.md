# Database Schema - Introsphere

## Firebase Auth (Autentykacja)

Firebase Auth zapewnia wbudowany system auth - nie musisz tworzyć własnej tabeli users!

### Konfiguracja:

1. **Włącz Firebase Auth** w konsoli Firebase:
   - Email/Password
   - Opcjonalnie: Google, Apple, GitHub

2. ** tabela profiles** (rozszerzenie użytkownika):

```sql
-- Utwórz tabelę profiles powiązaną z auth.users
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255),
  display_name VARCHAR(100),
  timezone VARCHAR(50) DEFAULT 'Europe/Warsaw',
  notification_time TIME DEFAULT '09:00:00',
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Trigger do automatycznego tworzenia profilu
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## 2. Journeys (7-dniowe programy - dane statyczne)

```sql
CREATE TABLE journeys (
  id VARCHAR(50) PRIMARY KEY,  -- np. 'wewnetrzne-dziecko', 'granice'
  title VARCHAR(100) NOT NULL,
  title_en VARCHAR(100) NOT NULL,
  subtitle TEXT,
  subtitle_en TEXT,
  tone VARCHAR(100),
  tone_en VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0
);
```

```sql
CREATE TABLE journey_days (
  id SERIAL PRIMARY KEY,
  journey_id VARCHAR(50) REFERENCES journeys(id),
  day_number INT NOT NULL,  -- 1-7
  day_name VARCHAR(20),  -- 'Poniedziałek', etc.
  question TEXT NOT NULL,
  question_en TEXT NOT NULL,
  
  UNIQUE(journey_id, day_number)
);
```

---

## 3. User Journey Progress (Postępy użytkownika w Journey)

```sql
CREATE TABLE user_journey_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  journey_id VARCHAR(50) REFERENCES journeys(id),
  
  current_day INT DEFAULT 1,  -- 1-7
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  
  -- Status: 'in_progress', 'completed', 'paused'
  status VARCHAR(20) DEFAULT 'in_progress',
  
  UNIQUE(user_id, journey_id)
);
```

---

## 4. User Responses (Odpowiedzi na pytania)

```sql
CREATE TABLE user_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Powiązanie do Journey (opcjonalne)
  journey_id VARCHAR(50) REFERENCES journeys(id),
  journey_day INT,  -- 1-7
  
  -- Lub powiązanie do Mood (opcjonalne)
  mood_id VARCHAR(50),
  
  question TEXT NOT NULL,
  response TEXT NOT NULL,  -- Odpowiedź użytkownika
  
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- Metadata
  response_length INT,  -- Liczba znaków
  time_spent_seconds INT  -- Czas od wyświetlenia pytania
);
```

---

## 5. Moods / Emotions (Nastroje - dane statyczne)

```sql
CREATE TABLE emotions (
  id VARCHAR(50) PRIMARY KEY,  -- np. 'joy', 'trust', 'fear'
  name VARCHAR(50) NOT NULL,
  name_en VARCHAR(50) NOT NULL,
  description TEXT,
  spectrum VARCHAR(20),  -- 'primary' lub 'subspectrum'
  parent_id VARCHAR(50),  -- dla podspektrów
  wheel_position DECIMAL(5,2),  -- pozycja na kole (0-360)
  is_active BOOLEAN DEFAULT TRUE
);
```

```sql
CREATE TABLE emotion_questions (
  id SERIAL PRIMARY KEY,
  emotion_id VARCHAR(50) REFERENCES emotions(id),
  question_number INT,  -- 1-3
  question TEXT NOT NULL,
  
  UNIQUE(emotion_id, question_number)
);
```

---

## 6. User Mood Check-ins (Jednorazowe sesje nastroju)

```sql
CREATE TABLE user_mood_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Wybrany nastrój
  primary_emotion_id VARCHAR(50) REFERENCES emotions(id),
  intensity INT,  -- 1-10 (opcjonalne)
  
  -- Opcjonalne: dodatkowe emocje
  secondary_emotions JSONB,  -- ['joy', 'trust']
  
  -- Odpowiedź na pytanie
  response_text TEXT,
  
  checked_in_at TIMESTAMP DEFAULT NOW()
);
```

---

## 7. Mood Calendar + Entries (Kalendarz nastrojów + wpisy)

```sql
-- Kalendarz: data + podsumowanie dnia
CREATE TABLE mood_calendar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  entry_date DATE NOT NULL,
  
  -- Główna emocja dnia (do koloru w kalendarzu)
  primary_emotion_id VARCHAR(50) REFERENCES emotions(id),
  primary_emotion_name VARCHAR(50),  -- zapisana nazwa np. "Radość"
  color VARCHAR(20),  -- np. "#FFD93D"
  
  -- Opcjonalne: dodatkowe emocje
  secondary_emotions JSONB,  -- ["joy", "trust"]
  
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(user_id, entry_date)
);

-- Wpisy: pliki/odpowiedzi z poszczególnych dni
CREATE TABLE calendar_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  calendar_id UUID REFERENCES mood_calendar(id) ON DELETE CASCADE,
  
  -- Powiązanie z Journey (opcjonalne)
  journey_id VARCHAR(50),
  journey_day INT,
  
  -- Źródło wpisu
  source_type VARCHAR(20),  -- 'journey', 'mood_checkin', 'free_write'
  
  -- Treść odpowiedzi
  content TEXT NOT NULL,  -- plik/odpowiedź użytkownika
  
  -- Emocja przypisana do tego wpisu
  emotion_id VARCHAR(50),  -- np. 'joy', 'sadness'
  emotion_name VARCHAR(50),  -- np. 'Radość'
  color VARCHAR(20),  -- np. '#FFD93D'
  
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Przepływ (Flow):**

1. Użytkownik odpowiada na pytanie dnia (Journey)
2. Po odpowiedzi wybiera emocję (z koła emocji)
3. System tworzy:
   - `calendar_entry` - z treścią odpowiedzi + emocją
   - `mood_calendar` - jeśli tego dnia jeszcze nie ma, z główną emocją

**Przykład widoku kalendarza (bloczki kolorowe):**
```
┌─────────────────────────────────────────────────────────────────────────┐
│  Pon    │   Wt    │   Śr    │  Czw    │   Pt    │   Sb    │   Nd    │
├─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ ┌─────┐ │ ┌─────┐ │ ┌─────┐ │ ┌─────┐ │ ┌─────┐ │ ┌─────┐ │ ┌─────┐ │
│ │Radość│ │ │Strach│ │ │Radość│ │ │Smutek│ │ │Złość │ │ │Zaufanie│ │     │
│ │🟡 #FF│ │ │#16A0│ │ │#FFD9│ │ │#2C3E│ │ │#FF6B│ │ │#2ECC7│ │     │
│ │D93D │ │ │85   │ │ │3D   │ │ │50   │ │ │6B   │ │ │1    │ │     │
│ └─────┘ │ └─────┘ │ └─────┘ │ └─────┘ │ └─────┘ │ └─────┘ │ └─────┘ │
└─────────────────────────────────────────────────────────────────────────┘

Bloczek = KOLOR TŁA + NAZWA EMOCJI (np. "Radość", "Smutek")
```

Kliknięcie w dzień pokazuje listę wpisów z treścią.

---

## 8. User Settings (Ustawienia użytkownika)

```sql
CREATE TABLE user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  
  -- Powiadomienia
  daily_reminder_enabled BOOLEAN DEFAULT TRUE,
  reminder_time TIME DEFAULT '09:00:00',
  
  -- Preferencje językowe
  language VARCHAR(10) DEFAULT 'pl',
  
  -- Theme
  theme VARCHAR(20) DEFAULT 'light',  -- 'light', 'dark', 'system'
  
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## Indeksy (dla wydajności)

```sql
-- Szybkie wyszukiwanie postępów użytkownika
CREATE INDEX idx_user_journey_progress_user ON user_journey_progress(user_id);
CREATE INDEX idx_user_journey_progress_status ON user_journey_progress(status);

-- Odpowiedzi użytkownika
CREATE INDEX idx_user_responses_user ON user_responses(user_id);
CREATE INDEX idx_user_responses_created ON user_responses(created_at);

-- Mood check-ins
CREATE INDEX idx_user_mood_checkins_user ON user_mood_checkins(user_id);
CREATE INDEX idx_user_mood_checkins_date ON user_mood_checkins(checked_in_at);

-- Kalendarz nastrojów
CREATE INDEX idx_mood_calendar_user_date ON mood_calendar(user_id, entry_date);

-- Wpisy kalendarza
CREATE INDEX idx_calendar_entries_calendar ON calendar_entries(calendar_id);
CREATE INDEX idx_calendar_entries_user_date ON calendar_entries(user_id, created_at);
```

---

## Przykładowe zapytania

### Pobierz aktywny Journey użytkownika
```sql
SELECT j.*, ujp.current_day, ujp.status
FROM journeys j
JOIN user_journey_progress ujp ON j.id = ujp.journey_id
WHERE ujp.user_id = 'user-uuid' AND ujp.status = 'in_progress'
ORDER BY ujp.started_at DESC
LIMIT 1;
```

### Pobierz pytanie na dziś
```sql
SELECT jd.question, jd.question_en, jd.day_name
FROM journey_days jd
JOIN user_journey_progress ujp ON jd.journey_id = ujp.journey_id
WHERE ujp.user_id = 'user-uuid' 
  AND ujp.status = 'in_progress'
  AND jd.day_number = ujp.current_day;
```

### Statystyki użytkownika
```sql
SELECT 
  COUNT(DISTINCT journey_id) as journeys_started,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as journeys_completed,
  COUNT(*) as total_responses,
  COUNT(DISTINCT DATE(checked_in_at)) as mood_days_logged
FROM user_journey_progress
LEFT JOIN user_responses ON user_journey_progress.user_id = user_responses.user_id
LEFT JOIN user_mood_checkins ON user_journey_progress.user_id = user_mood_checkins.user_id
WHERE user_journey_progress.user_id = 'user-uuid';
```

### Pobierz wpisy z kalendarza dla użytkownika (miesiąc)
```sql
SELECT 
  mc.entry_date,
  mc.primary_emotion_id,
  mc.primary_emotion_name,
  mc.color as primary_color,
  json_agg(
    json_build_object(
      'id', ce.id,
      'content', ce.content,
      'emotion_name', ce.emotion_name,
      'color', ce.color,
      'source_type', ce.source_type
    )
  ) as entries
FROM mood_calendar mc
LEFT JOIN calendar_entries ce ON mc.id = ce.calendar_id
WHERE mc.user_id = 'user-uuid'
  AND mc.entry_date BETWEEN '2024-01-01' AND '2024-01-31'
GROUP BY mc.id
ORDER BY mc.entry_date;
```

### Dodaj wpis z Journey do kalendarza
```sql
-- 1. Znajdź lub utwórz dzień w kalendarzu
INSERT INTO mood_calendar (user_id, entry_date, primary_emotion_id, primary_emotion_name, color)
VALUES ('user-uuid', CURRENT_DATE, 'joy', 'Radość', '#FFD93D')
ON CONFLICT (user_id, entry_date) DO UPDATE
SET primary_emotion_id = EXCLUDED.primary_emotion_id,
    primary_emotion_name = EXCLUDED.primary_emotion_name,
    color = EXCLUDED.color
RETURNING id;

-- 2. Dodaj wpis odpowiedzi
INSERT INTO calendar_entries (user_id, calendar_id, journey_id, journey_day, source_type, content, emotion_id, emotion_name, color)
SELECT 
  'user-uuid',
  (SELECT id FROM mood_calendar WHERE user_id = 'user-uuid' AND entry_date = CURRENT_DATE),
  'wewnetrzne-dziecko',
  1,
  'journey',
  'Moja odpowiedź na pytanie...',
  'joy',
  'Radość',
  '#FFD93D';
```

---

## Uwagi implementacyjne

1. **Dane statyczne vs dynamiczne**: Journeys i Emotions mogą być hardcoded w kodzie (frontend) lub w bazie. Zależy od tego, czy admin będzie edytował je przez panel admina.

2. **MVP**: Dla pierwszej wersji można uprościć - dane Journeys i Emotions w kodzie, tylko user_responses i user_journey_progress w bazie.

3. **No-code alternatywa**: Dla very MVP można użyć Firebase z prostym schematem JSON.

> **Nota:** Alternatywnie możesz użyć Supabase (SQL-like, darmowy tier).
