import dayjs from "dayjs";
import Task from "../../props/Task";
import filterTypes from "./filterTypes";

export default function filterOnce(task: Task): filterTypes {
  const { time, done, date } = task;
  const dateTime = `${date}T${time}`;
  const beginningOfToday = dayjs(new Date())
    .hour(0)
    .minute(0)
    .second(0)
    .valueOf();
  const endOfToday = dayjs(new Date())
    .add(1, "day")
    .hour(0)
    .minute(0)
    .second(0)
    .valueOf();
  const isBeforeToday = dayjs(dateTime).isBefore(beginningOfToday);
  const isToday = dayjs(dateTime).isToday();
  if (isBeforeToday) {
    // Since it's no repeat, it will only happen once
    // Also, it may be done on that day, or much later.
    if (done.length) return "archived";
  } else if (isToday) {
    if (done.includes(beginningOfToday)) return "completed";
    // before now, whether it is today or last year
    else if (Date.now() <= dayjs(dateTime).valueOf()) return "overdue";
    // before the end of today (of course, after now)
    else if (Date.now() <= endOfToday) return "today";
  }
  return "upcoming";
}
