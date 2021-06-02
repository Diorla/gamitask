import Task from "../../props/Task";
import UserInfo from "../../props/UserInfo";
import transation from "../../scripts/transaction";
import firebase from "../../firebase/clientApp";

type rewardRefs = {
  rewardRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
  checklist: string[];
};

export default function undoCheck(
  rewardRefList: rewardRefs[],
  user: UserInfo,
  task: Task
): void {
  const { uid } = user;
  const { id } = task;
  transation((db, t) => {
    const taskRef = db.collection("user").doc(`${uid}/tasks/${id}`);
    const userRef = db.collection("user").doc(`${uid}`);
    rewardRefList.map((item) => {
      t.update(item.rewardRef, {
        checklist: item.checklist,
      });
    });
    t.update(userRef, user);
    t.update(taskRef, task);
  });
}
