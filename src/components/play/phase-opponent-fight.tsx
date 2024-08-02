import { Toggle } from "../toggle";
import { AdvancePhaseButton } from "./advance";
import { Phase } from "./phase";

export const OpponentFightPhase = () => {
  return (
    <Phase name="Opponent's Fight Phase">
      <div className="flex flex-col py-2">
        <div className="game-interaction">
          <Toggle position="after">
            Use Stratagem: <span className="font-semibold">Overwatch</span>
          </Toggle>
        </div>
        <div className="game-interaction">
          <Toggle position="after">
            Use Stratagem:{" "}
            <span className="font-semibold">Destined by Fate</span>
          </Toggle>
        </div>
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="turn-end">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
