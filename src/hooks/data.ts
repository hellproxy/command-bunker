import { parse } from "yaml";
import useSWR from "swr";

export const useUnitData = () => {
  return useSWR("data", () => fetchAllUnits(unitFiles), {
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
  });
};

interface OrderedUnit {
  unit: Immutable.Unit;
  order: number;
}

interface Indices {
  indexedUnits: Map<string, Immutable.Unit>;
  indexedWeapons: Map<string, Immutable.Weapon>;
  indexedAbilities: Map<string, Immutable.Ability>;
  orders: Orders;
}

type Orders = { [section in Immutable.Section]: string[] };

export const unitFiles = ["/units/rubricae.yml"];

export const fetchAllUnits = (urls: string[]): Promise<Indices> =>
  Promise.all(urls.map(fetchUnit)).then(indexUnits);

const fetchUnit = async (path: string, order: number): Promise<OrderedUnit> => {
  const response = await fetch(path);
  const text = await response.text();
  const unit: Immutable.Unit = parse(text);
  return { unit, order };
};

const indexUnits = (units: OrderedUnit[]): Indices => {
  const indexedUnits = units.reduce((map, { unit }) => {
    map.set(unit.type, unit);
    return map;
  }, new Map<string, Immutable.Unit>());

  const indexedWeapons = units
    .flatMap(({ unit }) => unit.rangedWeapons.concat(unit.meleeWeapons))
    .reduce((map, weapon) => {
      map.set(weapon.type, weapon);
      return map;
    }, new Map<string, Immutable.Weapon>());

  const indexedAbilities = units
    .flatMap(({ unit }) => unit.abilities)
    .reduce((map, ability) => {
      map.set(ability.type, ability);
      return map;
    }, new Map<string, Immutable.Ability>());

  const orderedUnits = units.reduce((map, { unit, order }) => {
    map.set(order, unit);
    return map;
  }, new Map<number, Immutable.Unit>());

  const orders: Orders = {
    characters: [],
    infantry: [],
    nonInfantry: [],
  };
  for (let order = 0; order < orderedUnits.size; order++) {
    const unit = orderedUnits.get(order)!;
    orders[unit.section].push(unit.type);
  }

  return {
    indexedUnits,
    indexedWeapons,
    indexedAbilities,
    orders,
  };
};
