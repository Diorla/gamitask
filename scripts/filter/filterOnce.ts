import dayjs from "dayjs";
import Task from "../../props/Task";
import { getDayBegin, isBefore } from "../datetime-utils";
import filterTypes from "./filterTypes";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

export default function filterOnce(task: Task): filterTypes {
  const { time, done, date } = task;
  const dateTime = `${date}T${time}`;
  const todayBegin = getDayBegin(new Date());
  const isBeforeToday = isBefore(new Date(dateTime), new Date(todayBegin));
  const isToday = dayjs(dateTime).isToday();
  if (isBeforeToday) {
    if (done.length) {
      if (dayjs(done[done.length - 1]).isToday()) return "completed";
      return "archived";
    }
    return "overdue";
  } else if (isToday) {
    const taskIsDoneToday = dayjs(new Date(done[done.length - 1])).isToday();
    const taskTimeIsB4Now = isBefore(new Date(dateTime), new Date());
    if (taskIsDoneToday) return "completed";
    if (taskTimeIsB4Now) return "overdue";
    return "today";
  }
  return "upcoming";
}
