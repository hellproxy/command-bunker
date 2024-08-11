import { UnitStatus, useGameValues } from "@/stores/game";
import { useGetList } from "@/stores/lists";
import { Indices, useUnitData } from "./unit-data";

interface UseCabalPoints {
  totalCabalPoints: number;
  error?: any;
  isLoading: boolean;
}

export const useTotalCabalPoints = (listId: string): UseCabalPoints => {
  const statuses = useGameValues(({ unitStatuses }) => unitStatuses);
  const extraPoints = useGameValues(({ extraCabalPoints }) => extraCabalPoints);
  const list = useGetList(listId);
  const { data, error, isLoading } = useUnitData();

  if (!listId) {
    return { totalCabalPoints: 0, isLoading: true };
  }

  const totalCabalPoints = data
    ? calculateTotalCabalPoints(list, data, statuses) + extraPoints
    : 0;

  return { totalCabalPoints, error, isLoading };
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
