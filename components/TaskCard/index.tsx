import TodayTask from "./TodayTask";
import FutureTask from "./FutureTask";

const TaskCard = ({ data, type }) => {
  if (type === "today" || type === "overdue")
    return <TodayTask data={data} type={type} />;
  return <FutureTask data={data} type={type} />;
};

export default TaskCard;
