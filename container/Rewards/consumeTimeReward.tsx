import { toast } from "react-toastify";
import RewardProps from "../../props/Reward";
import toMS from "../../scripts/toMS";
import batchWrite from "../../scripts/batchWrite";
import UserInfo from "../../props/UserInfo";

export default function consumeTimeReward(
  taskInfo: RewardProps,
  user: UserInfo
): void {
  const { pointsPerHour, totalPoints } = user;
  const { time, name, doneList = [], id } = taskInfo;
  const timeToPoints = (time * pointsPerHour) / toMS(1, "hour");

  batchWrite((db, batch) => {
    const userRef = db.collection("user").doc(user.uid);
    batch.update(userRef, {
      totalPoints: totalPoints - Math.round(timeToPoints),
    });
    const rewardRef = db.collection("user").doc(`${user.uid}/rewards/${id}`);
    batch.update(rewardRef, {
      doneList: [...doneList, Date.now()],
    });
  })
    .then(() => toast.info(`${name} done`))
    .catch((err) => toast.error(err.message));
}
