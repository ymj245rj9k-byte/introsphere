import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AtmosphereType } from '@/types/emotion';

interface ThemeStore {
  atmosphere: AtmosphereType;
  isDark: boolean;
  setAtmosphere: (atmosphere: AtmosphereType) => void;
  toggleDark: () => void;
  setDark: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      atmosphere: 'cream-calm',
      isDark: false,
      setAtmosphere: (atmosphere) => set({ atmosphere }),
      toggleDark: () => set((state) => ({ isDark: !state.isDark })),
      setDark: (isDark) => set({ isDark }),
    }),
    {
      name: 'introsphere-theme',
    }
  )
);
