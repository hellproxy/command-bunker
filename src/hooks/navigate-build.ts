import { useGameStore } from "@/stores/game";
import { useRouter } from "next/navigation";

export const useBuild = () => {
  const router = useRouter();
  const listId = useGameStore((state) => state.listId);

  return () => {
    if (listId) router.push(`/build/${listId}`);
  };
};
