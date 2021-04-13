import dayjs from "dayjs";
import TaskProps from "../../context/taskContext/TaskProps";

export default function filterMonthly(item: TaskProps) {
  const {
    startTime,
    reminder: { nth, frequency },
  } = item;
  const taskDate = new Date(startTime);
  const currentDate = new Date();
  if (nth) {
    const monthDifference = dayjs(currentDate).diff(taskDate, "month");
    if (!(monthDifference % frequency)) {
      if (
        dayjs().get("hour") < new Date().getHours() &&
        dayjs().get("minute") < new Date().getMinutes()
      )
        return "overdue";
      return "today";
    }
    return "upcoming";
  }
  return "overdue";
}
