import { useStratagem } from "@/hooks/stratagem";

interface StratagemButtonProps {
  type: string;
}

export const StratagemButton = ({ type }: StratagemButtonProps) => {
  const { canPerform, perform } = useStratagem(type);

  return (
    <button className="btn-use" disabled={!canPerform} onClick={perform}>
      Use
    </button>
  );
};
