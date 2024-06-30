import { PersistStorage, StorageValue } from "zustand/middleware";

export function createMapStorage<S>(baseState: () => S): PersistStorage<S> {
  return {
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
  };
}

export function replacer(_: any, value: any) {
  if (value instanceof Map) {
    return {
      __type: "Map",
      __data: Array.from(value.entries()),
    };
  }
  return value;
}

export function reviver(_: any, value: any) {
  if (value["__type"] === "Map") {
    const data = value["__data"];
    return new Map(data);
  }
  return value;
}
