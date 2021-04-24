import dayjs from "dayjs";
import Task from "../../props/Task";
import {
  getDateFromTime,
  getDayBegin,
  getPrevDate,
  isBetween,
} from "../datetime-utils";
import lastDueDayOrMonth from "../datetime-utils/lastDueDayOrMonth";
import dayDifference from "../datetime-utils/getDayDifference";
import filterTypes from "./filterTypes";
import isToday from "./isToday";
import getDayDifference from "../datetime-utils/getDayDifference";

export default function filterWeekly(task: Task): filterTypes {
  /**
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
  const {
    name,
    time,
    done,
    modified = 1556118795757,
    reminder: { days = [] },
  } = task;
  const now = new Date();
  if (days?.includes(now.getDay())) {
    if (!done.length) {
      if (getDateFromTime(time) < now.valueOf()) return "overdue";
      else return "today";
    } else {
      const lastDone = done[done.length - 1];
      if (isToday(lastDone)) return "completed";
      else if (getDateFromTime(time) < now.valueOf()) return "overdue";
      else return "today";
    }
  }

  const lastDueDay = lastDueDayOrMonth(now.getDay(), days);
  const dayDifference = getDayDifference(lastDueDay, now.getDay());
  const lastDueDate = getPrevDate(dayDifference, "day");
  if (modified < lastDueDate) {
    const lastDueDateBegin = getDayBegin(new Date(lastDueDate));
    if (done.length) {
      if (isToday(new Date(done[done.length - 1]))) return "completed";
      if (
        isBetween(
          new Date(lastDueDateBegin),
          new Date(done[done.length - 1]),
          now
        )
      ) {
        return "upcoming";
      }
      return "overdue";
    }
    return "overdue";
  }
  return "upcoming";
}
