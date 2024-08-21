import { AdvancePhaseButton } from "../button/advance-button";
import { Phase } from "./phase";
import { Crosshair } from "lucide-react";
import { Ritual, Stratagem } from "./phase-actions";

export const OpponentShootingPhase = () => {
  return (
    <Phase name="Opponent's Shooting Phase" icon={<Crosshair size={20} />}>
      <div className="flex flex-col py-2">
        <Ritual name="Weaver of Fates" type="weaver-of-fates" />
        <Stratagem name="Destined By Fate" type="destined-by-fate" />
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="fight">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
