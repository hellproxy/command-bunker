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
export type Phase = "pre-game" | "command" | "movement" | "fight" | "turn-end";

interface GameValues {
  turn: number;
  phase: Phase;
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
  // get
  current: () => GameValues;
  unitStatuses: () => Map<string, UnitStatus>;
  // navigate
  canGoBack: () => boolean;
  canGoForward: () => boolean;
  back: () => void;
  forward: () => void;
  // mutate
  toggleStatus: (unitId: string, target: UnitStatus) => void;
  setCabalPoints: (points: number) => void;
  adjustCommandPoints: (by: number) => void;
}

export const useGameStore = create<GameState & GameHooks>()(
  persist(
    (set, get) => ({
      ...baseState(),
      // get
      current: () => current(get().history),
      unitStatuses: () => current(get().history).unitStatuses,
      // navigate
      canGoBack: () => canGoBack(get().history),
      canGoForward: () => canGoForward(get().history),
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
      toggleStatus: (unitId, target) => {
        set(
          produce((state: GameState) => {
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
          produce((state: GameState) => {
            updateHistory(state, (values) => {
              values.cabalPoints = points;
            });
          })
        ),
      adjustCommandPoints: (by) =>
        set(
          produce((state: GameState) => {
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
    }
  )
);

function baseState(): GameState {
  const history = createHistory<GameValues>(20);
  push(history, {
    turn: 0,
    phase: "pre-game",
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
