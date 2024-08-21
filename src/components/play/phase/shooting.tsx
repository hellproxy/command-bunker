import { AdvancePhaseButton } from "../button/advance-button";
import { Phase } from "./phase";
import { Crosshair } from "lucide-react";
import { useInfoStore } from "@/stores/info";
import { Ritual, Stratagem } from "./phase-actions";

export const ShootingPhase = () => {
  const setInfo = useInfoStore((state) => state.setInfo);

  return (
    <Phase name="Shooting Phase" icon={<Crosshair size={20} />}>
      <div className="flex flex-col py-2">
        <Ritual name="Temporal Surge" type="temporal-surge" />
        <Ritual name="Doombolt" type="doombolt" />
        <Ritual name="Twist of Fate" type="twist-of-fate" />
        <Stratagem name="Ensorcelled Infusion" type="ensorcelled-infusion" />
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="fight">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
