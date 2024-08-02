import { PersistStorage } from "zustand/middleware";

export function createMapStorage<S>(baseState: () => S): PersistStorage<S> {
  return {
    getItem(name) {
      const str = localStorage.getItem(name);
      return {
        state: !str ? null : JSON.parse(str, reviver),
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
  if (value instanceof Set) {
    return {
      __type: "Set",
      __data: Array.from(value),
    };
  }
  return value;
}

export function reviver(_: any, value: any) {
  if (!value) return value;

  const type = value["__type"];

  if (type !== undefined) {
    switch (type) {
      case "Map":
        return new Map(value["__data"]);
      case "Set":
        return new Set(value["__data"]);
    }
  }

  return value;
}
