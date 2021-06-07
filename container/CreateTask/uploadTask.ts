import { v4 } from "uuid";
import { toast } from "react-toastify";
import uniqueArray from "../../scripts/uniqueArray";
import { addTask, TaskAction } from "../../context/taskContext/actions";
import initialState from "../../context/taskContext/initialState";
import getValidState from "../../scripts/getValidState";
import transaction from "../../scripts/transaction";
import Task from "../../props/Task";
import UserInfo from "../../props/UserInfo";
import removeEmptyStringFromArr from "../../utils/removeEmptyStringFromArr";
import trimSpace from "../../utils/trimSpace";

const uploadTask = (
  data: Task,
  taskLabels: string,
  user: UserInfo,
  userLabels: string[],
  taskDispatch: (value: TaskAction) => void
): void => {
  const { message, isValid } = getValidState(data);

  if (!isValid) {
    toast.error(message);
    return;
  }

  const labelList = taskLabels
    .split(",")
    .map(trimSpace)
    .filter(removeEmptyStringFromArr)
    .map((item: any) => item);

  transaction((db, t) => {
    const id = data.id || v4();
    const userRef = db.collection("user").doc(user.uid);
    const taskRef = db.doc(`user/${user.uid}/tasks/${id}`);
    // Update label list
    t.set(
      userRef,
      {
        labels: uniqueArray([...userLabels, ...labelList]),
      },
      { merge: true }
    );

    const updateData = {
      ...data,
      labels: data.labels
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item)
        .join(", "),
      modified: Date.now(),
      created: Date.now(),
      id,
    };
    // if it's weekly, and all the days are selected
    // then it should turn into daily
    if (updateData.reminder.type === "weekly") {
      if (updateData.reminder.days?.length === 7) {
        updateData.reminder.type = "daily";
      }
    }

    // if it's yearly, and all the months are selected
    // then it should turn into monthly
    else if (updateData.reminder.type === "yearly") {
      if (updateData.reminder.months?.length === 12) {
        updateData.reminder.type = "monthly";
      }
    }

    // create or update task
    t.set(taskRef, {
      ...updateData,
    });
  })
    .then(() => {
      taskDispatch(
        addTask({
          ...initialState,
        })
      );
    })
    .then(() => {
      if (data.id) toast.success("Task updated");
      else toast.success("Task created");
    })
    .catch((err) => {
      toast.error(`${err}`);
    });
};

export default uploadTask;
