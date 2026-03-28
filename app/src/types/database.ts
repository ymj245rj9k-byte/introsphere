export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          timezone: string
          created_at: string
        }
        Insert: {
          id: string
          email: string
          timezone?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          timezone?: string
          created_at?: string
        }
      }
      journeys: {
        Row: {
          id: string
          title: string
          title_en: string
          subtitle: string
          is_active: boolean
        }
        Insert: {
          id: string
          title: string
          title_en: string
          subtitle: string
          is_active?: boolean
        }
        Update: {
          id?: string
          title?: string
          title_en?: string
          subtitle?: string
          is_active?: boolean
        }
      }
      journey_days: {
        Row: {
          id: string
          journey_id: string
          day_number: number
          question: string
          question_en: string
        }
        Insert: {
          id?: string
          journey_id: string
          day_number: number
          question: string
          question_en: string
        }
        Update: {
          id?: string
          journey_id?: string
          day_number?: number
          question?: string
          question_en?: string
        }
      }
      user_journey_progress: {
        Row: {
          id: string
          user_id: string
          journey_id: string
          current_day: number
          status: 'in_progress' | 'completed' | 'abandoned'
          started_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          journey_id: string
          current_day?: number
          status?: 'in_progress' | 'completed' | 'abandoned'
          started_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          journey_id?: string
          current_day?: number
          status?: 'in_progress' | 'completed' | 'abandoned'
          started_at?: string
          completed_at?: string | null
        }
      }
      emotions: {
        Row: {
          id: string
          name: string
          name_en: string
          spectrum: string
          parent_id: string | null
          wheel_pos: number
        }
        Insert: {
          id: string
          name: string
          name_en: string
          spectrum: string
          parent_id?: string | null
          wheel_pos: number
        }
        Update: {
          id?: string
          name?: string
          name_en?: string
          spectrum?: string
          parent_id?: string | null
          wheel_pos?: number
        }
      }
      user_responses: {
        Row: {
          id: string
          user_id: string
          journey_id: string | null
          journey_day: number | null
          mood_id: string
          question: string
          response: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          journey_id?: string | null
          journey_day?: number | null
          mood_id: string
          question: string
          response: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          journey_id?: string | null
          journey_day?: number | null
          mood_id?: string
          question?: string
          response?: string
          created_at?: string
        }
      }
      mood_calendar: {
        Row: {
          id: string
          user_id: string
          entry_date: string
          primary_emotion_id: string
        }
        Insert: {
          id?: string
          user_id: string
          entry_date: string
          primary_emotion_id: string
        }
        Update: {
          id?: string
          user_id?: string
          entry_date?: string
          primary_emotion_id?: string
        }
      }
      calendar_entries: {
        Row: {
          id: string
          calendar_id: string
          user_id: string
          content: string
          emotion_id: string
          source_type: 'session' | 'journey' | 'manual'
        }
        Insert: {
          id?: string
          calendar_id: string
          user_id: string
          content: string
          emotion_id: string
          source_type: 'session' | 'journey' | 'manual'
        }
        Update: {
          id?: string
          calendar_id?: string
          user_id?: string
          content?: string
          emotion_id?: string
          source_type?: 'session' | 'journey' | 'manual'
        }
      }
      user_mood_checkins: {
        Row: {
          id: string
          user_id: string
          primary_emotion_id: string
          response_text: string
          checked_in_at: string
        }
        Insert: {
          id?: string
          user_id: string
          primary_emotion_id: string
          response_text: string
          checked_in_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          primary_emotion_id?: string
          response_text?: string
          checked_in_at?: string
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          theme: string
          language: string
          reminder_enabled: boolean
          reminder_time: string | null
        }
        Insert: {
          id?: string
          user_id: string
          theme?: string
          language?: string
          reminder_enabled?: boolean
          reminder_time?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          theme?: string
          language?: string
          reminder_enabled?: boolean
          reminder_time?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
