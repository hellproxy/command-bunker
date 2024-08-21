import { Swords } from "lucide-react";
import { AdvancePhaseButton } from "../button/advance-button";
import { StratagemButton } from "../button/stratagem-button";
import { Phase } from "./phase";
import { RitualButton } from "../button/ritual-button";
import { useInfoStore } from "@/stores/info";

export const OpponentFightPhase = () => {
  const setInfo = useInfoStore((state) => state.setInfo);

  return (
    <Phase name="Opponent's Fight Phase" icon={<Swords size={20} />}>
      <div className="flex flex-col py-2">
        <div className="game-interaction py-1.5">
          <span className="grow my-0.5 text-sm">
            Use Ritual:{" "}
            <span
              className="info-on-click"
              onClick={() => setInfo("weaver-of-fates")}
            >
              Weaver of Fates
            </span>
          </span>
          <RitualButton ritual="weaver-of-fates" />
        </div>
        <div className="game-interaction py-1.5">
          <span className="grow my-0.5 text-sm">
            Use Stratagem:{" "}
            <span
              className="info-on-click"
              onClick={() => setInfo("destined-by-fate")}
            >
              Destined by Fate
            </span>
          </span>
          <StratagemButton type="destined-by-fate" />
        </div>
        <div className="game-interaction py-1.5">
          <span className="grow my-0.5 text-sm">
            Use Stratagem:{" "}
            <span
              className="info-on-click"
              onClick={() => setInfo("overwatch")}
            >
              Overwatch
            </span>
          </span>
          <StratagemButton type="overwatch" />
        </div>
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="turn-end">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
