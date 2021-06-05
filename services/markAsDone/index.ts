import dayjs from "dayjs";
import { toast } from "react-toastify";
import firebase from "../../firebase/clientApp";
import Task from "../../props/Task";
import UserInfo from "../../props/UserInfo";
import addRemoveItemFromArray from "../../scripts/addRemoveItemFromArray";
import batchWrite from "../../scripts/batchWrite";
import getStreak from "../../scripts/getStreak";
import transaction from "../../scripts/transaction";
import uniqueArray from "../../scripts/uniqueArray";
import updateTimedTask from "./updateTimedTask";

export interface markAsDoneProps {
  rewardRefList: {
    rewardRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
    checkedTaskIdList: string[];
  }[];
  user: UserInfo;
  task: Task;
}

export default async function markAsDone(
  task: Task,
  user: UserInfo
): Promise<markAsDoneProps> {
  const dateId = dayjs().hour(0).minute(0).second(0).millisecond(0).valueOf();
  const currentStreak = getStreak(task);
  const { rewards, id, timed, done } = task;
  const rewardRefList: {
    rewardRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
    checkedTaskIdList: string[];
  }[] = [];

  // See if the task has any rewards attached
  if (rewards && rewards.length) {
    // Generate list of refs to rewards and checkedTaskIdList
    transaction((db, t) => {
      rewards.forEach(async (rewardId) => {
        const rewardRef = db
          .collection("user")
          .doc(`${user.uid}/rewards/${rewardId}`);

        const rewardDoc = await t.get(rewardRef);
        const data = rewardDoc?.data();
        const checkedTaskIdList = data?.checkedTaskIdList || [];
        rewardRefList.push({ rewardRef, checkedTaskIdList });
      });
    })
      .then(() => {
        batchWrite((db, batch) => {
          // update the rewards' checkedTaskIdList
          rewardRefList.forEach((item) => {
            const rewardRef = item.rewardRef;
            batch.update(rewardRef, {
              checkedTaskIdList: uniqueArray([...item.checkedTaskIdList, id]),
            });
          });
          const taskRef = db.collection("user").doc(`${user.uid}/tasks/${id}`);

          // Update points for user based on streak if task is un-timed
          if (!timed)
            updateTimedTask(taskRef, batch, user, task, currentStreak);

          // Update task
          batch.update(taskRef, {
            done: addRemoveItemFromArray(dateId, done),
            lastCompleted: Date.now(),
            streak: currentStreak,
          });
        });
      })
      .catch((err) => toast.error(err.message));
  } else {
    batchWrite((db, batch) => {
      const taskRef = db.collection("user").doc(`${user.uid}/tasks/${id}`);
      // Update points for user based on streak if task is un-timed
      if (!timed) updateTimedTask(taskRef, batch, user, task, currentStreak);

      // Update task
      batch.update(taskRef, {
        done: addRemoveItemFromArray(dateId, done),
        lastCompleted: Date.now(),
        streak: currentStreak,
      });
    }).catch((err) => toast.error(err.message));
  }
  return {
    rewardRefList,
    user,
    task,
  };
}
