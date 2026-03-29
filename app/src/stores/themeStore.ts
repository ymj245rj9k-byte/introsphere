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

// Helper function to apply atmosphere class to body
function applyAtmosphereToBody(atmosphere: AtmosphereType) {
  // Remove all atmosphere classes
  const atmosphereClasses = [
    'atmosphere-cream-calm',
    'atmosphere-green-forest',
    'atmosphere-dark-ink',
    'atmosphere-soft-pink',
    'atmosphere-silver-tech',
    'atmosphere-solar-flare',
    'atmosphere-desert-rose',
    'atmosphere-ocean-deep',
  ]
  
  document.body.classList.remove(...atmosphereClasses)
  
  // Add the new atmosphere class
  if (atmosphere) {
    document.body.classList.add(`atmosphere-${atmosphere}`)
  }
}

// Helper function to apply theme class to body
function applyThemeToBody(theme: 'light' | 'dark') {
  if (theme === 'dark') {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      atmosphere: 'dark-ink',
      theme: 'dark',
      
      setAtmosphere: (atmosphere) => {
        applyAtmosphereToBody(atmosphere)
        set({ atmosphere })
      },
      setTheme: (theme) => {
        applyThemeToBody(theme)
        set({ theme })
      },
    }),
    {
      name: 'introsphere-theme',
      onRehydrateStorage: () => (state) => {
        // Apply theme and atmosphere on app load
        if (state) {
          applyThemeToBody(state.theme)
          applyAtmosphereToBody(state.atmosphere)
        }
      },
    }
  )
)
