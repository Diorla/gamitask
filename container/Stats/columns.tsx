import { formatCountdown, formatReminder } from "./formatter";
import { sortCountdowns, sortReminder } from "./sortFunc";

export default [
  {
    dataField: "name",
    text: "Name",
    sort: true,
  },
  {
    dataField: "time",
    text: "Time",
    sort: true,
  },
  // {
  //   dataField: "streak",
  //   text: "Streak",
  //   formatter: (row: number, col: { timed: number }): JSX.Element | string =>
  //     formatStreak(row, col.timed),
  //   sort: true,
  //   sortFunc: (
  //     prev: number,
  //     next: number,
  //     order: string,
  //     rowA: { timed: boolean },
  //     rowB: { timed: boolean }
  //   ): number => sortStreak(prev, next, order, rowA.timed, rowB.timed),
  // },
  // {
  //   dataField: "dailyPoints",
  //   text: "Points",
  //   formatter: (
  //     row: { [x: string]: number[] },
  //     col: { timed: number }
  //   ): JSX.Element | string => formatPoints(row, col.timed),
  //   sort: true,
  // },
  {
    dataField: "countdowns",
    text: "Time spent",
    formatter: (
      row: { [x: string]: { length: number }[] },
      col: { timed: number }
    ): JSX.Element | string => formatCountdown(row, col.timed),
    sort: true,
    sortFunc: (
      prev: { [key: string]: { length: number }[] },
      next: { [key: string]: { length: number }[] },
      order: string,
      _dataField: string,
      rowA: { timed: boolean },
      rowB: { timed: boolean }
    ): number => sortCountdowns(prev, next, order, rowA.timed, rowB.timed),
  },
  {
    dataField: "reminder",
    text: "Type",
    formatter: (
      row: { type: string },
      col: { repeat: boolean }
    ): JSX.Element | string => formatReminder(row.type, col.repeat),
    sort: true,
    sortFunc: (
      prev: { type: "daily" | "weekly" | "monthly" | "yearly" },
      next: { type: "daily" | "weekly" | "monthly" | "yearly" },
      order: string,
      _dataField: string,
      rowA: { repeat: boolean },
      rowB: { repeat: boolean }
    ): number =>
      sortReminder(prev.type, next.type, order, rowA.repeat, rowB.repeat),
  },
  {
    dataField: "done",
    text: "Done",
    formatter: (done: number[]): number => done.length,
    sort: true,
    sortFunc: (prev: number[], next: number[], order: string): number => {
      if (order === "asc") return prev.length - next.length;
      return next.length - prev.length;
    },
  },
];
