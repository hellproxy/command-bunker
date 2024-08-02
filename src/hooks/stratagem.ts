import { useGameStore, useGameValues } from "@/stores/game";
import { useStratagemData } from "./stratagem-data";

interface UseStratagem {
  stratagem?: Immutable.Stratagem;
  canPerform: boolean;
  perform: () => void;
}

function cannotUse(): UseStratagem {
  return { canPerform: false, perform: () => {} };
}

export function useStratagem(type: string): UseStratagem {
  const { data } = useStratagemData();
  const adjust = useGameStore((state) => state.adjustCommandPoints);
  const [commandPoints, stratagemsUsed] = useGameValues((values) => [
    values.commandPoints,
    values.stratagemsUsed,
  ]);

  if (!data) {
    return cannotUse();
  } else if (stratagemsUsed.has(type)) {
    return cannotUse();
  } else {
    const stratagem = data.get(type);
    const cost = stratagem?.cost;
    const canPerform = cost !== undefined && cost <= commandPoints;
    const perform = () => adjust(-(cost || 0), type);

    return { canPerform, stratagem, perform };
  }
}
