import { useSorceryData } from "@/hooks/codex-data";
import { useGameStore, useGameValues } from "@/stores/game";
import { useInfoStore } from "@/stores/info";

export const SorceriesDisplay = () => {
  const { data, isLoading } = useSorceryData();

  if (isLoading) return <div>Loading</div>;
  if (!data) return <div>Error</div>;

  return (
    <div className="flex flex-row items-baseline bg-white rounded shadow-md px-5 py-2">
      <div className="text-md">Sorceries</div>
      <div className="flex flex-row ml-auto gap-2">
        {Array.from(data.values()).map((sorcery, index) => (
          <SorceryButton key={index} {...sorcery} />
        ))}
      </div>
    </div>
  );
};

const SorceryButton = ({ type, name, text }: Immutable.Sorcery) => {
  const setSorceryChoice = useGameStore((state) => state.setSorceryChoice);
  const setInfo = useInfoStore((state) => state.setInfo);
  const [sorceryChoice, attacking, attackersTurn, phase] = useGameValues(
    (values) => [
      values.sorceryChoice,
      values.attacking,
      values.attackersTurn,
      values.phase,
    ]
  );

  const unlocked = attackersTurn === attacking && phase === "command";
  const chosen = type === sorceryChoice;

  const opacity = unlocked ? "opacity-100" : "opacity-50";
  const color = chosen ? "btn-blue" : "btn-gray";

  return (
    <button
      className={`btn text-sm cursor-pointer ${opacity} ${color}`}
      type="button"
      onClick={() => {
        if (unlocked) setSorceryChoice(type);
        setInfo(type);
      }}
      value={name}
    >
      {name}
    </button>
  );
};
