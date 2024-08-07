export interface GameHistory<T> {
  head: number;
  size: number;
  offset: number;
  items: T[];
}

export function createHistory<T>(capacity: number): GameHistory<T> {
  return {
    head: 0,
    size: 0,
    offset: 0,
    items: Array(capacity).fill(null),
  };
}

export function push<T>(history: GameHistory<T>, item: T): void {
  const { head, size, offset, items } = history;
  const capacity = items.length;

  const index = (head + size - offset) % capacity;

  items[index] = item;
  dropFuture(history);

  if (history.size == capacity) {
    history.head++;
  } else {
    history.size++;
  }
}

export function dropFuture<T>(history: GameHistory<T>): void {
  history.size -= history.offset;
  history.offset = 0;
}

export function canGoBack<T>(history: GameHistory<T>): boolean {
  const { size, offset } = history;
  return offset < size - 1;
}

export function back<T>(history: GameHistory<T>): void {
  if (canGoBack(history)) {
    history.offset++;
  }
}

export function canGoForward<T>(history: GameHistory<T>): boolean {
  const { offset } = history;
  return offset > 0;
}

export function forward<T>(history: GameHistory<T>): void {
  if (canGoForward(history)) {
    history.offset--;
  }
}

export function current<T>(history: GameHistory<T>): T {
  const { head, size, offset, items } = history;
  const capacity = items.length;

  const index = (head + size - 1 - offset) % capacity;
  return items[index];
}
