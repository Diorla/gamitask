import firebase from "firebase";
import React from "react";
import { toast } from "react-toastify";
import Reward from "../../props/Reward";
import batchWrite from "../../scripts/batchWrite";
import deleteData from "../../scripts/deleteData";
import removeItemFromArray from "../../scripts/removeItemFromArray";
import transaction from "../../scripts/transaction";
import UserInfo from "../../props/UserInfo";

export default function confirmDeleteReward(
  reward: Reward,
  user: UserInfo,
  setShowDeleteModal: {
    (value: React.SetStateAction<boolean>): void;
    (arg0: boolean): any;
  }
): void {
  const { taskList, id, name } = reward;
  // Task based reward
  if (taskList && taskList.length) {
    const taskRefList: {
      taskRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
      rewardList: any;
    }[] = [];

    // TODO: Generate refs for each task
    /**
     * On creating reward, the taskList should include task ref
     * So that I don't have to generate ref again and deal less with async
     * I could just go straight to batch delete and edit
     */
    // fetch the ref of all the tasks attached
    transaction((db, t) => {
      taskList.forEach(async (element) => {
        const taskRef = db
          .collection("user")
          .doc(`${user.uid}/tasks/${element.taskId}`);
        const taskDoc = await t.get(taskRef);
        const data = taskDoc?.data();
        const rewardList = data?.rewards || [];
        taskRefList.push({ taskRef, rewardList });
      });
    })
      .then(() => {
        // delete reward
        batchWrite((db, batch) => {
          const rewardRef = db
            .collection("user")
            .doc(`${user.uid}/rewards/${id}`);
          batch.delete(rewardRef);

          // remove reward from each task
          taskRefList.forEach((element) => {
            const { taskRef, rewardList } = element;
            batch.set(
              taskRef,
              { rewards: removeItemFromArray(id, rewardList) },
              { merge: true }
            );
          });
        });
      })
      .then(() => setShowDeleteModal(false))
      .then(() => toast.warn(name + " deleted"))
      .catch((err) => toast.error(err.message));
  } else {
    // Time based reward
    deleteData("user", `${user.uid}/rewards/${id}`)
      .then(() => setShowDeleteModal(false))
      .then(() => toast.warn(name + " deleted"))
      .catch((err) => toast.error(err.message));
  }
}
