import { UnitStatus, useGameStore, useGameValues } from "@/stores/game";
import { useListStore } from "@/stores/lists";
import { Indices, useUnitData } from "./data";
import { useCallback } from "react";

interface UseCabalPoints {
  totalCabalPoints?: number;
  resetCabalPoints?: () => void;
  error: any;
  isLoading: boolean;
}

export const useTotalCabalPoints = (listId: string): UseCabalPoints => {
  const statuses = useGameValues(({ unitStatuses }) => unitStatuses);
  const setCabalPoints = useGameStore((state) => state.setCabalPoints);

  const list = useListStore((state) => state.getList(listId));
  const { data, error, isLoading } = useUnitData();

  const totalCabalPoints = data
    ? calculateTotalCabalPoints(list, data, statuses)
    : 0;

  const resetCabalPoints = useCallback(() => {
    setCabalPoints(totalCabalPoints);
  }, [totalCabalPoints]);

  if (!data) {
    return { error, isLoading };
  }

  return { totalCabalPoints, resetCabalPoints, error, isLoading };
};

const calculateTotalCabalPoints = (
  list: ListBuilder.List,
  indices: Indices,
  statuses: Map<string, UnitStatus>
) => {
  return Array.from(list.units)
    .filter(([id]) => statuses.get(id) === undefined)
    .map(([, { type }]) => indices.indexedUnits.get(type)!)
    .reduce((sum, { cabalPoints }) => sum + (cabalPoints || 0), 0);
};
