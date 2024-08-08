import { useGameStore, useGameValues } from "@/stores/game";
import { ValueEditor } from "./value-editor";

export const CommandPoints = () => {
  const commandPoints = useGameValues(({ commandPoints }) => commandPoints);
  const adjustPoints = useGameStore((state) => state.adjustCommandPoints);
  const setPoints = useGameStore((state) => state.setCommandPoints);

  return (
    <div className="inline-flex justify-start">
      <ValueEditor value={commandPoints} setValue={setPoints} />
      <button
        className="min-w-[28px] text-sm font-semibold text-red-600 border-l border-t border-b rounded-s
        hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:z-10
        ml-2"
        onClick={() => adjustPoints(-1)}
      >
        -1
      </button>
      <button
        className="min-w-[29px] text-sm font-semibold text-red-600 border rounded-e
        hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:z-10"
        onClick={() => adjustPoints(-2)}
      >
        -2
      </button>
    </div>
  );
};
