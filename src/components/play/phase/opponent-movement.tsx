import { Toggle } from "../../toggle";
import { AdvancePhaseButton } from "../button/advance-button";
import { Phase } from "./phase";

export const OpponentMovementPhase = () => {
  return (
    <Phase name="Opponent's Movement Phase">
      <div className="flex flex-col py-2">
        <div className="game-interaction">
          <Toggle position="after">
            Use Stratagem: <span className="font-semibold">Overwatch</span>
          </Toggle>
        </div>
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="shooting">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
