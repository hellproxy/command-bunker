import {
  back,
  canGoBack,
  canGoForward,
  createHistory,
  current,
  forward,
  push,
} from "@/stores/history-utils";
import { describe } from "node:test";
import { expect, test } from "@jest/globals";
import { replacer, reviver } from "@/stores/utils";

describe("Game History", () => {
  const gameHistory = createHistory(5);

  // (empty history)
  test("base", () => {
    expect(current(gameHistory)).toBeUndefined();
    expect(canGoBack(gameHistory)).toBeFalsy();
    expect(canGoForward(gameHistory)).toBeFalsy();
  });

  // [1]
  //  ^
  test("push an item", () => {
    push(gameHistory, 1);

    expect(current(gameHistory)).toBe(1);
    expect(gameHistory.size).toBe(1);
    expect(canGoBack(gameHistory)).toBeFalsy();
    expect(canGoForward(gameHistory)).toBeFalsy();
  });

  // [1, 2]
  //     ^
  test("push another item", () => {
    push(gameHistory, 2);

    expect(current(gameHistory)).toBe(2);
    expect(gameHistory.size).toBe(2);
    expect(canGoBack(gameHistory)).toBeTruthy();
    expect(canGoForward(gameHistory)).toBeFalsy();
  });

  // [1, 2]
  //  ^
  test("go back", () => {
    back(gameHistory);

    expect(current(gameHistory)).toBe(1);
    expect(gameHistory.size).toBe(2);
    expect(canGoBack(gameHistory)).toBeFalsy();
    expect(canGoForward(gameHistory)).toBeTruthy();
  });

  // [1, 2]
  //  ^
  test("go back again fails", () => {
    back(gameHistory);

    expect(current(gameHistory)).toBe(1);
    expect(gameHistory.size).toBe(2);
    expect(canGoBack(gameHistory)).toBeFalsy();
    expect(canGoForward(gameHistory)).toBeTruthy();
  });

  // [1, 3]
  //     ^
  test("push another item", () => {
    push(gameHistory, 3);

    expect(current(gameHistory)).toBe(3);
    expect(gameHistory.size).toBe(2);
    expect(canGoBack(gameHistory)).toBeTruthy();
    expect(canGoForward(gameHistory)).toBeFalsy();
  });

  // [1, 3, 4, 5, 6]
  //              ^
  test("push it to the limit", () => {
    push(gameHistory, 4);
    push(gameHistory, 5);
    push(gameHistory, 6);

    expect(current(gameHistory)).toBe(6);
    expect(gameHistory.size).toBe(5);
    expect(canGoBack(gameHistory)).toBeTruthy();
    expect(canGoForward(gameHistory)).toBeFalsy();
  });

  // [7, 8, 4, 5, 6]
  //     ^
  test("push another item so the buffer wraps around", () => {
    push(gameHistory, 7);
    push(gameHistory, 8);

    expect(current(gameHistory)).toBe(8);
    expect(gameHistory.size).toBe(5);
    expect(canGoBack(gameHistory)).toBeTruthy();
    expect(canGoForward(gameHistory)).toBeFalsy();
  });

  // [7, 8, 4, 5, 6]
  //           ^
  test("go back past the buffer boundary", () => {
    back(gameHistory);
    back(gameHistory);
    back(gameHistory);

    expect(current(gameHistory)).toBe(5);
    expect(gameHistory.size).toBe(5);
    expect(canGoBack(gameHistory)).toBeTruthy();
    expect(canGoForward(gameHistory)).toBeTruthy();
  });

  // [10, 8, 4, 5, 9]
  //  ^
  test("push items over the buffer boundary again", () => {
    push(gameHistory, 9);
    push(gameHistory, 10);

    expect(current(gameHistory)).toBe(10);
    expect(gameHistory.size).toBe(4);
    expect(canGoBack(gameHistory)).toBeTruthy();
    expect(canGoForward(gameHistory)).toBeFalsy();
  });

  // [10, 8, 4, 5, 9]
  //            ^
  test("go back over the buffer boundary", () => {
    back(gameHistory);
    back(gameHistory);

    expect(current(gameHistory)).toBe(5);
    expect(gameHistory.size).toBe(4);
    expect(canGoBack(gameHistory)).toBeTruthy();
    expect(canGoForward(gameHistory)).toBeTruthy();
  });

  // [10, 8, 4, 5, 9]
  //  ^
  test("go forward over the buffer boundary", () => {
    forward(gameHistory);
    forward(gameHistory);

    expect(current(gameHistory)).toBe(10);
    expect(gameHistory.size).toBe(4);
    expect(canGoBack(gameHistory)).toBeTruthy();
    expect(canGoForward(gameHistory)).toBeFalsy();
  });

  test("serialize and deserialize", () => {
    const serialized = JSON.stringify(gameHistory, replacer);
    const deserialized = JSON.parse(serialized, reviver);

    expect(current(deserialized)).toBe(10);
    expect(deserialized.size).toBe(4);
    expect(canGoBack(deserialized)).toBeTruthy();
    expect(canGoForward(deserialized)).toBeFalsy();
  });
});
