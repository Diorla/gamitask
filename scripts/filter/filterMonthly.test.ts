import MockDate from "mockdate";
import Task from "../../props/Task";
import filterMonthly from "./filterMonthly";

MockDate.set("2021-09-21T09:00"); // Tue Sep 21st, 9 o'clock

/**
 * if it's due today
 *  done => completed -
 *  not done
 *    time before now => overdue -
 *    time after now => today -
 * due before today
 *  done between last due and before today => upcoming -
 *  done today => completed -
 *  not done => overdue -
 * else => upcoming
 */
// completed today
const completedTodayTask: Task = {
  time: "12:00",
  reminder: { dateInMonth: 21 }, // Jan, Mar, Sept
  done: [new Date("2021-09-21T08:00").valueOf()], // done today (Sep 21st)
  date: "",
  id: "1234",
  name: "completedTodayTask",
  repeat: false,
  labels: "",
  priority: 1,
  difficulty: 2,
  project: "",
  countdowns: {},
  points: {},
  modified: 1619614840000,
};

// today but overdue
const overdueTodayTask: Task = {
  time: "06:00",
  reminder: { dateInMonth: 21 }, // Jan, Mar, Sept
  done: [], // not done yet
  date: "",
  id: "1234",
  name: "overdueTodayTask",
  repeat: false,
  labels: "",
  priority: 1,
  difficulty: 2,
  project: "",
  countdowns: {},
  points: {},
  modified: new Date("2021-06-21T08:00").valueOf(),
};

// today
const todayTask: Task = {
  time: "12:00",
  reminder: { dateInMonth: 21 }, // Jan, Mar, Sept
  done: [],
  date: "",
  id: "1234",
  name: "todayTask",
  repeat: false,
  labels: "",
  priority: 1,
  difficulty: 2,
  project: "",
  countdowns: {},
  points: {},
  modified: new Date("2021-06-21T08:00").valueOf(),
};

// future
const upcomingTask: Task = {
  time: "12:00",
  reminder: { dateInMonth: 23 },
  done: [new Date("2021-08-27T08:00").valueOf()], // done today (Sep 21st)
  date: "",
  id: "1234",
  name: "upcomingTask",
  repeat: false,
  labels: "",
  priority: 1,
  difficulty: 2,
  project: "",
  countdowns: {},
  points: {},
  modified: new Date("2021-06-21T08:00").valueOf(),
};

// overdue before today
const overdueB4Task: Task = {
  time: "12:00",
  reminder: { dateInMonth: 25 },
  done: [],
  date: "",
  id: "1234",
  name: "overdueB4Task",
  repeat: false,
  labels: "",
  priority: 1,
  difficulty: 2,
  project: "",
  countdowns: {},
  points: {},
  modified: new Date("2021-04-21T08:00").valueOf(), // April
};

// it was completed today, but overdue before today
const completedTodayB4Task: Task = {
  time: "12:00",
  reminder: { dateInMonth: 25 },
  done: [new Date("2021-09-21T08:00").valueOf()], // done today (Sep 21st)
  date: "",
  id: "1234",
  name: "completedTodayB4Task",
  repeat: false,
  labels: "",
  priority: 1,
  difficulty: 2,
  project: "",
  countdowns: {},
  points: {},
  modified: new Date("2021-04-21T08:00").valueOf(), // April
};

describe("Testing monthly filter", () => {
  test("should return monthly values", () => {
    expect(filterMonthly(completedTodayTask)).toBe("completed");
    expect(filterMonthly(overdueTodayTask)).toBe("overdue");
    expect(filterMonthly(todayTask)).toBe("today");
    expect(filterMonthly(upcomingTask)).toBe("upcoming");
    expect(filterMonthly(overdueB4Task)).toBe("overdue");
    expect(filterMonthly(completedTodayB4Task)).toBe("completed");
  });
});
