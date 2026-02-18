import { create } from 'zustand'

interface AppStore {
  count: number
  increment: () => void
  reset: () => void
}

export const useAppStore = create<AppStore>((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  reset: () => set({ count: 0 }),
}))
