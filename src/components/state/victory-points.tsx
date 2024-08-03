import { useGameStore, useGameValues } from "@/stores/game";
import { SetStateAction, useCallback, useEffect, useState } from "react";

function useShiftKey(
  setShiftHeld: (value: SetStateAction<boolean>) => void,
  value: boolean
) {
  return useCallback(({ key }: { key: string }) => {
    if (key === "Shift") setShiftHeld(value);
  }, []);
}

export const VictoryPoints = () => {
  const victoryPoints = useGameValues(({ victoryPoints }) => victoryPoints);
  const adjust = useGameStore((state) => state.adjustVictoryPoints);
  const [delta, setDelta] = useState(0);
  const [shiftHeld, setShiftHeld] = useState(false);

  const setShiftHeldToTrue = useShiftKey(setShiftHeld, true);
  const setShiftHeldToFalse = useShiftKey(setShiftHeld, false);

  useEffect(() => {
    document.addEventListener("keydown", setShiftHeldToTrue);
    document.addEventListener("keyup", setShiftHeldToFalse);
    return () => {
      document.removeEventListener("keydown", setShiftHeldToTrue);
      document.removeEventListener("keyup", setShiftHeldToFalse);
    };
  }, []);

  const deltaDisplay = delta > 0 ? `+${delta}` : delta < 0 ? `${delta}` : "-";
  const background = delta > 0 ? "btn-green" : delta < 0 ? "btn-red" : "";
  const plusMinus = shiftHeld ? 5 : 1;
  const minDelta = -victoryPoints;

  return (
    <div className="inline-flex ">
      <div className="min-w-7 text-center text-lg border rounded shadow-inner mr-2">
        {victoryPoints}
      </div>
      <button
        className="min-w-7 text-sm font-semibold border rounded-s hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:z-10"
        onClick={() =>
          setDelta((value) => Math.max(value - plusMinus, minDelta))
        }
      >
        -{plusMinus}
      </button>
      <button
        className={`min-w-[26px] text-sm font-semibold text-center text-lg border-t border-b 
          disabled:bg-gray-200 disabled:text-gray-800
          ${background}`}
        onClick={() => {
          setDelta(0);
          adjust(delta);
        }}
        disabled={!delta}
      >
        {deltaDisplay}
      </button>
      <button
        className="min-w-7 text-sm font-semibold border rounded-e hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:z-10"
        onClick={() => setDelta((value) => value + plusMinus)}
      >
        +{plusMinus}
      </button>
    </div>
  );
};
