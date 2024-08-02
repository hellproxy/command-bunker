import { Toggle } from "../toggle";
import { AdvancePhaseButton } from "./advance";
import { Phase } from "./phase";

export const MovementPhase = () => {
  return (
    <Phase name="Movement phase">
      <div className="flex flex-col py-2">
        <div className="game-interaction">
          <Toggle position="after">Set up units from reserve</Toggle>
        </div>
        <div className="game-interaction">
          <Toggle position="after">
            Use Daemon Prince with Wings'{" "}
            <span className="font-semibold">Aetherstride</span> ability
          </Toggle>
        </div>
        <div className="game-interaction">
          <Toggle position="after">
            Use Ritual: <span className="font-semibold">Temporal Surge</span>
          </Toggle>
        </div>
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="shooting">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
