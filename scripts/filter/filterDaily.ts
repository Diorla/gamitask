import Task from "../../props/Task";
import { getDateFromTime, getDayBegin, isAfter } from "../datetime-utils";
import filterTypes from "./filterTypes";

export default function filterDaily(task: Task): filterTypes {
  const { time, done } = task;
  const todayBegin = getDayBegin(new Date());
  const taskDateTime = getDateFromTime(time);
  if (done.includes(todayBegin)) return "completed";
  if (isAfter(new Date(), new Date(taskDateTime))) return "overdue";
  return "today";
}
