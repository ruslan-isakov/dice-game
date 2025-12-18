import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DiceGameRow, StateInterface } from "@/app/lib/definitions";

interface DiceState {
  history: DiceGameRow[];
  lastState: StateInterface | null;
  addGameResult: (state: StateInterface) => void;
  clearHistory: () => void;
  hasPlayed: boolean;
  play: () => void;
  resetPlay: () => void;
}

export const useDiceStore = create<DiceState>()(
  persist(
    (set, get) => ( {
      history: [],
      lastState: null,
      hasPlayed: false,

      play: () => set({ hasPlayed: true }),
      resetPlay: () => set({ hasPlayed: false }),

      addGameResult: (state: StateInterface) => {
        if (state.playNumber === undefined) return;

        const newRow: DiceGameRow = {
          date: new Date().toISOString(),
          guess: `${ state.type } ${ state.num }`,
          playNumber: state.playNumber,
          result: state.result,
        };

        set((store) => ( {
          history: [newRow, ...store.history].slice(0, 10),
          lastState: state,
        } ));
      },

      clearHistory: () => set({ history: [] }),
    } ),
    {
      name: "diceGameData",
      storage: createJSONStorage(() => localStorage),
    }
  )
);