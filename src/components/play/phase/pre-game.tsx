import { useAdvancePhase, useGameStore, useGameValues } from "@/stores/game";
import { Toggle } from "../../toggle";
import { Phase } from "./phase";
import { AdvancePhaseButton } from "../button/advance-button";

export const PreGame = () => {
  return (
    <Phase name="Game setup">
      <div className="flex flex-col py-2">
        <AttackingPlayerToggle />
        <UnitsReserveCheck />
      </div>
      <div className="flex justify-center mb-1">
        <AdvancePhaseButton nextPhase="command">Begin game</AdvancePhaseButton>
      </div>
    </Phase>
  );
};

const AttackingPlayerToggle = () => {
  const attacking = useGameValues((values) => values.attacking);
  const toggleAttacking = useGameStore((state) => state.toggleAttacking);

  return (
    <div className="game-interaction">
      <Toggle position="after" checked={attacking} onClick={toggleAttacking}>
        I am the{" "}
        <span className="font-semibold text-blue-600">
          {attacking ? "attacking" : "defending"}
        </span>{" "}
        player
      </Toggle>
    </div>
  );
};

const UnitsReserveCheck = () => {
  return (
    <div className="game-interaction">
      <Toggle position="after">Select units to start in reserve</Toggle>
    </div>
  );
};
