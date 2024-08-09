import { Flag } from "lucide-react";
import { Toggle } from "../../toggle";
import { AdvancePhaseButton } from "../button/advance-button";
import { Phase } from "./phase";
import { DiscardButton } from "../button/discard-button";

export const TurnEndPhase = () => {
  return (
    <Phase name="End of turn" icon={<Flag size={20} />}>
      <div className="flex flex-col py-2">
        <div className="game-interaction">
          <span className="grow my-0.5 text-sm">
            Optionally discard a secondary mission card
          </span>
          <DiscardButton />
        </div>
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="command">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
