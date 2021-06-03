import Task from "../../props/Task";

export default function taskBasedOnPriority(
  taskList: Task[],
  priority: number
): Task[] {
  return taskList
    .filter((item) => item.priority === priority && !item.archive)
    .sort((prev, next) => (prev.name > next.name ? 1 : -1));
}
