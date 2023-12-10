import { create } from 'zustand'

interface ReviewState {
    progress: number,
    changed: boolean,
    hideComplete: boolean,
    updateHideComplete: () => void,
    updateProgress: (progress: number) => void,
    setChanged: () => void,
    secretPass: string,
}

const useReviewStore = create<ReviewState>()((set) => ({
    secretPass: "XkhZG4fW2t2W",
    progress: 0,
    hideComplete: false,
    changed: false,
    updateHideComplete: () => set((state) => ({ hideComplete: !state.hideComplete })),
    updateProgress: (progress) => set((state) => ({ progress: progress })),
    setChanged: () => set((state) => ({ changed: !state.changed })),
}))

export default useReviewStore