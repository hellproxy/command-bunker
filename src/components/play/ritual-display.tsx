import { useRituals } from "@/hooks/ritual";
import { useInfoStore } from "@/stores/info";

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
  const { name, text } = ritual;
  const setInfo = useInfoStore((state) => state.setInfo);

  return (
    <div className="game-interaction py-1.5">
      <span
        className="grow my-0.5 text-sm font-semibold hover:text-blue-600 cursor-pointer"
        onClick={() => setInfo({ title: name, text })}
      >
        {ritual.name}
      </span>
      <button className="btn-use" disabled={!canPerform} onClick={perform}>
        Use
      </button>
    </div>
  );
};
