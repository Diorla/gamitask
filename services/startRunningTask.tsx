import createData from "../scripts/createData";
import { toast } from "react-toastify";
import Task from "../props/Task";
import UserInfo from "../props/UserInfo";

export default function startRunningTask(task: Task, user: UserInfo): void {
  const { id, name, priority, difficulty, countdowns } = task;
  const startTime = Date.now();
  createData("user", user.uid, {
    runningTask: {
      id,
      name,
      priority,
      difficulty,
      startTime,
      countdowns,
    },
  }).catch((err) => toast.error(err));
}
