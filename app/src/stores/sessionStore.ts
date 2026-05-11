import { create } from "zustand";

interface SessionState {
  entryDeletedCount: number;
  incrementEntryDeletedCount: () => void;
}

/**
 * Centralny store dla sesji. Uzywany do sygnalizowania zdarzen
 * (np. usuniecia wpisu), ktore wymagaja odswiezenia danych w innych hookach.
 */
export const useSessionStore = create<SessionState>()((set) => ({
  entryDeletedCount: 0,
  incrementEntryDeletedCount: () =>
    set((state) => ({ entryDeletedCount: state.entryDeletedCount + 1 })),
}));
