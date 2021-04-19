import Task from "../../props/Task";
import assignToGroup from "./assignToGroup";
import filterDaily from "./filterDaily";
import filterMonthly from "./filterMonthly";
import filterOnce from "./filterOnce";
import filterWeekly from "./filterWeekly";
import filterYearly from "./filterYearly";

export default function Filter(taskList: Task[]) {
  const archived: Task[] = [];
  const overdue: Task[] = [];
  const completed: Task[] = [];
  const today: Task[] = [];
  const upcoming: Task[] = [];

  taskList.forEach((task) => {
    const {
      id,
      repeat,
      reminder: { type },
    } = task;
    if (!repeat) {
      const category = filterOnce(task);
      assignToGroup(
        category,
        task,
        archived,
        overdue,
        completed,
        today,
        upcoming
      );
    } else {
      if (type === "daily") {
        const category = filterDaily(task);
        assignToGroup(
          category,
          task,
          archived,
          overdue,
          completed,
          today,
          upcoming
        );
      }
      if (type === "weekly") {
        const category = filterWeekly(task);
        assignToGroup(
          category,
          task,
          archived,
          overdue,
          completed,
          today,
          upcoming
        );
      }
      if (type === "monthly") {
        const category = filterMonthly(task);
        assignToGroup(
          category,
          task,
          archived,
          overdue,
          completed,
          today,
          upcoming
        );
      }
      if (type === "yearly") {
        const category = filterYearly(task);
        assignToGroup(
          category,
          task,
          archived,
          overdue,
          completed,
          today,
          upcoming
        );
      }
    }
  });
  return {
    archived,
    overdue,
    completed,
    today,
    upcoming,
  };
}
