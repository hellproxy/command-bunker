import { Crown } from "lucide-react";
import { Toggle } from "../../toggle";
import { AdvancePhaseButton } from "../button/advance-button";
import { Phase } from "./phase";

export const CommmandPhase = () => {
  return (
    <Phase name="Command Phase" icon={<Crown size={20} />}>
      <div className="flex flex-col py-2">
        <div className="game-interaction">
          <Toggle position="after">Draw a secondary mission card</Toggle>
        </div>
        <div className="game-interaction">
          <Toggle position="after">
            Choose a <span className="font-semibold">Kindred Sorcery</span>{" "}
            option
          </Toggle>
        </div>
        <div className="game-interaction">
          <Toggle position="after">
            Move a unit to reserve by activating{" "}
            <span className="font-semibold">Umbralefic Crystal</span>
          </Toggle>
        </div>
        <div className="game-interaction">
          <Toggle position="after">
            Activate each Exalted Sorcerer's{" "}
            <span className="font-semibold">Rebind Rubricae</span> ability
          </Toggle>
        </div>
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="movement">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
