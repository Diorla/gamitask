import dayjs from "dayjs";
import TaskProps from "../../context/taskContext/TaskProps";
import isBeforeNow from "./isBeforeNow";

export default function filterDaily(item: TaskProps) {
  const { time } = item;
  const [hh, mm] = time.split(":");

  const date = new Date(
    dayjs().set("hour", Number(hh)).set("minute", Number(mm)).valueOf()
  );

  if (isBeforeNow(date)) return "overdue";
  return "today";
}
