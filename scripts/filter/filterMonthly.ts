import dayjs from "dayjs";
import Task from "../../props/Task";
import { getDateFromTime, getPrevDate, isBetween } from "../datetime-utils";
import getMonthDifference from "../datetime-utils/getMonthDifference";
import lastDueDayOrMonth from "../datetime-utils/lastDueDayOrMonth";
import filterTypes from "./filterTypes";
import isToday from "./isToday";

/** For repetitive event
 * if it's due today
 *  done => completed
 *  not done
 *    time before now => overdue
 *    time after now => today
 * due before today
 *  done between last due and before today => upcoming
 *  done today => completed
 *  not done => overdue
 * else => upcoming
 */
export default function filterMonthly(task: Task): filterTypes {
  const {
    time,
    done,
    modified = 1556118795757,
    reminder: { dateInMonth = 1 },
  } = task;
  const now = new Date();
  const todayDate = now.getDate();
  const lastDone = done[done.length - 1];
  const dateTimeTask = getDateFromTime(time);
  if (todayDate === dateInMonth) {
    if (lastDone) {
      if (isToday(new Date(lastDone))) return "completed";
    }
    if (dateTimeTask < now.valueOf()) return "overdue";
    return "today";
  }

  const lastDueDate = dayjs()
    .subtract(1, "month")
    .set("date", dateInMonth)
    .valueOf();
  if (modified < lastDueDate) {
    if (lastDone && lastDueDate <= lastDone && lastDone < now.valueOf()) {
      if (isToday(lastDone)) return "completed";
      return "upcoming";
    }
    if (lastDone && isBetween(new Date(lastDueDate), new Date(lastDone), now))
      return "completed";
    return "overdue";
  }
  return "upcoming";
}
