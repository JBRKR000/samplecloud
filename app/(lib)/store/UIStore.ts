import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UIStore {
    lastTab: string
    setLastTab: (tab: string) => void
}

export const useUIStore = create<UIStore>()(
    persist(
        (set) => ({
            lastTab: 'allSamples',
            setLastTab: (tab) => set({ lastTab: tab }),
        }),
        {
            name: 'ui-storage',
            partialize: (state) => ({
                lastTab: state.lastTab,
            }),
        }
    )
)


