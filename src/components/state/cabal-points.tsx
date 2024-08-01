import { useTotalCabalPoints } from "@/hooks/cabal-points";
import { useGameValues } from "@/stores/game";

interface CabalPointsProps {
  listId: string;
}

export const CabalPoints = ({ listId }: CabalPointsProps) => {
  const cabalPoints = useGameValues(({ cabalPoints }) => cabalPoints);
  const { totalCabalPoints, error } = useTotalCabalPoints(listId);

  if (error) return <div>Failed to load</div>;
  if (!totalCabalPoints) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-11 w-full">
      <div className="flex col-span-5 justify-end">
        <div className="min-w-7 text-center text-lg border rounded shadow-inner">
          {cabalPoints}
        </div>
      </div>
      <div className="col-span-1 text-center text-lg">/</div>
      <div className="flex col-span-5 justify-start">
        <div className="min-w-7 text-center text-lg border rounded shadow-inner">
          {totalCabalPoints}
        </div>
      </div>
    </div>
  );
};
