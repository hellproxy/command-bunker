import Fuse, { IFuseOptions } from "fuse.js";
import { useEffect, useState } from "react";
import { useUnitData } from "./data";

const options: IFuseOptions<SearchValue> = {
  keys: [
    "value.name",
    "value.coreAbilities",
    "value.tags",
    "value.alts.tags",
    "value.subAbilities.name",
    "value.subAbilities.tags",
  ],
  threshold: 0.3,
  includeMatches: true,
};

export interface SearchableUnit {
  model: "unit";
  value: Immutable.Unit;
}

export interface SearchableWeapon {
  model: "weapon";
  value: Immutable.Weapon;
  unitName: string;
}

export interface SearchableAbility {
  model: "ability";
  value: Immutable.Ability;
  unitName: string;
}

export type SearchValue = SearchableUnit | SearchableWeapon | SearchableAbility;

type Search = {
  searchEngine?: Fuse<SearchValue>;
  searchLoading?: boolean;
  searchError?: boolean;
};

const toSearchData = (units: Immutable.Unit[]) => {
  const searchData: SearchValue[] = [];

  units
    .map<SearchableUnit>((unit) => ({ model: "unit", value: unit }))
    .forEach((unit) => searchData.push(unit));

  units
    .flatMap<SearchableWeapon>((unit) =>
      (unit.meleeWeapons || []).map((weapon) => ({
        model: "weapon",
        value: weapon,
        unitName: unit.name,
      }))
    )
    .forEach((weapon) => searchData.push(weapon));

  units
    .flatMap<SearchableWeapon>((unit) =>
      (unit.rangedWeapons || []).map((weapon) => ({
        model: "weapon",
        value: weapon,
        unitName: unit.name,
      }))
    )
    .forEach((weapon) => searchData.push(weapon));

  units
    .flatMap<SearchableAbility>((unit) =>
      (unit.abilities || []).map((ability) => ({
        model: "ability",
        value: ability,
        unitName: unit.name,
      }))
    )
    .forEach((ability) => searchData.push(ability));

  return searchData;
};

export const useSearch = (): Search => {
  const [search, setSearch] = useState<Search>({ searchLoading: true });
  const { data, error } = useUnitData();

  useEffect(() => {
    if (data) {
      const searchData = toSearchData(data.units);
      const searchEngine = new Fuse(searchData, options);
      setSearch({ searchEngine, searchLoading: false });
    }
  }, [data]);

  return { ...search, searchError: error };
};
