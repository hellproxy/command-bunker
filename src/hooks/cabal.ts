import { UnitStatus, useGameValues } from "@/stores/game";
import { useGetList } from "@/stores/lists";
import { Indices, useUnitData } from "./unit-data";
import { useEnhancements } from "./enhancements";

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
  const { allocation } = useEnhancements(listId);

  if (!listId) {
    return { totalCabalPoints: 0, isLoading: true };
  }

  const scrollPoints = calculateScrollsPoints(allocation, statuses);

  const cabalPoints = data
    ? calculateTotalCabalPoints(list, data, statuses)
    : 0;

  const totalCabalPoints = cabalPoints + extraPoints + scrollPoints;

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

const calculateScrollsPoints = (
  allocation: Map<Immutable.EnhancementType, string>,
  statuses: Map<string, UnitStatus>
) => {
  const unitWithScrolls = allocation.get("athenaean-scrolls");
  if (unitWithScrolls) {
    return +!statuses.get(unitWithScrolls);
  } else {
    return 0;
  }
};
