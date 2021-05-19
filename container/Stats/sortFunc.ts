import { reminderIndex } from "./reminder";

export const sortStreak = (
  prev: number,
  next: number,
  order: string,
  prevTimed: boolean,
  nextTimed: boolean
): number => {
  const prevValue = prevTimed ? -1 : prev;
  const nextValue = nextTimed ? -1 : next;
  if (order === "asc") {
    return prevValue > nextValue ? -1 : 1;
  }
  return nextValue > prevValue ? -1 : 1;
};

export const sortCountdowns = (
  prev: { [key: string]: { length: number }[] },
  next: { [key: string]: { length: number }[] },
  order: string,
  prevTimed: boolean,
  nextTimed: boolean
): number => {
  const keysA = Object.keys(prev || {});
  let totsA = 0;
  keysA.forEach((i) => {
    prev[i].forEach((j: { length: number }) => (totsA += j.length || 0));
  });

  const keysB = Object.keys(next || {});
  let totsB = 0;
  keysB.forEach((i) => {
    next[i].forEach((j: { length: number }) => (totsB += j.length || 0));
  });

  totsA = prevTimed ? totsA : -1;
  totsB = nextTimed ? totsB : -1;
  if (order === "asc") {
    return totsA - totsB;
  }
  return totsB - totsA;
};

export const sortReminder = (
  prevType: "daily" | "weekly" | "monthly" | "yearly",
  nextType: "daily" | "weekly" | "monthly" | "yearly",
  order: string,
  prevRepeat: boolean,
  nextRepeat: boolean
): number => {
  const prev = prevRepeat ? reminderIndex[prevType] : 0;
  const next = nextRepeat ? reminderIndex[nextType] : 0;
  if (order === "asc") {
    return prev > next ? -1 : 1;
  }
  return next > prev ? -1 : 1;
};
