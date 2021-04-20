import Task from "../../props/Task";
import filterTypes from "./filterTypes";

export default function assignToGroup(
  category: filterTypes,
  task: Task,
  archived: Task[],
  overdue: Task[],
  completed: Task[],
  today: Task[],
  upcoming: Task[]
) {
  /**
   * Format date and time here, use extendedTask
   */
  if (category === "archived") archived.push(task);
  if (category === "overdue") overdue.push(task);
  if (category === "completed") completed.push(task);
  if (category === "today") today.push(task);
  if (category === "upcoming") upcoming.push(task);
}
