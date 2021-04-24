import Task from "../../props/Task";
import MockDate from "mockdate";
import filterOnce from "./filterOnce";
import { getDayBegin } from "../datetime-utils";

MockDate.set("2021-09-21T09:00"); // Sep 21st, 9 o'clock

describe("Testing filtering one time event", () => {
  const archivedTask: Task = {
    id: "1234",
    name: "archive",
    repeat: false,
    time: "11:00", // 11 am
    date: "2021-08-23", // Aug 23rd
    labels: "",
    priority: 1,
    reminder: {},
    difficulty: 2,
    done: [123456789],
    project: "",
    countdowns: {},
    points: {},
    modified: 1619614840000, // Apr 28
  };

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

  const overdueTaskToday: Task = {
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

  const overdueTask: Task = {
    id: "1234",
    name: "archive",
    repeat: false,
    time: "06:00", // 6 o'clock
    date: "2021-08-22", // Aug 22st
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
    done: [],
    project: "",
    countdowns: {},
    points: {},
    modified: 1619614840000,
  };

  const upcomingTask: Task = {
    id: "1234",
    name: "archive",
    repeat: false,
    time: "11:00",
    date: "2021-11-21", // Nov 21st
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
  test("should return appropriate", () => {
    expect(filterOnce(overdueTaskToday)).toBe("overdue");
    expect(filterOnce(overdueTask)).toBe("overdue");
    expect(filterOnce(archivedTask)).toBe("archived");
    expect(filterOnce(completedTask)).toBe("completed");
    expect(filterOnce(todayTask)).toBe("today");
    expect(filterOnce(upcomingTask)).toBe("upcoming");
  });
});
