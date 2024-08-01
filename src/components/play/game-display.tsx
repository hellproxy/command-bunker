import { useGameStore, useGameValues } from "@/stores/game";
import { PreGame } from "./pre-game";

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
        return <>It's your command phase</>;
      case "movement":
        return <></>;
      case "shooting":
        return <></>;
      case "fight":
        return <></>;
      case "turn-end":
        return <></>;
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
