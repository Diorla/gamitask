import TodayTask from "./TodayTask";
import FutureTask from "./FutureTask";
import DoneTask from "./DoneTask";

const TaskCard = ({ data, type }) => {
  if (type === "today" || type === "overdue")
    return <TodayTask data={data} type={type} />;
  else if (type === "completed") return <DoneTask data={data} type={type} />;
  return <FutureTask data={data} type={type} />;
};

export default TaskCard;
