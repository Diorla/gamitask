import Task from "../../props/Task";
import assignToGroup from "./assignToGroup";
import filterDaily from "./filterDaily";
import filterMonthly from "./filterMonthly";
import filterOnce from "./filterOnce";
import filterWeekly from "./filterWeekly";
import filterYearly from "./filterYearly";

/** For repetitive event
 * if it's due today
 *  done => completed
 *  not done
 *    time before now => overdue
 *    time after now => today
 * due before today
 *  done between last due and before today => upcoming
 *  done today => completed
 *  not done => overdue
 * else => upcoming
 */
export default function Filter(taskList: Task[]) {
  const archived: Task[] = [];
  const overdue: Task[] = [];
  const completed: Task[] = [];
  const today: Task[] = [];
  const upcoming: Task[] = [];

  taskList.forEach((task) => {
    const {
      repeat,
      archive,
      reminder: { type },
    } = task;
    if (archive)
      assignToGroup(
        "archived",
        task,
        archived,
        overdue,
        completed,
        today,
        upcoming
      );
    else if (!repeat) {
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
