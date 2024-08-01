import { useGameStore, useGameValues } from "@/stores/game";
import { Toggle } from "../toggle";

export const PreGame = () => {
  return (
    <div className="flex flex-col divide-y bg-white rounded shadow-md px-4">
      <div className="text-lg mt-2">Pre-Game</div>
      <div className="flex flex-col gap-2 py-2">
        <AttackingPlayerToggle />
        <Toggle position="after">Select units to start in reserve</Toggle>
      </div>
    </div>
  );
};

const AttackingPlayerToggle = () => {
  const attacking = useGameValues((values) => values.attacking);
  const toggleAttacking = useGameStore((state) => state.toggleAttacking);

  return (
    <Toggle position="after" checked={attacking} onClick={toggleAttacking}>
      I am the attacking player
    </Toggle>
  );
};
