import { useCallback, useEffect } from "react";

export const useHotkey = (onKeyPress: (event: KeyboardEvent) => void) => {
  const handleKeyPress = useCallback(onKeyPress, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
};
