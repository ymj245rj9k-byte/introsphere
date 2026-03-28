export * from './database'
export * from './emotion'
export * from './journey'

export interface User {
  id: string
  email: string
  created_at: string
}

export interface Session {
  user: User
  access_token: string
  refresh_token: string
}

export type SessionMode = 'single' | 'journey'

export interface AppState {
  isLoading: boolean
  error: string | null
}
