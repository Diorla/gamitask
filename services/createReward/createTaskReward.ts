import { toast } from "react-toastify";
import { v4 } from "uuid";
import Reward from "../../props/Reward";
import batchWrite from "../../scripts/batchWrite";
import Task from "../../props/Task";

/**
 * the reward detail that is updated
 * the user id
 * the list of all tasks
 */
const createTaskReward = (
  reward: Reward,
  userId: string,
  allTask: Task[],
  callback: () => void
): void => {
  const id = reward.id || v4();
  batchWrite((db, batch) => {
    const rewardRef = db.collection("user").doc(`${userId}/rewards/${id}`);
    // add reward to tasks
    reward.taskList.forEach((element) => {
      // get the target task, to be used for firebase refs, and reward list
      const task = allTask.filter((item) => item.id == element.taskId)[0];
      const taskRef = db
        .collection("user")
        .doc(`${userId}/tasks/${element.taskId}`);
      const rewardList = task.rewards || [];
      // update task reward list
      batch.set(taskRef, { rewards: [...rewardList, id] }, { merge: true });
    });
    // create new reward
    batch.set(rewardRef, { ...reward, id, time: 0, point: 0 }, { merge: true });
  })
    .then(callback)
    .then(() => toast.success("New reward created"))
    .catch((err) => toast.error(err.message));
};

export default createTaskReward;
