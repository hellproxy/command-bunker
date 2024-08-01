import { useGameValues } from "@/stores/game";

export const VictoryPoints = () => {
  const victoryPoints = useGameValues(({ victoryPoints }) => victoryPoints);

  return (
    <div className="min-w-7 text-center text-lg border rounded shadow-inner">
      {victoryPoints}
    </div>
  );
};
