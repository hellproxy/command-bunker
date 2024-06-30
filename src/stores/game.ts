import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createMapStorage } from "./utils";

type UnitStatus = "dead" | "reserve";

interface GameState {
  game?: {
    listId: string;
    turn: number;
    victoryPoints: number;
    commandPoints: number;
    cabalPoints: number;
    unitStatuses: Map<string, UnitStatus[]>;
  };
}

export const useListStore = create<GameState>()(
  persist(
    (get, set) => ({
      ...baseState(),
    }),
    {
      name: "list-storage",
      storage: createMapStorage(baseState),
    }
  )
);

function baseState(): GameState {
  return {};
}
