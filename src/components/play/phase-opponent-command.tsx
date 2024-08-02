import { AdvancePhaseButton } from "./advance";
import { Phase } from "./phase";

export const OpponentCommmandPhase = () => {
  return (
    <Phase name="Opponent's Command Phase">
      <div className="px-2 py-4 text-gray-400 text-sm">
        Waiting on your opponent. Just sit tight...
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="movement">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
