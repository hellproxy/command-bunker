import { Ritual, useCanPerformRitual, useGameStore } from "@/stores/game";

interface RitualButtonProps {
  ritual: Ritual;
}

export const RitualButton = ({ ritual }: RitualButtonProps) => {
  const canPerform = useCanPerformRitual(ritual);
  const performRitual = useGameStore((state) => state.performRitual);

  return (
    <button
      className="btn btn-blue py-0.5 px-1.5 text-sm disabled:bg-gray-300 disabled:text-gray-800"
      disabled={!canPerform}
      onClick={() => performRitual(ritual)}
    >
      Use
    </button>
  );
};
