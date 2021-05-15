import { toast } from "react-toastify";
import Task from "../props/Task";
import createData from "../scripts/createData";

export default function createTask(userId: string, taskId: string, data: Task) {
  createData("user", `${userId}/tasks/${taskId}`, data)
    .then(() => toast.info("Delete undone"))
    .catch((e) => toast.error(e.message));
}
