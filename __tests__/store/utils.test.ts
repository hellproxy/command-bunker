import { replacer, reviver } from "@/stores/utils";
import { expect, test } from "@jest/globals";
import { describe } from "node:test";

describe("Serialization/Deserialization", () => {
  test("map", () => {
    const map = new Map([[1, 2]]);

    const ser = JSON.stringify(map, replacer);
    const des: Map<number, number> = JSON.parse(ser, reviver);

    expect(des.size).toEqual(1);
    expect(des.get(1)).toEqual(2);
  });

  test("set", () => {
    const map = new Set([1, 2, 3]);

    const ser = JSON.stringify(map, replacer);
    const des: Set<number> = JSON.parse(ser, reviver);

    expect(des.size).toEqual(3);
    expect(des.has(1)).toBeTruthy();
    expect(des.has(2)).toBeTruthy();
    expect(des.has(3)).toBeTruthy();
  });
});
