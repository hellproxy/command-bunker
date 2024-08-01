import { useAdvancePhase, useGameStore, useGameValues } from "@/stores/game";
import { Toggle } from "../toggle";

export const PreGame = () => {
  return (
    <div className="flex flex-col divide-y bg-white rounded shadow-md px-4 py-2">
      <div className="text-lg px-2 pb-1">Game setup</div>
      <div>
        <div className="flex flex-col py-2">
          <AttackingPlayerToggle />
          <UnitsReserveCheck />
        </div>
        <div className="flex justify-center mb-1">
          <BeginButton />
        </div>
      </div>
    </div>
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

const BeginButton = () => {
  const advancePhase = useAdvancePhase();

  return (
    <button
      className="btn btn-green w-full"
      onClick={() => advancePhase("command")}
    >
      Begin game
    </button>
  );
};
