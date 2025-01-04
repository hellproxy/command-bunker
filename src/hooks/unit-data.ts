import { parse } from "yaml";
import useSWR from "swr";

export const useUnitData = () => {
  return useSWR("units", () => fetchAllUnits(unitFiles), {
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
  });
};

export interface Indices {
  units: Immutable.Unit[];
  indexedUnits: Map<string, Immutable.Unit>;
  indexedWeapons: Map<string, Immutable.Weapon>;
  indexedAbilities: Map<string, Immutable.Ability>;
  orders: Orders;
}

type Orders = { [section in Immutable.Section]: string[] };

export const unitFiles = [
  // leaders
  "/units/magnus-the-red.yml",
  "/units/ahriman.yml",
  "/units/daemon-prince.yml",
  "/units/daemon-prince-with-wings.yml",
  "/units/exalted-sorcerer.yml",
  "/units/exalted-sorcerer-on-disc.yml",
  "/units/sorcerer-in-terminator-armour.yml",
  // infantry
  "/units/rubricae.yml",
  "/units/scarab-occult-terminators.yml",
  "/units/tzaangors.yml",
  "/units/cultists.yml",
  // nonInfantry
  "/units/tzaangor-enlightened.yml",
  "/units/chaos-spawn.yml",
  "/units/rhino.yml",
  "/units/helbrute.yml",
  "/units/heldrake.yml",
  "/units/predator-annihilator.yml",
  // allies
  "/units/pink-horrors.yml",
  "/units/screamers.yml",
];

export const fetchAllUnits = (urls: string[]): Promise<Indices> =>
  Promise.all(urls.map(fetchUnit)).then(indexUnits);

const fetchUnit = async (path: string): Promise<Immutable.Unit> => {
  const response = await fetch(path);
  const text = await response.text();
  return parse(text);
};

const indexUnits = (units: Immutable.Unit[]): Indices => {
  const indexedUnits = units.reduce((map, unit) => {
    map.set(unit.type, unit);
    return map;
  }, new Map<string, Immutable.Unit>());

  const indexedWeapons = units
    .flatMap((unit) =>
      (unit.rangedWeapons || []).concat(unit.meleeWeapons || [])
    )
    .reduce((map, weapon) => {
      map.set(weapon.type, weapon);
      return map;
    }, new Map<string, Immutable.Weapon>());

  const indexedAbilities = units
    .flatMap((unit) => unit.abilities || [])
    .reduce((map, ability) => {
      map.set(ability.type, ability);
      return map;
    }, new Map<string, Immutable.Ability>());

  const orders: Orders = {
    characters: [],
    infantry: [],
    nonInfantry: [],
    allies: [],
  };

  units.forEach((unit) => orders[unit.section].push(unit.type));

  return {
    units,
    indexedUnits,
    indexedWeapons,
    indexedAbilities,
    orders,
  };
};
