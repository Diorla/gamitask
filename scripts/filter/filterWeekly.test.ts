import filterWeekly from "./filterWeekly";
import MockDate from "mockdate";
import Task from "../../props/Task";

MockDate.set("2021-09-21T09:00"); // Tue Sep 21st, 9 o'clock

// completed today
const completedTodayTask: Task = {
  time: "12:00",
  reminder: { days: [0, 2, 5] }, // Sun, Tue, Fri
  done: [new Date("2021-09-21T10:00").valueOf()],
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
// completed before today
const DueButCompletedToday: Task = {
  time: "12:00",
  reminder: { days: [0, 3, 5] }, // Sun, Wed, Fri
  done: [new Date("2021-09-21T09:00").valueOf()], // Done on Tue (Today)
  date: "",
  id: "1234",
  name: "DueButCompletedToday",
  repeat: false,
  labels: "",
  priority: 1,
  difficulty: 2,
  project: "",
  countdowns: {},
  points: {},
  modified: 1631865600000, // Fri, Sep 17
};

// overdue today
const overdueTodayTask: Task = {
  time: "06:00",
  reminder: { days: [0, 2, 5] }, // Sun, Tue, Fri
  done: [], // Done on Tue
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
  modified: 1631865600000, // Fri, Sep 17
};

// overdue before today
const overdueBeforeTodayTask: Task = {
  time: "18:00", // 6 pm, on Sun
  reminder: { days: [0, 3, 5] }, // Sun, Wed, Fri
  done: [], // Never done
  date: "",
  id: "1234",
  name: "overdueBeforeTodayTask",
  repeat: false,
  labels: "",
  priority: 1,
  difficulty: 2,
  project: "",
  countdowns: {},
  points: {},
  modified: 1631865600000, // Fri, Sep 17
};

// due today
const todayTask: Task = {
  time: "18:00", // 6 pm, on Sun
  reminder: { days: [0, 2, 5] }, // Sun, Tue, Fri
  done: [new Date("2021-09-20T09:00").valueOf()], // Done on Mon
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
  modified: 1631865600000, // Fri, Sep 17
};

// upcoming
const upcomingTask: Task = {
  time: "06:00",
  reminder: { days: [3, 4] }, // Wed, Thur
  done: [],
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
  modified: 1631865600000, // Fri, Sep 17
};

describe("testing filter daily", () => {
  test("should return appropriate daily", () => {
    // completed today
    expect(filterWeekly(completedTodayTask)).toBe("completed");
    // completed before today
    expect(filterWeekly(DueButCompletedToday)).toBe("completed");
    // overdue today
    expect(filterWeekly(overdueTodayTask)).toBe("overdue");
    // overdue before today
    expect(filterWeekly(overdueBeforeTodayTask)).toBe("overdue");
    // today
    expect(filterWeekly(todayTask)).toBe("today");
    // upcoming
    expect(filterWeekly(upcomingTask)).toBe("upcoming");
  });
});
