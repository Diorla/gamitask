import dayjs from "dayjs";
import Task from "../../props/Task";
import isBeforeNow from "./isBeforeNow";

export default function filterMonthly(item: Task) {
  const {
    time,
    reminder: { dateInMonth },
  } = item;

  const [hh, mm] = time.split(":");

  const currentDate = new Date().getDate();
  if (currentDate === dateInMonth) {
    const date = new Date(
      dayjs().set("hour", Number(hh)).set("minute", Number(mm)).valueOf()
    );

    if (isBeforeNow(date)) return "overdue";
    return "today";
  }

  return "upcoming";
}
