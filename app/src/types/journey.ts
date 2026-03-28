export interface Journey {
  id: string
  title: string
  title_en: string
  subtitle: string
  is_active: boolean
  days?: JourneyDay[]
}

export interface JourneyDay {
  id: string
  journey_id: string
  day_number: number
  question: string
  question_en: string
}

export interface JourneyProgress {
  id: string
  user_id: string
  journey_id: string
  current_day: number
  status: 'in_progress' | 'completed' | 'abandoned'
  started_at: string
  completed_at: string | null
  journey?: Journey
}

export interface UserResponse {
  id: string
  user_id: string
  journey_id: string | null
  journey_day: number | null
  mood_id: string
  question: string
  response: string
  created_at: string
}

export interface MoodCalendarEntry {
  id: string
  user_id: string
  entry_date: string
  primary_emotion_id: string
  entries?: CalendarEntry[]
}

export interface CalendarEntry {
  id: string
  calendar_id: string
  user_id: string
  content: string
  emotion_id: string
  source_type: 'session' | 'journey' | 'manual'
}

export interface MoodCheckin {
  id: string
  user_id: string
  primary_emotion_id: string
  response_text: string
  checked_in_at: string
}
