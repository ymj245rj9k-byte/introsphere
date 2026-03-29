export interface Emotion {
  id: string
  name: string
  name_en: string
  spectrum: string
  parent_id: string | null
  wheel_pos: number
  color?: string
  description?: string
}

export interface EmotionSpectrum {
  id: string
  name: string
  name_en: string
  color: string
  emotions: Emotion[]
}

export type AtmosphereType = 
  | 'cream-calm'
  | 'green-forest'
  | 'dark-ink'
  | 'soft-pink'
  | 'silver-tech'
  | 'solar-flare'
  | 'desert-rose'
  | 'ocean-deep'

export interface Atmosphere {
  id: AtmosphereType
  name: string
  description: string
  colors: {
    primary: string
    secondary: string
    background: string
    accent: string
  }
  isPremium: boolean
}
