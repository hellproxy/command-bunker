import { useAdvancePhase } from "@/stores/game";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  nextPhase: Immutable.Phase;
}>;

export const AdvancePhaseButton = ({ nextPhase, children }: Props) => {
  const advancePhase = useAdvancePhase();

  return (
    <button
      className="btn btn-green w-full"
      onClick={() => advancePhase(nextPhase)}
    >
      {children}
    </button>
  );
};
