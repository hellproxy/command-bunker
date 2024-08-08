import { Toggle } from "../../toggle";
import { AdvancePhaseButton } from "../button/advance-button";
import { Phase } from "./phase";
import { RitualButton } from "../button/ritual-button";
import { Crosshair } from "lucide-react";

export const ShootingPhase = () => {
  return (
    <Phase name="Shooting Phase" icon={<Crosshair size={20} />}>
      <div className="flex flex-col py-2">
        <div className="game-interaction py-1.5">
          <span className="grow my-0.5 text-sm">
            Use Ritual: <span className="font-semibold">Temporal Surge</span>
          </span>
          <RitualButton ritual="temporal-surge" />
        </div>
        <div className="game-interaction py-1.5">
          <span className="grow my-0.5 text-sm">
            Use Ritual: <span className="font-semibold">Doombolt</span>
          </span>
          <RitualButton ritual="doombolt" />
        </div>
        <div className="game-interaction py-1.5">
          <span className="grow my-0.5 text-sm">
            Use Ritual: <span className="font-semibold">Twist of Fate</span>
          </span>
          <RitualButton ritual="twist-of-fate" />
        </div>
        <div className="game-interaction">
          <Toggle position="after">
            Use Stratagem:{" "}
            <span className="font-semibold">Ensorcelled Infusion</span>
          </Toggle>
        </div>
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="fight">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
