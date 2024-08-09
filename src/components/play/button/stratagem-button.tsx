import { useStratagem } from "@/hooks/stratagem";
import { Goal } from "lucide-react";

interface StratagemButtonProps {
  type: string;
}

export const StratagemButton = ({ type }: StratagemButtonProps) => {
  const { canPerform, perform, stratagem } = useStratagem(type);

  return (
    <div className="flex flex-row items-baseline">
      <div className="flex flex-row items-center text-gray-400 text-sm gap-1">
        -{stratagem ? stratagem.cost : null}{" "}
        <Goal className="text-blue-400" size={17.5} />
      </div>
      <button className="btn-use ml-3" disabled={!canPerform} onClick={perform}>
        Use
      </button>
    </div>
  );
};
