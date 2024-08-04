import { useRituals } from "@/hooks/ritual";

interface RitualProps {
  ritual: Immutable.Ritual;
  canPerform: boolean;
  perform: () => void;
}

export const RitualDisplay = () => {
  const { rituals } = useRituals();

  return (
    <div className="flex flex-col bg-white rounded shadow-md px-4 py-2">
      {rituals.map((props, index) => (
        <RitualItem {...props} key={index} />
      ))}
    </div>
  );
};

const RitualItem = ({ ritual, canPerform, perform }: RitualProps) => {
  return (
    <div className="game-interaction py-1.5">
      <span className="grow my-0.5 text-sm font-semibold">{ritual.name}</span>
      <button className="btn-use" disabled={!canPerform} onClick={perform}>
        Use
      </button>
    </div>
  );
};
