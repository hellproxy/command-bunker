import { Flag } from "lucide-react";
import { Toggle } from "../../toggle";
import { AdvancePhaseButton } from "../button/advance-button";
import { Phase } from "./phase";

export const TurnEndPhase = () => {
  return (
    <Phase name="End of turn" icon={<Flag size={20} />}>
      <div className="flex flex-col py-2">
        <div className="game-interaction">
          <Toggle position="after">
            Optionally discard a secondary mission card to gain 1 CP
          </Toggle>
        </div>
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="command">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
