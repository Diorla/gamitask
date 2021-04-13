import TaskProps from "../../context/taskContext/TaskProps";
import filterDaily from "./filterDaily";
import filterMonthly from "./filterMonthly";
import filterWeekly from "./filterWeekly";
import filterYearly from "./filterYearly";

// This is for forever and n-times(that is not archived)
// overdue, today, upcoming
const filterRepetitive = (item: TaskProps) => {
  const {
    reminder: { type },
  } = item;
  if (type === "daily") return filterDaily(item);
  if (type === "weekly") return filterWeekly(item);
  if (type === "monthly") return filterMonthly(item);
  return filterYearly(item);
};

export default filterRepetitive;
