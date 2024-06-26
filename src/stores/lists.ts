import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce, enableMapSet } from "immer";
import { v4 as uuidv4 } from "uuid";
import { createMapStorage, replacer, reviver } from "./utils";

enableMapSet();

interface ListState {
  lists: Map<string, ListBuilder.List>;
  unitJustAdded?: string;
  // list functions
  getList: (listId: string) => ListBuilder.List;
  addList: () => void;
  removeList: (listId: string) => () => void;
  setName: (listId: string) => (name: string) => void;
  // unit functions
  addUnit: (listId: string) => (unit: ListBuilder.Unit) => void;
  wasJustAdded: (unitId: string) => boolean;
  removeUnit: (listId: string, unitId: string) => () => void;
  // weapons and wargear
  isSelected: (
    listId: string,
    unitId: string,
    location: ListBuilder.Location,
    type: string
  ) => boolean;
  setOption: (
    listId: string,
    unitId: string,
    location: ListBuilder.Location,
    type: string
  ) => (value: boolean) => void;
}

export const useListStore = create<ListState>()(
  persist(
    (set, get) => ({
      ...baseState(),
      // list functions
      getList: (listId) => get().lists.get(listId)!,
      addList: () =>
        set(
          produce((state: ListState) => {
            const list = newList();
            state.lists.set(list.listId, list);
          })
        ),
      removeList: (listId) => () =>
        set(
          produce((state: ListState) => {
            state.lists.delete(listId);
          })
        ),
      setName: (listId) => (name) =>
        set(
          produce((state: ListState) => {
            state.lists.get(listId)!.name = name.replace(/\r?\n|\r/gm, "");
          })
        ),
      // unit functions
      addUnit: (listId) => (unit) => {
        set(
          produce((state: ListState) => {
            state.unitJustAdded = unit.id;
            state.lists.get(listId)!.units.set(unit.id, unit);
          })
        );
      },
      wasJustAdded: (unitId) => get().unitJustAdded === unitId,
      removeUnit: (listId, unitId) => () => {
        set(
          produce((state: ListState) => {
            state.lists.get(listId)!.units.delete(unitId);
          })
        );
      },
      // weapons and wargear
      isSelected: (listId, unitId, location, type) => {
        return get()
          .lists.get(listId)!
          .units.get(unitId)!
          .options.get(location)!
          .get(type)!;
      },
      setOption: (listId, unitId, location, type) => (value) => {
        set(
          produce((state: ListState) => {
            state.lists
              .get(listId)!
              .units.get(unitId)!
              .options.get(location)!
              .set(type, value);
          })
        );
      },
    }),
    {
      name: "list-storage",
      storage: createMapStorage(baseState),
    }
  )
);

function newList(): ListBuilder.List {
  return {
    listId: uuidv4().substring(0, 8),
    name: "",
    units: new Map(),
  };
}

function baseState() {
  return {
    lists: new Map(),
  };
}
