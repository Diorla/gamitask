import TodayTask from "./TodayTask";
import FutureTask from "./FutureTask";
import DoneTask from "./DoneTask";

// TODO: merge all the task(Today, Done & Future)
/**
 * So basically, I will just be hiding parts of the card, instead of return different cards
 * This will make it easy to update the cards.
 */
const TaskCard = ({ data, type }) => {
  if (type === "today" || type === "overdue") return <TodayTask data={data} />;
  else if (type === "completed") return <DoneTask data={data} />;
  return <FutureTask data={data} />;
};

export default TaskCard;
