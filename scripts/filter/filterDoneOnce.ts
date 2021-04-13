import dayjs from "dayjs";
import Task from "../../context/taskContext/TaskProps";

const filterDoneOnce = (taskList: Task[]) => {
  const dateId = dayjs().hour(0).minute(0).second(0).millisecond(0).valueOf();
  const onceArchived = [];
  const onceCompleted = [];
  const onceUpcoming = [];
  const onceToday = [];
  const onceOverdue = [];

  const isToday = (startTime: dayjs.ConfigType) => dayjs(startTime).isToday();
  const isBeforeNow = (startTime: dayjs.ConfigType) =>
    dayjs(startTime).isBefore(new Date());

  taskList.forEach((item) => {
    const { done, startTime } = item;
    if (done.length) {
      // completed or archive
      if (done[done.length - 1] === dateId) onceCompleted.push(item);
      else onceArchived.push(item);
    } else if (isToday(startTime)) {
      // today, overdue
      if (isBeforeNow(startTime)) onceOverdue.push(item);
      else onceToday.push(item);
    } else {
      // upcoming
      onceUpcoming.push(item);
    }
  });

  return {
    onceArchived,
    onceCompleted,
    onceUpcoming,
    onceToday,
    onceOverdue,
  };
};

export default filterDoneOnce;
