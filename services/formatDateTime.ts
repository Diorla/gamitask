import dayjs from "dayjs";
import isToday from "../scripts/filter/isToday";
import getTimeMs from "../scripts/getTimeMs";
import Task from "../props/Task";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import formatWeeks from "./formatWeeks";
import convertNumberToPosition from "./convertNumberToPosition";
import formatMonths from "./formatMonths";
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export default function formatDateTime(item: Task, taskType: string): string {
  const {
    repeat,
    time,
    date,
    archive,
    lastCompleted,
    reminder: { type, days = [], months = [], dateInMonth },
  } = item;

  if (archive) return dayjs(archive).from(new Date());
  if (taskType === "completed") return dayjs(lastCompleted).from(new Date());
  const formattedTime = dayjs(new Date(getTimeMs(time))).format("h:mm A");
  if (repeat) {
    if (type === "daily") return `${formattedTime} everyday`;
    if (type === "weekly") return `${formattedTime} every ${formatWeeks(days)}`;
    if (type === "monthly" && dateInMonth)
      return `${formattedTime}, ${convertNumberToPosition(
        dateInMonth
      )} of every month`;
    if (type === "yearly" && dateInMonth)
      return `${formattedTime}, ${convertNumberToPosition(
        dateInMonth
      )} of ${formatMonths(months)}`;
  }

  return isToday(date)
    ? formattedTime
    : dayjs(new Date(`${date}T${time}`)).format("llll");
}
