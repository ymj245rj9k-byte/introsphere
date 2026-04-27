import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getJourneyDaysCompleted } from '@/lib/database';
import { useAuthStore } from '@/stores/authStore';

const STORAGE_KEY = 'journey-completed-days';

interface JourneyStore {
  completedDays: Record<string, number[]>;
  setCompletedDays: (journeyId: string, dayNumber: number) => void;
  getCompletedDays: (journeyId: string) => number[];
  resetJourney: (journeyId: string) => void;
  getCurrentDay: (journeyId: string) => number;
  syncFromDatabase: () => Promise<void>;
}

export const useJourneyStore = create<JourneyStore>()(
  persist(
    (set, get) => ({
      completedDays: {},
      setCompletedDays: (journeyId, dayNumber) =>
        set((state) => {
          const daysForJourney = state.completedDays[journeyId] || [];
          if (!daysForJourney.includes(dayNumber)) {
            const newDays = [...daysForJourney, dayNumber].sort((a, b) => a - b);
            return {
              completedDays: {
                ...state.completedDays,
                [journeyId]: newDays,
              },
            };
          }
          return state;
        }),
      getCompletedDays: (journeyId) => {
        return get().completedDays[journeyId] || [];
      },
      resetJourney: (journeyId) =>
        set((state) => {
          const newCompletedDays = { ...state.completedDays };
          delete newCompletedDays[journeyId];
          return { completedDays: newCompletedDays };
        }),
      getCurrentDay: (journeyId) => {
        const completed = get().completedDays[journeyId] || [];
        if (completed.length === 0) return 1;
        const maxCompleted = Math.max(...completed);
        return maxCompleted + 1 > 7 ? 8 : maxCompleted + 1; // 8 means all completed
      },
      syncFromDatabase: async () => {
        const { user } = useAuthStore.getState();
        if (!user) return;

        try {
          const dbCompletedDays = await getJourneyDaysCompleted(user.id);
          const completedDaysMap: Record<string, number[]> = {};

          dbCompletedDays.forEach(({ journey_id, day_number }) => {
            if (!completedDaysMap[journey_id]) {
              completedDaysMap[journey_id] = [];
            }
            completedDaysMap[journey_id].push(day_number);
          });

          // Sort each array
          Object.keys(completedDaysMap).forEach((journeyId) => {
            completedDaysMap[journeyId].sort((a, b) => a - b);
          });

          set({ completedDays: completedDaysMap });
        } catch (err) {
          console.error('Failed to sync journey progress from database:', err);
        }
      },
    }),
    {
      name: STORAGE_KEY,
      getStorage: () => localStorage,
    }
  )
);