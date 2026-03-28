import { create } from 'zustand'
import { Emotion, JourneyProgress, SessionMode } from '../types'

interface SessionState {
  mode: SessionMode | null
  currentMood: Emotion | null
  currentJourney: JourneyProgress | null
  currentQuestion: string | null
  currentResponse: string
  
  // Actions
  setMode: (mode: SessionMode) => void
  selectMood: (emotion: Emotion) => void
  setJourney: (journey: JourneyProgress) => void
  setQuestion: (question: string) => void
  setResponse: (response: string) => void
  reset: () => void
}

export const useSessionStore = create<SessionState>((set) => ({
  mode: null,
  currentMood: null,
  currentJourney: null,
  currentQuestion: null,
  currentResponse: '',
  
  setMode: (mode) => set({ mode }),
  selectMood: (emotion) => set({ currentMood: emotion }),
  setJourney: (journey) => set({ currentJourney: journey }),
  setQuestion: (question) => set({ currentQuestion: question }),
  setResponse: (response) => set({ currentResponse: response }),
  reset: () => set({
    mode: null,
    currentMood: null,
    currentJourney: null,
    currentQuestion: null,
    currentResponse: '',
  }),
}))
