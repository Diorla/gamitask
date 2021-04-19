import dayjs from "dayjs";
import Task from "../../props/Task";
import filterTypes from "./filterTypes";
import { getNearestLastDay } from "./filterWeekly";

export default function filterYearly(task: Task): filterTypes {
  const {
    done,
    time,
    modified,
    reminder: { months = [], dateInMonth = 1 },
  } = task;

  const today = new Date();
  const beginningOfToday = dayjs(today).hour(0).minute(0).second(0).valueOf();
  const thisDate = today.getDate();
  const thisMonth = today.getMonth();
  const [hh, mm] = time.split(":");
  const taskTime = dayjs(new Date())
    .hour(Number(hh))
    .minute(Number(mm))
    .second(0)
    .valueOf();
  if (done.includes(beginningOfToday)) return "completed";
  if (months?.includes(thisMonth) && thisDate === dateInMonth) {
    if (taskTime > Date.now()) return "overdue";
    return "today";
  } else {
    const nearestMonth = getNearestLastDay(new Date().getMonth(), months);
    const nearestMonthValue = dayjs()
      .month(nearestMonth)
      .date(dateInMonth)
      .hour(0)
      .minute(0)
      .second(0)
      .valueOf();
    const modifiedDateValue = dayjs(modified)
      .hour(0)
      .minute(0)
      .second(0)
      .valueOf();
    if (done.length) {
      const lastDone = done[done.length - 1];
      if (lastDone === nearestMonthValue) return "upcoming";
      return "overdue";
    }
    if (modifiedDateValue < nearestMonthValue) return "overdue";
  }
  return "upcoming";
}
