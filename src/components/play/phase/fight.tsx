import { AdvancePhaseButton } from "../button/advance-button";
import { Phase } from "./phase";
import { Swords } from "lucide-react";
import { Toggle } from "@/components/toggle";
import { Ritual } from "./phase-actions";

export const FightPhase = () => {
  return (
    <Phase name="Fight Phase" icon={<Swords size={20} />}>
      <div className="flex flex-col py-2">
        <Ritual name="Twist of Fate" type="twist-of-fate" />
        <div className="game-interaction">
          <Toggle position="after">Declare and resolve charges</Toggle>
        </div>
        <div className="game-interaction">
          <Toggle position="after">Pile in with units that charged</Toggle>
        </div>
        <div className="game-interaction">
          <Toggle position="after">
            Consolidate units that have finished making their attacks
          </Toggle>
        </div>
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="turn-end">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
