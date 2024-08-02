import { useRitual } from "@/hooks/ritual";

interface RitualButtonProps {
  ritual: string;
}

export const RitualButton = ({ ritual }: RitualButtonProps) => {
  const { canPerform, perform } = useRitual(ritual);

  return (
    <button className="btn-use" disabled={!canPerform} onClick={perform}>
      Use
    </button>
  );
};
