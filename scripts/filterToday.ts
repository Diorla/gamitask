import dayjs from "dayjs";
import Task from "../context/taskContext/TaskProps";

// TODO: Update this to take into consideration complex calculation
/**
 * This will consider scheduling and repetition
 * So daily will be automatically added daily etc
 */
const isToday = (startTime: dayjs.ConfigType) => dayjs(startTime).isToday();
const isBeforeNow = (startTime: dayjs.ConfigType) =>
  dayjs(startTime).isBefore(new Date());
const isRunning = (id: string, runningId: string) => id === runningId;
const isDone = (done: number[], currentDay: number) =>
  done.includes(currentDay);

export default function filterToday(taskList: Task[], runningId: string) {
  const today = [];
  const overdue = [];
  const completed = [];
  let running: Task;
  const dateId = dayjs().hour(0).minute(0).second(0).millisecond(0).valueOf();
  taskList.forEach((element) => {
    const { startTime, done, id } = element;
    if (isDone(done, dateId)) completed.push(element);
    else if (isRunning(id, runningId)) running = element;
    else if (isBeforeNow(startTime)) overdue.push(element);
    else if (isToday(startTime)) today.push(element);
  });
  return {
    today,
    overdue,
    completed,
    running,
  };
}
