import { create } from "zustand";

interface CreditsState {
  remaining: number;
  total: number;
  initialized: boolean;
  setCredits: (remaining: number, total: number) => void;
  consume: (amount: number) => void;
}

export const useCreditsStore = create<CreditsState>((set) => ({
  remaining: 0,
  total: 100,
  initialized: false,
  setCredits: (remaining, total) =>
    set({ remaining, total, initialized: true }),
  consume: (amount) =>
    set((state) => ({
      remaining: Math.max(0, state.remaining - amount),
    })),
}));
