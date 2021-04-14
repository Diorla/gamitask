import dayjs from "dayjs";
import TaskProps from "../../context/taskContext/TaskProps";
import isBeforeNow from "./isBeforeNow";

export default function filterWeekly(item: TaskProps) {
  const {
    time,
    reminder: { days },
  } = item;

  const [hh, mm] = time.split(":");

  const currentDay = new Date().getDay();
  if (days.includes(currentDay)) {
    const date = new Date(
      dayjs().set("hour", Number(hh)).set("minute", Number(mm)).valueOf()
    );

    if (isBeforeNow(date)) return "overdue";
    return "today";
  }

  return "upcoming";
}
