import { Toggle } from "../toggle";
import { AdvancePhaseButton } from "./advance";
import { Phase } from "./phase";

export const FightPhase = () => {
  return (
    <Phase name="Fight phase">
      <div className="flex flex-col py-2">
        <div className="game-interaction">
          <Toggle position="after">
            Use Ritual: <span className="font-semibold">Twist of Fate</span>
          </Toggle>
        </div>
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="turn-end">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
