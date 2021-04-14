import dayjs from "dayjs";
import TaskProps from "../../context/taskContext/TaskProps";

export default function filterDaily(item: TaskProps) {
  const {
    startTime,
    reminder: { nth, frequency },
  } = item;
  const taskDate = new Date(startTime);
  const currentDate = new Date();
  if (nth) {
    const dayDifference = dayjs(currentDate).diff(taskDate, "day");
    if (!(dayDifference % frequency)) {
      if (
        dayjs().get("hour") < new Date().getHours() &&
        dayjs().get("minute") < new Date().getMinutes()
      )
        return "overdue";
      return "today";
    }
    return "upcoming";
  }
  else {
    // 
  }
  return "overdue";
}
