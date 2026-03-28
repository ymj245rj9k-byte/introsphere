export const APP_CONFIG = {
  name: 'Introsphere',
  description: 'Journaling dla Gen Z. Wybierz nastrój, odpowiedz na pytanie, zobacz wzorce swoich emocji.',
  version: '0.1.0',
  
  // Session limits
  FREE_SESSIONS_PER_MONTH: 3,
  MAX_RESPONSE_LENGTH: 5000,
  
  // Journey config
  JOURNEY_DAYS: 7,
  JOURNEYS_COUNT: 6,
  
  // UI config
  ANIMATION_DURATION: 200,
  DEBOUNCE_DELAY: 300,
  
  // Local storage keys
  STORAGE_KEYS: {
    THEME: 'introsphere-theme',
    SESSION: 'introsphere-session',
    RESPONSES: 'introsphere-responses',
    MOOD_CALENDAR: 'introsphere-mood-calendar',
  },
} as const

export const SUPABASE_CONFIG = {
  AUTH_REDIRECT_URL: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
} as const
