import { AdvancePhaseButton } from "../button/advance-button";
import { Phase } from "./phase";
import { RitualButton } from "../button/ritual-button";

export const FightPhase = () => {
  return (
    <Phase name="Fight Phase">
      <div className="flex flex-col py-2">
        <div className="game-interaction py-1.5">
          <span className="grow my-0.5 text-sm">
            Use Ritual: <span className="font-semibold">Twist of Fate</span>
          </span>
          <RitualButton ritual="twist-of-fate" />
        </div>
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="turn-end">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
