import { useGameStore } from "@/stores/game";

export const Turn = () => {
  const turn = useGameStore((state) => state.current().turn);

  return (
    <div className="min-w-7 text-center text-lg border rounded shadow-inner">
      {turn}
    </div>
  );
};
