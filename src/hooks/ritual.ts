import { useGameStore, useGameValues } from "@/stores/game";
import { useRitualData } from "./ritual-data";

interface UseRitual {
  ritual?: Immutable.Ritual;
  canPerform: boolean;
  perform: () => void;
}

export function useRitual(type: string): UseRitual {
  const { data } = useRitualData();
  const [cabalPoints, ritualsUsed] = useGameValues((values) => [
    values.cabalPoints,
    values.ritualsUsed,
  ]);
  const performRitual = useGameStore((state) => state.performRitual);

  const ritual = data?.get(type);

  if (ritual && !ritualsUsed.has(type)) {
    const { cost } = ritual;
    const canPerform = cost !== undefined && cost <= cabalPoints;
    const perform = () => performRitual(cost, type);

    return { ritual, canPerform, perform };
  } else {
    return { canPerform: false, perform: () => {} };
  }
}

interface UseRituals {
  rituals: {
    ritual: Immutable.Ritual;
    canPerform: boolean;
    perform: () => void;
  }[];
}

export function useRituals(): UseRituals {
  const { data } = useRitualData();
  const [cabalPoints, ritualsUsed, currentPhase, attacking, attackersTurn] =
    useGameValues((values) => [
      values.cabalPoints,
      values.ritualsUsed,
      values.phase,
      values.attacking,
      values.attackersTurn,
    ]);
  const performRitual = useGameStore((state) => state.performRitual);

  if (!data) {
    return { rituals: [] };
  }

  const rituals = Array.from(data.values()).map((ritual) => {
    const { type, cost, phase, turn } = ritual;

    const correctPhase = phase === "any" || phase === currentPhase;
    const playersTurn = attacking === attackersTurn;
    const correctTurn =
      turn === "any" ||
      (turn === "player" && playersTurn) ||
      (turn === "opponent" && !playersTurn);
    const alreadyUsed = ritualsUsed.has(type);
    const enoughPoints = cost <= cabalPoints;

    const canPerform =
      correctPhase && !alreadyUsed && enoughPoints && correctTurn;

    if (canPerform) {
      const perform = () => performRitual(ritual.cost, ritual.type);
      return { ritual, canPerform, perform };
    } else {
      const perform = () => {};
      return { ritual, canPerform, perform };
    }
  });

  return { rituals };
}
