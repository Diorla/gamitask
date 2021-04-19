import dayjs from "dayjs";
import Task from "../../props/Task";
import filterTypes from "./filterTypes";

export default function filterMonthly(task: Task): filterTypes {
  const {
    time,
    done,
    modified,
    reminder: { dateInMonth = 1 },
  } = task;
  const todayDate = new Date().getDate();
  const beginningOfToday = dayjs(new Date())
    .hour(0)
    .minute(0)
    .second(0)
    .valueOf();
  const [hh, mm] = time.split(":");
  const taskTime = dayjs(new Date())
    .hour(Number(hh))
    .minute(Number(mm))
    .second(0)
    .valueOf();
  if (todayDate === dateInMonth) {
    if (done.includes(beginningOfToday)) return "completed";
    else if (taskTime > Date.now()) return "overdue";
    return "today";
  } else {
    // not new
    if (done.length) {
      const lastMonthValueDone = dayjs()
        .subtract(1, "month")
        .date(dateInMonth)
        .hour(0)
        .minute(0)
        .second(0)
        .valueOf();
      if (done.includes(lastMonthValueDone)) return "upcoming";
    } else {
      const lastMonth = dayjs()
        .subtract(1, "month")
        .date(dateInMonth)
        .valueOf();
      const modifiedMonth = dayjs(modified).valueOf();
      if (modifiedMonth > lastMonth) return "upcoming";
    }
  }
  return "overdue";
}
