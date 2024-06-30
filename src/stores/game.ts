import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createMapStorage } from "./utils";
import { produce } from "immer";

export type UnitStatus = "dead" | "reserve" | undefined;

interface GameState {
  listId?: string;
  turn: number;
  victoryPoints: number;
  commandPoints: number;
  cabalPoints: number;
  unitStatuses: Map<string, UnitStatus>;
  toggleStatus: (unitId: string, target: UnitStatus) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      ...baseState(),
      toggleStatus: (unitId, target) => {
        set(
          produce((state: GameState) => {
            const status = state.unitStatuses.get(unitId);
            const newStatus = target === status ? undefined : target;
            state.unitStatuses.set(unitId, newStatus);
          })
        );
      },
    }),
    {
      name: "game-storage",
      storage: createMapStorage(baseState),
    }
  )
);

function baseState() {
  return {
    turn: 0,
    victoryPoints: 0,
    commandPoints: 0,
    cabalPoints: 0,
    unitStatuses: new Map(),
  };
}

function createStatuses() {
  return { dead: false, reserve: false };
}
