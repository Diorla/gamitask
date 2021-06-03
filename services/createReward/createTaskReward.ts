import { toast } from "react-toastify";
import { v4 } from "uuid";
import Reward from "../../props/Reward";
import batchWrite from "../../scripts/batchWrite";
import transaction from "../../scripts/transaction";
import firebase from "../../firebase/clientApp";

const createTaskReward = (
  reward: Reward,
  userId: string,
  callback: () => void
): void => {
  const id = reward.id || v4();
  const taskRefList: {
    taskRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
    rewardList: any[];
  }[] = [];

  // get all the task
  transaction((db, t) => {
    reward.task.forEach(async (taskItem) => {
      const taskRef = db
        .collection("user")
        .doc(`${userId}/tasks/${taskItem.value}`);
      const taskDoc = await t.get(taskRef);
      const data = taskDoc?.data();
      const rewardList = data?.rewards || [];
      taskRefList.push({ taskRef, rewardList });
    });
  })
    .then(() => {
      batchWrite((db, batch) => {
        const rewardRef = db.collection("user").doc(`${userId}/rewards/${id}`);
        // add reward to tasks
        taskRefList.forEach((element) => {
          const { taskRef, rewardList } = element;
          batch.set(taskRef, { rewards: [...rewardList, id] }, { merge: true });
        });
        // create new reward
        batch.set(
          rewardRef,
          { ...reward, id, time: 0, point: 0 },
          { merge: true }
        );
      });
    })
    .then(callback)
    .then(() => toast.success("New reward created"))
    .catch((err) => toast.error(err.message));
};

export default createTaskReward;
