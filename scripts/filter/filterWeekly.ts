import dayjs from "dayjs";
import Task from "../../props/Task";
import dayDifference from "./dayDifference";
import filterTypes from "./filterTypes";

// TODO: Another variable to add is "last_modified"
/**
 * For example, if I created it today, it shouldn't go back in time to see anything
 * @param day
 * @param dayList
 * @returns
 */
function getNearestLastDay(day: number, dayList: number[]) {
  let nearestDay = 0;
  const minDay = Math.min(...dayList);
  // if it's sunday (0), then the nearest last day will be saturday, (7)
  // this is the only occasion where today is less than nearest last day
  if (day === minDay) return Math.max(...dayList);
  dayList.forEach((item) => {
    // it's before the day, but after any other day
    if (item > nearestDay && item < day) nearestDay = item;
  });
  return nearestDay;
}

export default function filterWeekly(task: Task): filterTypes {
  const {
    done,
    time,
    modified,
    reminder: { days = [] },
  } = task;
  const beginningOfToday = dayjs(new Date())
    .hour(0)
    .minute(0)
    .second(0)
    .valueOf();
  const currentWeekDay = new Date().getDay();
  const [hh, mm] = time.split(":");
  const taskTime = dayjs(new Date())
    .hour(Number(hh))
    .minute(Number(mm))
    .second(0)
    .valueOf();
  if (days?.includes(currentWeekDay)) {
    if (done.includes(beginningOfToday)) return "completed";
    else if (taskTime < Date.now()) return "overdue";
    return "today";
  } else {
    const nearestWeekDay =
      days.length === 1
        ? days[0]
        : getNearestLastDay(new Date().getDay(), days);
    // Certainly it's not a new project
    if (done.length) {
      const lastDone = done[done.length - 1];
      const lastDoneDay = new Date(lastDone).getDay();
      /**
       * If the last time the task was done was Tuesday and the nearest day is Tuesday
       * Of course, we have to be sure it was done this week Tuesday
       * Not Tuesday last month or last year
       */
      if (
        lastDoneDay === nearestWeekDay &&
        dayjs(lastDone).diff(new Date()) < 7
      )
        return "upcoming";
    } else {
      // ensure that last time it was modified comes before nearestWeekDay => overdue
      // else => upcoming
      const diffTodayLastDay = dayDifference(
        nearestWeekDay,
        new Date().getDay()
      );
      const diffTodayModified = dayDifference(
        new Date(modified).getDay(),
        new Date().getDay()
      );
      if (diffTodayLastDay < diffTodayModified) return "upcoming";
    }
  }
  return "overdue";
}
