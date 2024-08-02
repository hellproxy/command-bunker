import { useGameValues } from "@/stores/game";
import { PreGame } from "./phase/pre-game";
import { CommmandPhase } from "./phase/command";
import { MovementPhase } from "./phase/movement";
import { ShootingPhase } from "./phase/phase-shooting";
import { FightPhase } from "./phase/fight";
import { TurnEndPhase } from "./phase/turn-end";
import { OpponentCommmandPhase } from "./phase/opponent-command";
import { OpponentMovementPhase } from "./phase/opponent-movement";
import { OpponentShootingPhase } from "./phase/opponent-shooting";
import { OpponentFightPhase } from "./phase/opponent-fight";
import { OpponentTurnEndPhase } from "./phase/opponent-turn-end";

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
        return <OpponentCommmandPhase />;
      case "movement":
        return <OpponentMovementPhase />;
      case "shooting":
        return <OpponentShootingPhase />;
      case "fight":
        return <OpponentFightPhase />;
      case "turn-end":
        return <OpponentTurnEndPhase />;
    }
  }
};
