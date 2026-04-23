export interface Emotion {
  id: string;
  name: string;
  nameEn: string;
  spectrum: 'positive' | 'negative' | 'neutral';
  parentId: string | null;
  wheelPos: number;
  color: string;
  colorHex: string;
  isActive: boolean;
  description?: string;
}

export interface EmotionSubspectrum {
  id: string;
  name: string;
  nameEn: string;
  parentId: string;
  intensity: 1 | 2 | 3;
  description?: string;
}

export type AtmosphereType =
  | 'cream-calm'
  | 'green-forest'
  | 'dark-ink'
  | 'soft-pink'
  | 'silver-tech'
  | 'solar-flare'
  | 'desert-rose'
  | 'ocean-deep';

export interface AtmosphereTheme {
  id: AtmosphereType;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    accent: string;
  };
  font: {
    heading: string;
    body: string;
  };
  borderRadius: string;
  preview?: string;
}
