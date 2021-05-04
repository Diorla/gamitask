import dayjs from "dayjs";
import Task from "../props/Task";
import lastDueDayOrMonth from "./datetime-utils/lastDueDayOrMonth";

export default function getStreak(task: Task) {
  const {
    lastCompleted,
    streak,
    reminder: { type, days = [], dateInMonth = 1, months = [] },
  } = task;
  // would be 0 + 1;
  if (lastCompleted === 0) return streak + 1;
  if (type === "daily") {
    const yesterday = dayjs().subtract(1, "day");
    if (yesterday.isSame(lastCompleted, "day")) return streak + 1;
    return 1;
  }
  if (type === "weekly") {
    const now = new Date();
    const lastDueDay = lastDueDayOrMonth(now.getDay(), days);
    if (lastDueDay <= lastCompleted) return streak + 1;
    return 1;
  }
  if (type === "monthly") {
    const lastMonth = dayjs().subtract(1, "month");
    lastMonth.set("month", dateInMonth);
    if (lastMonth.valueOf() <= lastCompleted) return streak + 1;
    return 1;
  }
  if (type === "yearly") {
    const now = new Date();
    const lastDueMonth = lastDueDayOrMonth(now.getMonth(), months);
    const lastDueDay = dayjs(lastDueMonth).set("date", dateInMonth);
    if (lastDueDay.valueOf() <= lastCompleted) return streak + 1;
    return 1;
  }
  return 1;
}
