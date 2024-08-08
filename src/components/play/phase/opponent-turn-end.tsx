import { Flag } from "lucide-react";
import { Toggle } from "../../toggle";
import { AdvancePhaseButton } from "../button/advance-button";
import { Phase } from "./phase";

export const OpponentTurnEndPhase = () => {
  return (
    <Phase name="Opponent's end of turn" icon={<Flag size={20} />}>
      <div className="flex flex-col py-2">
        <div className="game-interaction">
          <Toggle position="after">
            Remove Daemon Prince with Wings from the battlefield using{" "}
            <span className="font-semibold">Aetherstride</span>
          </Toggle>
        </div>
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="command">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
