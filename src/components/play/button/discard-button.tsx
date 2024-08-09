import { useGameStore, useGameValues } from "@/stores/game";
import { Goal } from "lucide-react";

const action = "discard-mission";

export const DiscardButton = () => {
  const discard = useGameStore((state) => state.discardSecondaryMission);
  const disabled = useGameValues((values) => values.phaseActions.has(action));

  return (
    <div className="flex flex-row items-baseline">
      <div className="flex flex-row items-center text-gray-400 text-sm gap-1">
        +1 <Goal className="text-blue-400" size={17.5} />
      </div>
      <button className="btn-use ml-3" disabled={disabled} onClick={discard}>
        Use
      </button>
    </div>
  );
};
