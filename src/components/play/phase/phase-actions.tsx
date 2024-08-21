import { useInfoStore } from "@/stores/info";
import { StratagemButton } from "../button/stratagem-button";
import { RitualButton } from "../button/ritual-button";

interface StratagemProps {
  name: string;
  type: string;
}

export const Stratagem = ({ name, type }: StratagemProps) => {
  const setInfo = useInfoStore((state) => state.setInfo);

  return (
    <div className="game-interaction py-1.5">
      <span className="grow my-0.5 text-sm">
        Use Stratagem:{" "}
        <span className="info-on-click" onClick={() => setInfo(type)}>
          {name}
        </span>
      </span>
      <StratagemButton type={type} />
    </div>
  );
};

interface RitualProps {
  name: string;
  type: string;
}

export const Ritual = ({ name, type }: RitualProps) => {
  const setInfo = useInfoStore((state) => state.setInfo);

  return (
    <div className="game-interaction py-1.5">
      <span className="grow my-0.5 text-sm">
        Use Ritual:{" "}
        <span className="info-on-click" onClick={() => setInfo(type)}>
          {name}
        </span>
      </span>
      <RitualButton ritual={type} />
    </div>
  );
};
