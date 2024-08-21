import { AdvancePhaseButton } from "../button/advance-button";
import { Phase } from "./phase";
import { RitualButton } from "../button/ritual-button";
import { Crosshair } from "lucide-react";
import { StratagemButton } from "../button/stratagem-button";
import { useInfoStore } from "@/stores/info";

export const ShootingPhase = () => {
  const setInfo = useInfoStore((state) => state.setInfo);

  return (
    <Phase name="Shooting Phase" icon={<Crosshair size={20} />}>
      <div className="flex flex-col py-2">
        <div className="game-interaction py-1.5">
          <span className="grow my-0.5 text-sm">
            Use Ritual:{" "}
            <span
              className="info-on-click"
              onClick={() => setInfo("temporal-surge")}
            >
              Temporal Surge
            </span>
          </span>
          <RitualButton ritual="temporal-surge" />
        </div>
        <div className="game-interaction py-1.5">
          <span className="grow my-0.5 text-sm">
            Use Ritual:{" "}
            <span className="info-on-click" onClick={() => setInfo("doombolt")}>
              Doombolt
            </span>
          </span>
          <RitualButton ritual="doombolt" />
        </div>
        <div className="game-interaction py-1.5">
          <span className="grow my-0.5 text-sm">
            Use Ritual:{" "}
            <span
              className="info-on-click"
              onClick={() => setInfo("twist-of-fate")}
            >
              Twist of Fate
            </span>
          </span>
          <RitualButton ritual="twist-of-fate" />
        </div>
        <div className="game-interaction py-1.5">
          <span className="grow my-0.5 text-sm">
            Use Stratagem:{" "}
            <span
              className="info-on-click"
              onClick={() => setInfo("ensorcelled-infusion")}
            >
              Ensorcelled Infusion
            </span>
          </span>
          <StratagemButton type="ensorcelled-infusion" />
        </div>
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="fight">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
