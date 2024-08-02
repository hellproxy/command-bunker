import { Toggle } from "../toggle";
import { AdvancePhaseButton } from "./advance";
import { Phase } from "./phase";

export const ShootingPhase = () => {
  return (
    <Phase name="Shooting phase">
      <div className="flex flex-col py-2">
        <div className="game-interaction">
          <Toggle position="after">
            Use Stratagem:{" "}
            <span className="font-semibold">Ensorcelled Infusion</span>
          </Toggle>
        </div>
        <div className="game-interaction">
          <Toggle position="after">
            Use Ritual: <span className="font-semibold">Doombolt</span>
          </Toggle>
        </div>
        <div className="game-interaction">
          <Toggle position="after">
            Use Ritual: <span className="font-semibold">Twist of Fate</span>
          </Toggle>
        </div>
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="fight">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
