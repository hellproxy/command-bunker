import { Toggle } from "../toggle";
import { AdvancePhaseButton } from "./advance";
import { Phase } from "./phase";
import { RitualButton } from "./ritual-button";

export const OpponentShootingPhase = () => {
  return (
    <Phase name="Opponent's Shooting Phase">
      <div className="flex flex-col py-2">
        <div className="game-interaction py-1.5">
          <span className="grow my-0.5 text-sm">
            Use Ritual: <span className="font-semibold">Weaver of Fates</span>
          </span>
          <RitualButton ritual="weaver-of-fates" />
        </div>
        <div className="game-interaction">
          <Toggle position="after">
            Use Stratagem:{" "}
            <span className="font-semibold">Destined by Fate</span>
          </Toggle>
        </div>
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="fight">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
