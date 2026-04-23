export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          display_name: string | null;
          timezone: string | null;
          notification_time: string | null;
          onboarding_completed: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email?: string | null;
          display_name?: string | null;
          timezone?: string | null;
          notification_time?: string | null;
          onboarding_completed?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          display_name?: string | null;
          timezone?: string | null;
          notification_time?: string | null;
          onboarding_completed?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      journeys: {
        Row: {
          id: string;
          title: string;
          title_en: string;
          subtitle: string | null;
          subtitle_en: string | null;
          tone: string | null;
          tone_en: string | null;
          is_active: boolean | null;
          display_order: number | null;
        };
        Insert: {
          id?: string;
          title: string;
          title_en: string;
          subtitle?: string | null;
          subtitle_en?: string | null;
          tone?: string | null;
          tone_en?: string | null;
          is_active?: boolean | null;
          display_order?: number | null;
        };
        Update: {
          id?: string;
          title?: string;
          title_en?: string;
          subtitle?: string | null;
          subtitle_en?: string | null;
          tone?: string | null;
          tone_en?: string | null;
          is_active?: boolean | null;
          display_order?: number | null;
        };
      };
      journey_days: {
        Row: {
          id: number;
          journey_id: string;
          day_number: number;
          day_name: string | null;
          question: string;
          question_en: string;
        };
        Insert: {
          id?: number;
          journey_id: string;
          day_number: number;
          day_name?: string | null;
          question: string;
          question_en: string;
        };
        Update: {
          id?: number;
          journey_id?: string;
          day_number?: number;
          day_name?: string | null;
          question?: string;
          question_en?: string;
        };
      };
      user_journey_progress: {
        Row: {
          id: string;
          user_id: string;
          journey_id: string;
          current_day: number | null;
          started_at: string | null;
          completed_at: string | null;
          status: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          journey_id: string;
          current_day?: number | null;
          started_at?: string | null;
          completed_at?: string | null;
          status?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          journey_id?: string;
          current_day?: number | null;
          started_at?: string | null;
          completed_at?: string | null;
          status?: string | null;
        };
      };
      user_responses: {
        Row: {
          id: string;
          user_id: string;
          journey_id: string | null;
          journey_day: number | null;
          mood_id: string | null;
          question: string;
          response: string;
          created_at: string | null;
          response_length: number | null;
          time_spent_seconds: number | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          journey_id?: string | null;
          journey_day?: number | null;
          mood_id?: string | null;
          question: string;
          response: string;
          created_at?: string | null;
          response_length?: number | null;
          time_spent_seconds?: number | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          journey_id?: string | null;
          journey_day?: number | null;
          mood_id?: string | null;
          question?: string;
          response?: string;
          created_at?: string | null;
          response_length?: number | null;
          time_spent_seconds?: number | null;
        };
      };
      emotions: {
        Row: {
          id: string;
          name: string;
          name_en: string;
          description: string | null;
          spectrum: string | null;
          parent_id: string | null;
          wheel_position: number | null;
          is_active: boolean | null;
        };
        Insert: {
          id?: string;
          name: string;
          name_en: string;
          description?: string | null;
          spectrum?: string | null;
          parent_id?: string | null;
          wheel_position?: number | null;
          is_active?: boolean | null;
        };
        Update: {
          id?: string;
          name?: string;
          name_en?: string;
          description?: string | null;
          spectrum?: string | null;
          parent_id?: string | null;
          wheel_position?: number | null;
          is_active?: boolean | null;
        };
      };
      emotion_questions: {
        Row: {
          id: number;
          emotion_id: string;
          question_number: number | null;
          question: string;
        };
        Insert: {
          id?: number;
          emotion_id: string;
          question_number?: number | null;
          question: string;
        };
        Update: {
          id?: number;
          emotion_id?: string;
          question_number?: number | null;
          question?: string;
        };
      };
      user_mood_checkins: {
        Row: {
          id: string;
          user_id: string;
          primary_emotion_id: string | null;
          intensity: number | null;
          secondary_emotions: Json | null;
          response_text: string | null;
          checked_in_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          primary_emotion_id?: string | null;
          intensity?: number | null;
          secondary_emotions?: Json | null;
          response_text?: string | null;
          checked_in_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          primary_emotion_id?: string | null;
          intensity?: number | null;
          secondary_emotions?: Json | null;
          response_text?: string | null;
          checked_in_at?: string | null;
        };
      };
      mood_calendar: {
        Row: {
          id: string;
          user_id: string;
          entry_date: string;
          primary_emotion_id: string | null;
          primary_emotion_name: string | null;
          color: string | null;
          secondary_emotions: Json | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          entry_date: string;
          primary_emotion_id?: string | null;
          primary_emotion_name?: string | null;
          color?: string | null;
          secondary_emotions?: Json | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          entry_date?: string;
          primary_emotion_id?: string | null;
          primary_emotion_name?: string | null;
          color?: string | null;
          secondary_emotions?: Json | null;
          created_at?: string | null;
        };
      };
      calendar_entries: {
        Row: {
          id: string;
          user_id: string;
          calendar_id: string | null;
          journey_id: string | null;
          journey_day: number | null;
          source_type: string | null;
          content: string;
          emotion_id: string | null;
          emotion_name: string | null;
          color: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          calendar_id?: string | null;
          journey_id?: string | null;
          journey_day?: number | null;
          source_type?: string | null;
          content: string;
          emotion_id?: string | null;
          emotion_name?: string | null;
          color?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          calendar_id?: string | null;
          journey_id?: string | null;
          journey_day?: number | null;
          source_type?: string | null;
          content?: string;
          emotion_id?: string | null;
          emotion_name?: string | null;
          color?: string | null;
          created_at?: string | null;
        };
      };
      user_settings: {
        Row: {
          id: string;
          user_id: string;
          daily_reminder_enabled: boolean | null;
          reminder_time: string | null;
          language: string | null;
          theme: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          daily_reminder_enabled?: boolean | null;
          reminder_time?: string | null;
          language?: string | null;
          theme?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          daily_reminder_enabled?: boolean | null;
          reminder_time?: string | null;
          language?: string | null;
          theme?: string | null;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};
