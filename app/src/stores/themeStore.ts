import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AtmosphereType } from '../types'

interface ThemeState {
  atmosphere: AtmosphereType
  theme: 'light' | 'dark'
  
  // Actions
  setAtmosphere: (atmosphere: AtmosphereType) => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      atmosphere: 'dark-ink',
      theme: 'dark',
      
      setAtmosphere: (atmosphere) => set({ atmosphere }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'introsphere-theme',
    }
  )
)
