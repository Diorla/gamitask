import dayjs from "dayjs";
import { toast } from "react-toastify";
import firebase from "../../firebase/clientApp";
import Task from "../../props/Task";
import UserInfo from "../../props/UserInfo";
import addRemoveItemFromArray from "../../scripts/addRemoveItemFromArray";
import batchWrite from "../../scripts/batchWrite";
import getStreak from "../../scripts/getStreak";
import transation from "../../scripts/transation";
import uniqueArray from "../../scripts/uniqueArray";
import updateTimedTask from "./updateTimedTask";

export default async function markAsDone(task: Task, user: UserInfo) {
  const dateId = dayjs().hour(0).minute(0).second(0).millisecond(0).valueOf();
  const currentStreak = getStreak(task);
  const { rewards, id, timed, done } = task;
  const rewardRefList: {
    rewardRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
    checklist: string[];
  }[] = [];

  if (rewards && rewards.length) {
    transation((db, t) => {
      rewards.forEach(async (rewardId) => {
        const rewardRef = db
          .collection("user")
          .doc(`${user.uid}/rewards/${rewardId}`);

        const rewardDoc = await t.get(rewardRef);
        const data = rewardDoc?.data();
        const checklist = data?.checklist || [];
        rewardRefList.push({ rewardRef, checklist });
      });
    })
      .then(() => {
        batchWrite((db, batch) => {
          rewardRefList.forEach((item) => {
            const rewardRef = item.rewardRef;
            batch.update(rewardRef, {
              checklist: uniqueArray([...item.checklist, id]),
            });
          });
          const taskRef = db.collection("user").doc(`${user.uid}/tasks/${id}`);
          // if (!timed) updateTimedTask(db, batch, currentStreak);
          if (!timed)
            updateTimedTask(taskRef, batch, user, task, currentStreak);
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
      if (!timed) updateTimedTask(taskRef, batch, user, task, currentStreak);
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
