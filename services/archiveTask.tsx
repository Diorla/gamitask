import createData from "../scripts/createData";
import { toast } from "react-toastify";
import Task from "../props/Task";
import UserInfo from "../props/UserInfo";

export default function archiveTask(task: Task, user: UserInfo): void {
  const { archive, repeat, done, id, name } = task;
  const isUpdateDone = archive && !repeat;
  createData("user", `${user.uid}/tasks/${id}`, {
    archive: archive ? 0 : Date.now(),
    done: isUpdateDone ? [] : done,
  })
    .then(() => {
      if (archive) toast.info(`${name} is removed from archive`);
      else toast.warn(`${name} is archived`);
    })
    .catch((err) => toast.error(err));
}
