import { AdvancePhaseButton } from "../button/advance-button";
import { Phase } from "./phase";
import { RitualButton } from "../button/ritual-button";
import { StratagemButton } from "../button/stratagem-button";
import { Crosshair } from "lucide-react";
import { useInfoStore } from "@/stores/info";

export const OpponentShootingPhase = () => {
  const setInfo = useInfoStore((state) => state.setInfo);

  return (
    <Phase name="Opponent's Shooting Phase" icon={<Crosshair size={20} />}>
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
            </span>{" "}
          </span>
          <StratagemButton type="destined-by-fate" />
        </div>
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="fight">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
