import Task from "../../context/taskContext/TaskProps";
import filterDoneOnce from "./filterDoneOnce";
import filterEvent from "./filterEvent";
import filterForever from "./filterForever";
import filterNTimes from "./filterNTimes";

export default function filterToday(taskList: Task[], runningId: string) {
  let running: Task;
  const rest = [];
  const archive = [];
  const upcoming = [];
  const today = [];
  const overdue = [];
  const completed = [];

  // First remove running task
  taskList.forEach((item) => {
    if (item.id === runningId) running = item;
    else rest.push(item);
  });

  //Break them into three categories
  const { once, nTimes, forever } = filterEvent(rest);

  // Breakdown one time event
  const {
    onceArchived,
    onceCompleted,
    onceUpcoming,
    onceToday,
    onceOverdue,
  } = filterDoneOnce(once);

  archive.push(...onceArchived);
  upcoming.push(...onceUpcoming);
  today.push(...onceToday);
  overdue.push(...onceOverdue);
  completed.push(...onceCompleted);

  // Breakdown n times event
  const {
    nTimesArchived,
    nTimesCompleted,
    nTimesUpcoming,
    nTimesToday,
    nTimesOverdue,
  } = filterNTimes(nTimes);

  archive.push(...nTimesArchived);
  upcoming.push(...nTimesUpcoming);
  today.push(...nTimesToday);
  overdue.push(...nTimesOverdue);
  completed.push(...nTimesCompleted);

  // Breakdown forever event
  const {
    foreverCompleted,
    foreverUpcoming,
    foreverToday,
    foreverOverdue,
  } = filterForever(forever);

  archive.push(...foreverCompleted);
  upcoming.push(...foreverUpcoming);
  today.push(...foreverToday);
  overdue.push(...foreverOverdue);

  return {
    archive,
    upcoming,
    today,
    overdue,
    running,
    completed,
  };
}
