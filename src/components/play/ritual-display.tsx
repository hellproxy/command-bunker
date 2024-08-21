import { useRituals } from "@/hooks/ritual";
import { useInfoStore } from "@/stores/info";
import { View } from "lucide-react";

interface RitualProps {
  ritual: Immutable.Ritual;
  canPerform: boolean;
  perform: () => void;
}

export const RitualDisplay = () => {
  const { rituals } = useRituals();

  return (
    <div className="flex flex-col bg-white rounded shadow-md px-3 py-2">
      <div className="text-md p-2">Rituals</div>
      <div className="flex flex-col">
        {rituals.map((props, index) => (
          <RitualItem {...props} key={index} />
        ))}
      </div>
    </div>
  );
};

const RitualItem = ({ ritual, canPerform, perform }: RitualProps) => {
  const setInfo = useInfoStore((state) => state.setInfo);

  return (
    <div className="game-interaction py-1.5 items-baseline">
      <span
        className="grow my-0.5 text-sm info-on-click"
        onClick={() => setInfo(ritual.type)}
      >
        {ritual.name}
      </span>
      <div className="flex flex-row items-center text-gray-400 text-sm gap-1">
        {ritual ? ritual.cost : null}
        <View size={17.5} className="text-blue-400" />
      </div>
      <button
        className="btn-use ml-3 min-w-9"
        disabled={!canPerform}
        onClick={perform}
      >
        Use
      </button>
    </div>
  );
};
