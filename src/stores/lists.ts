import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce, enableMapSet } from "immer";
import { v4 as uuidv4 } from "uuid";
import { stat } from "fs";

enableMapSet();

interface ListState {
  // lists
  lists: Map<string, ListBuilder.List>;
  getList: (listId: string) => ListBuilder.List;
  addList: () => void;
  removeList: (listId: string) => () => void;
  setName: (listId: string) => (name: string) => void;
  addUnit: (listId: string) => (unit: ListBuilder.Unit) => void;
  removeUnit: (listId: string, unitId: string) => () => void;
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
      storage: {
        getItem(name) {
          const str = localStorage.getItem(name);
          return {
            state: str == null ? baseState() : JSON.parse(str, reviver),
          };
        },
        setItem(name, value) {
          const str = JSON.stringify(value.state, replacer);
          localStorage.setItem(name, str);
        },
        removeItem(name) {
          localStorage.removeItem(name);
        },
      },
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

function replacer(key: any, value: any) {
  if (value instanceof Map) {
    return {
      __type: "Map",
      __data: Array.from(value.entries()),
    };
  }
  return value;
}

function reviver(key: any, value: any) {
  if (value["__type"] === "Map") {
    const data = value["__data"];
    return new Map(data);
  }
  return value;
}
