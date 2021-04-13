import Task from "../../context/taskContext/TaskProps";

const filterEvent = (element: Task[]) => {
  const once = [];
  const nTimes = [];
  const forever = [];
  element.forEach((item: { event: string }) => {
    if (item.event === "once") once.push(item);
    else if (item.event === "n-times") nTimes.push(item);
    if (item.event === "forever") forever.push(item);
  });
  return { once, nTimes, forever };
};

export default filterEvent;
