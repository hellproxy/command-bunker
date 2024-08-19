import { useGameStore } from "@/stores/game";
import { usePathname, useRouter } from "next/navigation";

export const usePlay = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentGameId = useGameStore((state) => state.listId);
  const setListId = useGameStore((state) => state.setListId);

  const buildMatch = pathname.match(/^\/build\/([0-9a-f]+)$/);
  const buildId = buildMatch?.[1];
  const listId = buildId || currentGameId;

  const willReplace = buildId && currentGameId && buildId !== currentGameId;

  const play = () => {
    if (buildId) setListId(buildId);
    if (listId) router.push("/play");
  };

  return { play, willReplace, listId };
};
