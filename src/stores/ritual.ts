import { Ritual } from "./game";

const costs: { [ritual in Ritual]: number } = {
  "weaver-of-fates": 2,
  "temporal-surge": 5,
  "echoes-of-the-warp": 6,
  doombolt: 7,
  "twist-of-fate": 9,
};

export const cost = (ritual: Ritual): number => costs[ritual];

export const canPerformRitual = (
  ritual: Ritual,
  cabalPoints: number,
  ritualsUsed: Set<Ritual>
): boolean => cost(ritual) <= cabalPoints && !ritualsUsed.has(ritual);
