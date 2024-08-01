import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce, enableMapSet } from "immer";
import { v4 as uuidv4 } from "uuid";
import { createMapStorage } from "./utils";

enableMapSet();

interface ListState {
  lists: Map<string, ListBuilder.List>;
  unitJustAdded?: string;
  // list functions
  addList: () => void;
  removeList: (listId: string) => () => void;
  setName: (listId: string) => (name: string) => void;
  // unit functions
  addUnit: (listId: string) => (unit: ListBuilder.Unit) => void;
  removeUnit: (listId: string, unitId: string) => () => void;
  // weapons and wargear
  setOption: (
    listId: string,
    unitId: string,
    location: ListBuilder.Location,
    type: string
  ) => (value: boolean) => void;
}

export function useGetList(listId: string): ListBuilder.List {
  return useListStore((state) => state.lists.get(listId)!);
}

export const useListStore = create<ListState>()(
  persist(
    (set) => ({
      ...baseState(),
      // list functions
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
      removeUnit: (listId, unitId) => () => {
        set(
          produce((state: ListState) => {
            state.lists.get(listId)!.units.delete(unitId);
          })
        );
      },
      // weapons and wargear
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
