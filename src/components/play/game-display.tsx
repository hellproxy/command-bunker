import { useGameStore, useGameValues } from "@/stores/game";
import { PreGame } from "./phase-pre-game";
import { CommmandPhase } from "./phase-command";
import { MovementPhase } from "./phase-movement";
import { ShootingPhase } from "./phase-shooting";
import { FightPhase } from "./phase-fight";
import { TurnEndPhase } from "./phase-turn-end";

export const GameDisplay = () => {
  const { turn, phase, attacking, attackersTurn } = useGameValues(
    ({ turn, phase, attacking, attackersTurn }) => ({
      turn,
      phase,
      attacking,
      attackersTurn,
    })
  );

  if (turn == 0) {
    return <PreGame />;
  }

  const playersTurn = attacking === attackersTurn;
  if (playersTurn) {
    switch (phase) {
      case "command":
        return <CommmandPhase />;
      case "movement":
        return <MovementPhase />;
      case "shooting":
        return <ShootingPhase />;
      case "fight":
        return <FightPhase />;
      case "turn-end":
        return <TurnEndPhase />;
    }
  } else {
    switch (phase) {
      case "command":
        return <>It's their command phase</>;
      case "movement":
        return <></>;
      case "shooting":
        return <></>;
      case "fight":
        return <></>;
      case "turn-end":
        return <></>;
    }
  }
};
