import { CircleArrowRight } from "lucide-react";
import { AdvancePhaseButton } from "../button/advance-button";
import { StratagemButton } from "../button/stratagem-button";
import { Phase } from "./phase";
import { useInfoStore } from "@/stores/info";

export const OpponentMovementPhase = () => {
  const setInfo = useInfoStore((state) => state.setInfo);

  return (
    <Phase
      name="Opponent's Movement Phase"
      icon={<CircleArrowRight size={20} />}
    >
      <div className="flex flex-col py-2">
        <div className="game-interaction py-1.5">
          <span className="grow my-0.5 text-sm">
            Use Stratagem:{" "}
            <span
              className="info-on-click"
              onClick={() => setInfo("overwatch")}
            >
              Overwatch
            </span>
          </span>
          <StratagemButton type="overwatch" />
        </div>
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="shooting">Continue</AdvancePhaseButton>
      </div>
    </Phase>
  );
};
