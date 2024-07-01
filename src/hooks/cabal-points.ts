import { useGameStore } from "@/stores/game";
import { useListStore } from "@/stores/lists";
import { useUnitData } from "./data";

export const useTotalCabalPoints = (listId: string) => {
  const statuses = useGameStore((state) => state.unitStatuses);
  const list = useListStore((state) => state.getList(listId));
  const { data, error, isLoading } = useUnitData();

  if (!data) {
    return { error, isLoading };
  }

  const totalCabalPoints = Array.from(list.units)
    .filter(([id]) => statuses.get(id) === undefined)
    .map(([, { type }]) => data.indexedUnits.get(type)!)
    .reduce((sum, { cabalPoints }) => sum + (cabalPoints || 0), 0);

  return { totalCabalPoints, error, isLoading };
};
