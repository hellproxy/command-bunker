import { Toggle } from "../../toggle";
import { AdvancePhaseButton } from "../button/advance-button";
import { Phase } from "./phase";

export const TurnEndPhase = () => {
  return (
    <Phase name="End of turn">
      <div className="flex flex-col py-2">
        <div className="game-interaction">
          <Toggle position="after">
            Draw a secondary mission card (+1 CP)
          </Toggle>
        </div>
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="command">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
