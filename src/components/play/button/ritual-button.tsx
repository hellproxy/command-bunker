import { useRitual } from "@/hooks/ritual";
import { View } from "lucide-react";

interface RitualButtonProps {
  ritual: string;
}

export const RitualButton = ({ ritual: type }: RitualButtonProps) => {
  const { canPerform, perform, ritual } = useRitual(type);

  return (
    <div className="flex flex-row items-baseline">
      <div className="flex flex-row items-center text-gray-400 text-sm gap-1">
        {ritual ? ritual.cost : null}{" "}
        <View className="text-blue-400" size={17.5} />
      </div>
      <button className="btn-use ml-3" disabled={!canPerform} onClick={perform}>
        Use
      </button>
    </div>
  );
};
