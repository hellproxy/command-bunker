import { useGameStore, useGameValues } from "@/stores/game";

export const CommandPoints = () => {
  const commandPoints = useGameValues(({ commandPoints }) => commandPoints);
  const adjustCommandPoints = useGameStore(
    (state) => state.adjustCommandPoints
  );

  return (
    <div className="inline-flex justify-start">
      <div className="min-w-7 text-center text-lg border shadow-inner rounded mr-2">
        {commandPoints}
      </div>
      <button
        className="min-w-[28px] text-sm font-semibold text-red-600 border-l border-t border-b rounded-s hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:z-10"
        onClick={() => adjustCommandPoints(-1)}
      >
        -1
      </button>
      <button
        className="min-w-[29px] text-sm font-semibold text-red-600 border rounded-e hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:z-10"
        onClick={() => adjustCommandPoints(-2)}
      >
        -2
      </button>
    </div>
  );
};
