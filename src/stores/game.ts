import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createMapStorage } from "./utils";
import { produce } from "immer";
import {
  back,
  canGoBack,
  canGoForward,
  createHistory,
  current,
  forward,
  GameHistory,
  push,
} from "./history-utils";

export type UnitStatus = "dead" | "reserve" | undefined;
export type Phase = "command" | "movement" | "shooting" | "fight" | "turn-end";

interface GameValues {
  turn: number;
  phase?: Phase;
  attacking: boolean;
  victoryPoints: number;
  commandPoints: number;
  cabalPoints: number;
  unitStatuses: Map<string, UnitStatus>;
}

interface GameState {
  listId?: string;
  history: GameHistory<GameValues>;
}

interface GameHooks {
  // navigate
  back: () => void;
  forward: () => void;
  // mutate
  toggleAttacking: () => void;
  toggleStatus: (unitId: string, target: UnitStatus) => void;
  setCabalPoints: (points: number) => void;
  adjustCommandPoints: (by: number) => void;
}

export function useGameValues<T>(selector: (values: GameValues) => T): T {
  return useGameStore((state) => {
    return selector(current(state.history));
  });
}

export function useNavigation(): { canGoBack: boolean; canGoForward: boolean } {
  return useGameStore((state) => ({
    canGoBack: canGoBack(state.history),
    canGoForward: canGoForward(state.history),
  }));
}

export const useGameStore = create<GameState & GameHooks>()(
  persist(
    (set) => ({
      ...baseState(),
      // get
      back: () => {
        set(
          produce(({ history }: GameState) => {
            back(history);
          })
        );
      },
      forward: () => {
        set(
          produce(({ history }: GameState) => {
            forward(history);
          })
        );
      },
      // mutate
      toggleAttacking: () => {
        set(
          produce((state) => {
            updateHistory(state, (values) => {
              values.attacking = !values.attacking;
            });
          })
        );
      },
      toggleStatus: (unitId, target) => {
        set(
          produce((state) => {
            updateHistory(state, ({ unitStatuses }) => {
              const status = unitStatuses.get(unitId);
              const newStatus = target === status ? undefined : target;
              unitStatuses.set(unitId, newStatus);
            });
          })
        );
      },
      setCabalPoints: (points) =>
        set(
          produce((state) => {
            updateHistory(state, (values) => {
              values.cabalPoints = points;
            });
          })
        ),
      adjustCommandPoints: (by) =>
        set(
          produce((state) => {
            const { history } = state;
            const values = copy(current(history));
            const target = values.commandPoints + by;
            if (target >= 0) {
              values.commandPoints = target;
              push(history, values);
            }
          })
        ),
    }),
    {
      name: "game-storage",
      storage: createMapStorage(baseState),
      onRehydrateStorage: () => {
        return (_, error) => {
          if (error) {
            console.log("Error rehydrating storage");
            console.log(error);
          }
        };
      },
    }
  )
);

function baseState(): GameState {
  const history = createHistory<GameValues>(20);
  push(history, {
    turn: 0,
    attacking: true,
    victoryPoints: 0,
    commandPoints: 0,
    cabalPoints: 0,
    unitStatuses: new Map(),
  });
  return { history };
}

function copy(values: GameValues): GameValues {
  const { unitStatuses, ...others } = values;
  return {
    ...others,
    unitStatuses: new Map(unitStatuses),
  };
}

function updateHistory(state: GameState, mutate: (values: GameValues) => void) {
  const { history } = state;
  const values = copy(current(history));
  mutate(values);
  push(history, values);
}
