import dayjs from "dayjs";
import Task from "../../context/taskContext/TaskProps";
import filterRepetitive from "./filterRepetitive";

const filterForever = (taskList: Task[]) => {
  const dateId = dayjs().hour(0).minute(0).second(0).millisecond(0).valueOf();

  const foreverCompleted = [];
  const foreverUpcoming = [];
  const foreverToday = [];
  const foreverOverdue = [];

  taskList.forEach((task: Task) => {
    const { done } = task;
    if (done[done.length - 1] === dateId) {
      foreverCompleted.push(task);
    } else {
      const result = filterRepetitive(task);
      if (result === "upcoming") foreverUpcoming.push(task);
      else if (result === "today") foreverToday.push(task);
      else foreverOverdue.push(task);
    }
  });

  return {
    foreverCompleted,
    foreverUpcoming,
    foreverToday,
    foreverOverdue,
  };
};

export default filterForever;
