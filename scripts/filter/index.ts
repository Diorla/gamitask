import dayjs from "dayjs";
import Task from "../../context/taskContext/TaskProps";
import filterDaily from "./filterDaily";
import filterDoneOnce from "./filterDoneOnce";
import filterMonthly from "./filterMonthly";
import filterWeekly from "./filterWeekly";
import filterYearly from "./filterYearly";

const assignToCollection = (
  value: any,
  item: any,
  archive: any[],
  upcoming: any[],
  today: any[],
  overdue: any[]
) => {
  switch (value) {
    case "archive":
      archive.push(item);
      break;

    case "upcoming":
      upcoming.push(item);
      break;

    case "today":
      today.push(item);
      break;

    case "overdue":
      overdue.push(item);
      break;

    default:
      break;
  }
};
export default function filterToday(taskList: Task[], runningId: string) {
  let running: Task;
  const archive = [];
  const upcoming = [];
  const today = [];
  const overdue = [];
  const completed = [];

  const dateId = dayjs().hour(0).minute(0).second(0).millisecond(0).valueOf();
  taskList.forEach((item) => {
    if (item.done.includes(dateId)) completed.push(item);
    else if (item.id === runningId) running = item;
    else {
      if (item.repeat) {
        if (item.reminder.type === "daily") {
          assignToCollection(
            filterDaily(item),
            item,
            archive,
            upcoming,
            today,
            overdue
          );
        } else if (item.reminder.type === "weekly") {
          assignToCollection(
            filterWeekly(item),
            item,
            archive,
            upcoming,
            today,
            overdue
          );
        } else if (item.reminder.type === "monthly") {
          assignToCollection(
            filterMonthly(item),
            item,
            archive,
            upcoming,
            today,
            overdue
          );
        } else {
          assignToCollection(
            filterYearly(item),
            item,
            archive,
            upcoming,
            today,
            overdue
          );
        }
      } else {
        assignToCollection(
          filterDoneOnce(item),
          item,
          archive,
          upcoming,
          today,
          overdue
        );
      }
    }
  });

  return {
    archive,
    upcoming,
    today,
    overdue,
    running,
    completed,
  };
}
