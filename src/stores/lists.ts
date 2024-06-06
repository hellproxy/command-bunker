import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";
import { stat } from "fs";
import { list } from "postcss";

type Location = "ranged" | "melee" | "wargear";

interface ListState {
  // lists
  lists: ListBuilder.List[];
  getList: (listId: string) => ListBuilder.List;
  addList: () => void;
  removeList: (listId: string) => () => void;
  setName: (listId: string) => (name: string) => void;
  addUnit: (listId: string) => (unit: ListBuilder.Unit) => void;
  removeUnit: (listId: string, unitId: string) => () => void;
  isSelected: (
    listId: string,
    unitId: string,
    type: string,
    location: Location
  ) => boolean;
  setOption: (
    listId: string,
    unitId: string,
    type: string,
    location: Location
  ) => (value: boolean) => void;
}

export const useListStore = create<ListState>()(
  persist(
    (set, get) => ({
      lists: [],
      // list functions
      getList: (listId) => findList(get(), listId),
      addList: () =>
        set(
          produce((state) => {
            state.lists.push(newList());
          })
        ),
      removeList: (listId) => () =>
        set(
          produce((state) => {
            state.lists = state.lists.filter(byListIdNot(listId));
          })
        ),
      setName: (listId) => (name) =>
        set(
          produce((state) => {
            findList(state, listId).name = name.replace(/\r?\n|\r/gm, "");
          })
        ),
      // unit functions
      addUnit: (listId) => (unit) => {
        set(
          produce((state) => {
            findList(state, listId).units.push(unit);
          })
        );
      },
      removeUnit: (listId, unitId) => () => {
        set(
          produce((state) => {
            const list = findList(state, listId);
            list.units = list.units.filter((unit) => unit.id !== unitId);
          })
        );
      },
      // weapons and wargear
      isSelected: (listId, unitId, type, location) => {
        const selectable = findSelectable(
          get(),
          listId,
          unitId,
          type,
          location
        );
        return selectable.selected;
      },
      setOption: (listId, unitId, type, location) => (value) => {
        set(
          produce((state) => {
            const selectable = findSelectable(
              state,
              listId,
              unitId,
              type,
              location
            );
            selectable.selected = value;
          })
        );
      },
    }),
    {
      name: "list-storage",
    }
  )
);

function newList(): ListBuilder.List {
  return {
    listId: uuidv4(),
    name: "",
    units: [],
  };
}

function findList(state: ListState, listId: string): ListBuilder.List {
  return state.lists.find(byListId(listId))!;
}

function byListId(listId: string): (list: ListBuilder.List) => boolean {
  return (list) => list.listId === listId;
}

function byListIdNot(listId: string): (list: ListBuilder.List) => boolean {
  return (list) => list.listId !== listId;
}

function findUnit(list: ListBuilder.List, unitId: string): ListBuilder.Unit {
  return list.units.find((unit) => unit.id === unitId)!;
}

function getOptions(
  unit: ListBuilder.Unit,
  location: Location
): ListBuilder.Selectable[] {
  if (location === "ranged") {
    return unit.rangedWeaponOptions;
  } else if (location === "melee") {
    return unit.meleeWeaponOptions;
  } else {
    return unit.wargearOptions;
  }
}

function findOption(
  options: ListBuilder.Selectable[],
  type: string
): ListBuilder.Selectable {
  return options.find((option) => option.type === type)!;
}

function findSelectable(
  state: ListState,
  listId: string,
  unitId: string,
  type: string,
  location: Location
): ListBuilder.Selectable {
  const list = findList(state, listId);
  const unit = findUnit(list, unitId);
  const options = getOptions(unit, location);
  return findOption(options, type);
}
