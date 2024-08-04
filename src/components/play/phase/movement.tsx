import { Toggle } from "../../toggle";
import { AdvancePhaseButton } from "../button/advance-button";
import { Phase } from "./phase";
import { RitualButton } from "../button/ritual-button";

export const MovementPhase = () => {
  return (
    <Phase name="Movement Phase">
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
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="shooting">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
