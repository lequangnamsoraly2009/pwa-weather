import { create } from 'zustand';

interface ICounter {
    count: number
}

export const useCounter = create<ICounter>((set) => ({
    count: 100,
    addCount: () => set((state: any) => ({ count: state.count + 1 })),
    subCount: () => set((state: any) => ({ count: state.count - 1 })),
}));