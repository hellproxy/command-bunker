import { Swords } from "lucide-react";
import { AdvancePhaseButton } from "../button/advance-button";
import { Phase } from "./phase";
import { Ritual, Stratagem } from "./phase-actions";

export const OpponentFightPhase = () => {
  return (
    <Phase name="Opponent's Fight Phase" icon={<Swords size={20} />}>
      <div className="flex flex-col py-2">
        <Ritual name="Weaver of Fates" type="weaver-of-fates" />
        <Stratagem name="Destined By Fate" type="destined-by-fate" />
        <Stratagem name="Overwatch" type="overwatch" />
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="turn-end">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
