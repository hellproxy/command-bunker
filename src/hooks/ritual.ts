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
