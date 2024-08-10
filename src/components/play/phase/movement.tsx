import { Toggle } from "../../toggle";
import { AdvancePhaseButton } from "../button/advance-button";
import { Phase } from "./phase";
import { ArrowBigRight, CircleArrowRight } from "lucide-react";

export const MovementPhase = () => {
  return (
    <Phase name="Movement Phase" icon={<CircleArrowRight size={20} />}>
      <div className="flex flex-col py-2">
        <div className="game-interaction">
          <Toggle position="after">Set up units from reserve</Toggle>
        </div>
        <div className="game-interaction">
          <Toggle position="after">
            Return Daemon Prince with Wings to the battlefield using{" "}
            <span className="font-semibold">Aetherstride</span>
          </Toggle>
        </div>
        <div className="game-interaction">
          <Toggle position="after">
            Use Daemon Prince with Wings&apos;{" "}
            <span className="font-semibold">Sorcerous fire</span> ability
          </Toggle>
        </div>
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="shooting">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
