import { useGameStore, useGameValues } from "@/stores/game";
import { useStratagemData } from "./codex-data";

interface UseStratagem {
  stratagem?: Immutable.Stratagem;
  canPerform: boolean;
  perform: () => void;
}

export function useStratagem(type: string): UseStratagem {
  const { data } = useStratagemData();
  const [commandPoints, stratagemsUsed] = useGameValues((values) => [
    values.commandPoints,
    values.stratagemsUsed,
  ]);
  const adjust = useGameStore((state) => state.adjustCommandPoints);

  const stratagem = data?.get(type);

  if (stratagem && !stratagemsUsed.has(type)) {
    const { cost } = stratagem;
    const canPerform = cost !== undefined && cost <= commandPoints;
    const perform = () => adjust(-cost, type);

    return { stratagem, canPerform, perform };
  } else {
    return { stratagem, canPerform: false, perform: () => {} };
  }
}
