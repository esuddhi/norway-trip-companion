import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AppState = { theme: 'light' | 'dark' | 'system'; checked: Record<string, boolean>; setTheme: (theme: AppState['theme']) => void; toggle: (id: string) => void; resetChecklist: () => void }
export const useAppStore = create<AppState>()(persist((set) => ({ theme: 'system', checked: {}, setTheme: (theme) => set({ theme }), toggle: (id) => set((state) => ({ checked: { ...state.checked, [id]: !state.checked[id] } })), resetChecklist: () => set({ checked: {} }) }), { name: 'norway-trip-settings' }))
