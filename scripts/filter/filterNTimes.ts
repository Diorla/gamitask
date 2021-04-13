import dayjs from "dayjs";
import Task from "../../context/taskContext/TaskProps";
import filterRepetitive from "./filterRepetitive";

const filterNTimes = (taskList: Task[]) => {
  const dateId = dayjs().hour(0).minute(0).second(0).millisecond(0).valueOf();

  const nTimesArchived = [];
  const nTimesCompleted = [];
  const nTimesUpcoming = [];
  const nTimesToday = [];
  const nTimesOverdue = [];

  taskList.forEach((task: Task) => {
    const { done, reminder } = task;
    if (done.length >= reminder.count) {
      if (done[done.length - 1] === dateId) nTimesCompleted.push(task);
      else nTimesArchived.push(task);
    } else {
      const result = filterRepetitive(task);
      if (result === "upcoming") nTimesUpcoming.push(task);
      else if (result === "today") nTimesToday.push(task);
      else nTimesOverdue.push(task);
    }
  });

  return {
    nTimesArchived,
    nTimesCompleted,
    nTimesUpcoming,
    nTimesToday,
    nTimesOverdue,
  };
};

export default filterNTimes;
