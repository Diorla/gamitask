import filterDaily from "./filterDaily";
import MockDate from "mockdate";
import Task from "../../props/Task";
import { getDayBegin } from "../datetime-utils";
// completed
// overdue
// upcoming

MockDate.set("2021-09-21T09:00"); // Sep 21st, 9 o'clock

const completedTask: Task = {
  id: "1234",
  name: "archive",
  repeat: false,
  time: "11:00",
  date: "2021-09-21", // Sep 21st
  labels: "",
  priority: 1,
  reminder: {},
  difficulty: 2,
  // set it to the beginning of Sept 21st of
  done: [getDayBegin(new Date("2021-09-21"))],
  project: "",
  countdowns: {},
  points: {},
  modified: 1619614840000,
};

const overdueTask: Task = {
  id: "1234",
  name: "archive",
  repeat: false,
  time: "06:00", // 6 o'clock
  date: "2021-09-21", // Sep 21st
  labels: "",
  priority: 1,
  reminder: {},
  difficulty: 2,
  done: [],
  project: "",
  countdowns: {},
  points: {},
  modified: 1619614840000,
};

const todayTask: Task = {
  id: "1234",
  name: "archive",
  repeat: false,
  time: "12:00",
  date: "2021-09-21", // Sep 21st
  labels: "",
  priority: 1,
  reminder: {},
  difficulty: 2,
  done: [123456789],
  project: "",
  countdowns: {},
  points: {},
  modified: 1619614840000,
};

describe("testing filter daily", () => {
  test("should return appropriate daily", () => {
    expect(filterDaily(overdueTask)).toBe("overdue");
    expect(filterDaily(completedTask)).toBe("completed");
    expect(filterDaily(todayTask)).toBe("today");
  });
});
