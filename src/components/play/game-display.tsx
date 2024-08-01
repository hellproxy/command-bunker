import { useGameStore, useGameValues } from "@/stores/game";
import { PreGame } from "./pre-game";

export const GameDisplay = () => {
  const { turn, phase, attacking } = useGameValues(
    ({ turn, phase, attacking }) => ({
      turn,
      phase,
      attacking,
    })
  );

  if (turn == 0) {
    return <PreGame />;
  }

  if (attacking) {
    switch (phase) {
      case "command":
        return <></>;
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
        return <></>;
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
