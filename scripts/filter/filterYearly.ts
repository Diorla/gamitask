import dayjs from "dayjs";
import Task from "../../props/Task";
import { getDateFromTime, getPrevDate, isBetween } from "../datetime-utils";
import getMonthDifference from "../datetime-utils/getMonthDifference";
import lastDueDayOrMonth from "../datetime-utils/lastDueDayOrMonth";
import filterTypes from "./filterTypes";
import isToday from "./isToday";

export default function filterYearly(task: Task): filterTypes {
  const {
    name,
    time,
    done,
    modified = 1556118795757,
    reminder: { dateInMonth = 1, months = [] },
  } = task;
  const now = new Date();
  const todayDate = now.getDate();
  const todayMonth = now.getMonth();
  const lastDone = done[done.length - 1];
  const dateTimeTask = getDateFromTime(time);
  if (months?.includes(todayMonth) && todayDate === dateInMonth) {
    if (lastDone) {
      if (isToday(new Date(lastDone))) return "completed";
    }
    if (dateTimeTask < now.valueOf()) return "overdue";
    return "today";
  }
  const lastDueMonth = lastDueDayOrMonth(todayMonth, months);
  const monthDifference = getMonthDifference(lastDueMonth, todayMonth);
  const presetDate = dayjs(dateTimeTask).date(dateInMonth).valueOf();
  const lastDueDate = getPrevDate(
    monthDifference,
    "month",
    new Date(presetDate)
  );
  if (modified < lastDueDate) {
    if (lastDone && lastDueDate <= lastDone && lastDone < now.valueOf()) {
      if (isToday(lastDone)) return "completed";
      return "upcoming";
    }
    if (lastDone && isBetween(new Date(lastDueDate), new Date(lastDone), now))
      return "completed";
    return "overdue";
  }
  return "upcoming";
}
