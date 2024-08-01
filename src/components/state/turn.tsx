import { useGameStore, useGameValues } from "@/stores/game";

export const Turn = () => {
  const turn = useGameValues(({ turn }) => turn);

  return (
    <div className="min-w-7 text-center text-lg border rounded shadow-inner">
      {turn}
    </div>
  );
};
