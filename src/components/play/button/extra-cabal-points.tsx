import { useGameStore } from "@/stores/game";
import { View } from "lucide-react";

export const ExtraCabalPointsButton = () => {
  const add = useGameStore((state) => state.addExtraCabalPoints);

  return (
    <div className="flex flex-row items-baseline">
      <div className="flex flex-row items-center text-gray-400 text-sm gap-1">
        +1 <View className="text-blue-400" size={17.5} />
      </div>
      <button className="btn-use ml-3" onClick={() => add(1)}>
        Use
      </button>
    </div>
  );
};
