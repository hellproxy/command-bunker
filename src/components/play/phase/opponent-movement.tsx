import { CircleArrowRight } from "lucide-react";
import { AdvancePhaseButton } from "../button/advance-button";
import { Phase } from "./phase";
import { Stratagem } from "./phase-actions";

export const OpponentMovementPhase = () => {
  return (
    <Phase
      name="Opponent's Movement Phase"
      icon={<CircleArrowRight size={20} />}
    >
      <div className="flex flex-col py-2">
        <Stratagem name="Overwatch" type="overwatch" />
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="shooting">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
