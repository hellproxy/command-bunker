import { AdvancePhaseButton } from "../button/advance-button";
import { Phase } from "./phase";
import { RitualButton } from "../button/ritual-button";
import { Swords } from "lucide-react";
import { Toggle } from "@/components/toggle";
import { useInfoStore } from "@/stores/info";

export const FightPhase = () => {
  const setInfo = useInfoStore((state) => state.setInfo);

  return (
    <Phase name="Fight Phase" icon={<Swords size={20} />}>
      <div className="flex flex-col py-2">
        <div className="game-interaction py-1.5">
          <span className="grow my-0.5 text-sm">
            Use Ritual:{" "}
            <span
              className="info-on-click"
              onClick={() => setInfo("twist-of-fate")}
            >
              Twist of Fate
            </span>
          </span>
          <RitualButton ritual="twist-of-fate" />
        </div>
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
