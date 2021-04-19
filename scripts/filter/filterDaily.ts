import dayjs from "dayjs";
import Task from "../../props/Task";
import filterTypes from "./filterTypes";

export default function filterDaily(task: Task): filterTypes {
  const { time, done } = task;
  const beginningOfToday = dayjs(new Date())
    .hour(0)
    .minute(0)
    .second(0)
    .valueOf();
  const [hh, mm] = time.split(":");
  const taskTime = dayjs(new Date())
    .hour(Number(hh))
    .minute(Number(mm))
    .second(0)
    .valueOf();
  if (done.includes(beginningOfToday)) return "completed";
  if (taskTime <= Date.now()) return "overdue";
  return "upcoming";
}
