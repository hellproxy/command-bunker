import { Ritual, useCanPerformRitual, useGameStore } from "@/stores/game";

interface RitualButtonProps {
  ritual: Ritual;
}

export const RitualButton = ({ ritual }: RitualButtonProps) => {
  const enabled = useCanPerformRitual(ritual);
  const performRitual = useGameStore((state) => state.performRitual);

  return (
    <button
      className="btn-use"
      disabled={!enabled}
      onClick={() => performRitual(ritual)}
    >
      Use
    </button>
  );
};
