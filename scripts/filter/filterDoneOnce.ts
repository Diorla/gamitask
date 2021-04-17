import Task from "../../props/Task";
import isBeforeNow from "./isBeforeNow";
import isToday from "./isToday";

const filterDoneOnce = (task: Task) => {
  const { date, done } = task;
  if (done.length) return "archive";
  if (isBeforeNow(date)) return "overdue";
  else if (isToday(date)) return "today";
  return "upcoming";
};

export default filterDoneOnce;
