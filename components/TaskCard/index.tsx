import TodayTask from "./TodayTask";
import FutureTask from "./FutureTask";
import DoneTask from "./DoneTask";

// TODO: Make taskCard expandable to reveal more information
/**
 * This will mean I have to remove the collapse in the collection (I can't nest collapse inside a collapse)
 * In this expanded state, there will be an edit and delete button
 * This also means taskCard will have editable state, similar to createTask
 */
const TaskCard = ({ data, type }) => {
  if (type === "today" || type === "overdue")
    return <TodayTask data={data} type={type} />;
  else if (type === "completed") return <DoneTask data={data} type={type} />;
  return <FutureTask data={data} type={type} />;
};

export default TaskCard;
