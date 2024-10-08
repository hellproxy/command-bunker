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
  dropFuture,
  forward,
  GameHistory,
  push,
} from "./history-utils";
import { useTotalCabalPoints } from "@/hooks/cabal";

export type UnitStatus = "dead" | "reserve" | "battle-shock" | undefined;
export type PhaseAction = "discard-mission";

interface GameValues {
  turn: number;
  phase?: Immutable.Phase;
  attackersTurn?: boolean;
  attacking: boolean;
  victoryPoints: number;
  commandPoints: number;
  cabalPoints: number;
  extraCabalPoints: number;
  unitStatuses: Map<string, UnitStatus>;
  ritualsUsed: Set<string>;
  stratagemsUsed: Set<string>;
  phaseActions: Set<PhaseAction>;
  sorceryChoice?: string;
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
  setListId: (listId: string) => void;
  toggleAttacking: () => void;
  toggleStatus: (unitId: string, target: UnitStatus) => void;
  setCabalPoints: (points: number) => void;
  addExtraCabalPoints: (points: number) => void;
  setVictoryPoints: (points: number) => void;
  adjustVictoryPoints: (by: number) => void;
  setCommandPoints: (points: number) => void;
  adjustCommandPoints: (by: number, stratagem?: string) => void;
  performRitual: (cost: number, ritual: string) => void;
  advancePhase: (to: Immutable.Phase, totalCabalPoints: number) => void;
  setSorceryChoice: (to: string) => void;
  discardSecondaryMission: () => void;
  resetGame: () => void;
}

// =============== Custom Hooks ===============

export function useGameValues<T>(selector: (values: GameValues) => T): T {
  return useGameStore((state: GameState) => {
    return selector(current(state.history));
  });
}

export function useNavigation(): { canGoBack: boolean; canGoForward: boolean } {
  return useGameStore((state: GameState) => ({
    canGoBack: canGoBack(state.history),
    canGoForward: canGoForward(state.history),
  }));
}

export function useAdvancePhase(): (to: Immutable.Phase) => void {
  const advancePhase = useGameStore((state) => state.advancePhase);
  const listId = useGameStore((state) => state.listId!);
  const { totalCabalPoints } = useTotalCabalPoints(listId);

  return (to) => advancePhase(to, totalCabalPoints);
}

// =============== Store ===============

export const useGameStore = create<GameState & GameHooks>()(
  persist(
    (set) => ({
      ...baseState(),
      // navigate
      back: () => set(produce(({ history }: GameState) => back(history))),
      forward: () => set(produce(({ history }: GameState) => forward(history))),
      // mutate
      setListId: (listId) =>
        set(
          produce((state: GameState) => {
            state.listId = listId;
          })
        ),
      toggleAttacking: () =>
        withHistory(set)((values) => {
          values.attacking = !values.attacking;
        }),
      toggleStatus: (unitId, target) =>
        withHistory(set)(({ unitStatuses }) => {
          const status = unitStatuses.get(unitId);
          const newStatus = target === status ? undefined : target;
          unitStatuses.set(unitId, newStatus);
        }),
      setCabalPoints: (points) =>
        withHistory(set)((values) => {
          values.cabalPoints = points;
        }),
      addExtraCabalPoints: (points) =>
        withHistory(set)((values) => {
          values.extraCabalPoints += points;
        }),
      setVictoryPoints: (points) =>
        withHistory(set)((values) => {
          values.victoryPoints = points;
        }),
      adjustVictoryPoints: (by) =>
        set(
          produce((state: GameState) => {
            // skip if not changing anything
            if (by === 0) return;

            const { history } = state;
            const values = copy(current(history));
            const { victoryPoints } = values;

            // skip if trying to reduce below 0
            const target = victoryPoints + by;
            if (target < 0) return;

            // perform victory point adjustment
            values.victoryPoints = target;
            push(history, values);
          })
        ),
      setCommandPoints: (points) =>
        withHistory(set)((values) => {
          values.commandPoints = points;
        }),
      adjustCommandPoints: (by, stratagem) =>
        set(
          produce((state: GameState) => {
            // skip if not changing anything
            if (by === 0) return;

            const { history } = state;
            const values = copy(current(history));
            const { commandPoints, stratagemsUsed } = values;

            // skip if already used this stratagem this phase
            if (stratagem && stratagemsUsed.has(stratagem)) return;

            // skip if trying to reduce below 0
            const target = commandPoints + by;
            if (target < 0) return;

            // perform command point adjustment and record ritual used
            values.commandPoints = target;
            if (stratagem) stratagemsUsed.add(stratagem);
            push(history, values);
          })
        ),
      performRitual: (cost, ritual) =>
        set(
          produce((state: GameState) => {
            if (cost === 0) return;

            const { history } = state;
            const values = copy(current(history));
            const { cabalPoints, ritualsUsed } = values;

            // skip if already used this ritual this phase
            if (ritual && ritualsUsed.has(ritual)) return;

            // skip if trying to reduce below 0
            const target = cabalPoints - cost;
            if (target < 0) return;

            // perform cabal point adjustment and record ritual used
            values.cabalPoints = target;
            ritualsUsed.add(ritual);
            push(history, values);
          })
        ),
      advancePhase: (to, totalCabalPoints) =>
        withHistory(set)((values) => {
          values.phase = to;
          // reset rituals used
          values.ritualsUsed = new Set();
          values.stratagemsUsed = new Set();
          values.phaseActions = new Set();

          if (to === "movement" && values.attackersTurn === values.attacking) {
            // increase cabal points at end of player's Command Phase
            values.cabalPoints = totalCabalPoints;
          }

          if (to === "command") {
            // always bump command points
            values.commandPoints += 1;
            // toggle turn
            values.attackersTurn = !values.attackersTurn;
            // if now attacker's turn, increase turn counter
            if (values.attackersTurn) values.turn += 1;
            // reset extra cabal points
            if (values.attackersTurn === values.attacking) {
              values.extraCabalPoints = 0;
            }
          }
        }),
      setSorceryChoice: (choice) =>
        set(
          produce((state: GameState) => {
            const { history } = state;
            const values = current(history);

            const { attackersTurn, attacking, phase } = values;
            const unlocked = attackersTurn === attacking && phase === "command";

            if (unlocked) {
              values.sorceryChoice = choice;
              dropFuture(history);
            }
          })
        ),
      discardSecondaryMission: () =>
        withHistory(set)((values) => {
          values.phaseActions.add("discard-mission");
          values.commandPoints += 1;
        }),
      resetGame: () =>
        set(
          produce((state: GameState) => {
            const { history } = baseState();
            state.history = history;
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

// =============== Helper Functions ===============

function baseState(): GameState {
  const history = createHistory<GameValues>(20);
  push(history, {
    turn: 0,
    attacking: true,
    victoryPoints: 0,
    commandPoints: 0,
    cabalPoints: 0,
    extraCabalPoints: 0,
    unitStatuses: new Map(),
    ritualsUsed: new Set<string>(),
    stratagemsUsed: new Set<string>(),
    phaseActions: new Set<PhaseAction>(),
  });
  return { history };
}

function copy(values: GameValues): GameValues {
  const { unitStatuses, ritualsUsed, stratagemsUsed, phaseActions, ...others } =
    values;
  return {
    ...others,
    unitStatuses: new Map(unitStatuses),
    ritualsUsed: new Set(ritualsUsed),
    stratagemsUsed: new Set(stratagemsUsed),
    phaseActions: new Set(phaseActions),
  };
}

type Mutation = (values: GameValues) => void;
type FullState = GameState & GameHooks;
type Setter = (partial: (state: FullState) => FullState) => void;

function updateHistory(state: GameState, mutate: Mutation) {
  const { history } = state;
  const values = copy(current(history));
  mutate(values);
  push(history, values);
}

const withHistory = (set: Setter) => (mutate: Mutation) => {
  return set(
    produce((state: GameState) =>
      updateHistory(state, (values) => mutate(values))
    )
  );
};
