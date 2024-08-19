"use client";

import { useBuild } from "@/hooks/navigate-build";
import { usePlay } from "@/hooks/navigate-play";
import { useGameStore } from "@/stores/game";
import { Hammer, Home, Play, RefreshCcw, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

export const MenuButton = () => {
  const [visible, setVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { play, listId, willReplace } = usePlay();
  const build = useBuild();
  const resetGame = useGameStore((state) => state.resetGame);

  useEventListener("mousemove", () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const timeout = setTimeout(() => setVisible(false), 2000);
    timeoutRef.current = timeout;
    if (!visible) {
      setVisible(true);
    }
  });

  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    if (showOptions) {
      setShowOptions(false);
    }
  });

  const opacity = getOpacity(showOptions, visible);
  const playing = pathname === "/play";

  return (
    <div className="fixed right-0 top-0 z-50 flex flex-col gap-2" ref={ref}>
      <button
        className={`p-2 bg-blue-600 text-white shadow-md rounded-bl-xl hover:opacity-100 ${opacity}`}
        onClick={() => setShowOptions((show) => !show)}
      >
        <Settings />
      </button>

      {showOptions && (
        <>
          {!["/", ""].includes(pathname) && (
            <button
              className="p-2 bg-blue-600 text-white rounded-l-xl opacity-80 hover:opacity-100 shadow-md"
              onClick={() => {
                router.push("/");
                setShowOptions(false);
              }}
            >
              <Home />
            </button>
          )}

          {!playing && listId && (
            <button
              className="relative p-2 bg-blue-600 text-white rounded-l-xl opacity-80 hover:opacity-100 shadow-md"
              onClick={play}
            >
              <Play />
              {willReplace && <WarningBubble />}
            </button>
          )}

          {playing && (
            <button
              className="p-2 bg-blue-600 text-white rounded-l-xl opacity-80 hover:opacity-100 shadow-md"
              onClick={build}
            >
              <Hammer strokeWidth={1.8} />
            </button>
          )}

          {playing && (
            <button
              className="relative p-2 bg-blue-600 text-white rounded-l-xl opacity-80 hover:opacity-100 shadow-md"
              onClick={resetGame}
            >
              <RefreshCcw />
              <WarningBubble />
            </button>
          )}
        </>
      )}
    </div>
  );
};

function getOpacity(showOptions: boolean, visible: boolean): string {
  if (showOptions) return "opacity-80";
  else if (visible) return "opacity-40";
  else return "opacity-20";
}

const WarningBubble = () => {
  return (
    <div className="absolute -top-1.5 -left-1.5 text-xs bg-red-500 rounded-full h-4 aspect-square font-bold">
      !
    </div>
  );
};
