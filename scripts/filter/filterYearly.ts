import dayjs from "dayjs";
import TaskProps from "../../context/taskContext/TaskProps";
import isBeforeNow from "./isBeforeNow";

export default function filterYearly(item: TaskProps) {
  const {
    time,
    reminder: { months },
  } = item;

  const [hh, mm] = time.split(":");

  const currentMonth = new Date().getMonth();
  if (months.includes(currentMonth)) {
    const date = new Date(
      dayjs().set("hour", Number(hh)).set("minute", Number(mm)).valueOf()
    );

    if (isBeforeNow(date)) return "overdue";
    return "today";
  }

  return "upcoming";
}
