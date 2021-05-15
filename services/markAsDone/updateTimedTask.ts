import firebase from "../../firebase/clientApp";
import Task from "../../props/Task";
import UserInfo from "../../props/UserInfo";
import { getDayBegin } from "../../scripts/datetime-utils";

const updateTimedTask = (
  taskRef: firebase.firestore.DocumentReference<any>,
  updater: firebase.firestore.WriteBatch | firebase.firestore.Transaction,
  user: UserInfo,
  task: Task,
  currentStreak: number
) => {
  const { priority, difficulty, streak } = task;
  const { dailyPoints, totalPoints } = user;
  let points = currentStreak * priority * difficulty;
  /**
   * 60 years = 21915 days
   * Maximum priority and difficulty = 3 * 5 = 15
   * Assuming someone does it daily for 60 years
   * Math.floor(Math.log((21915 * 15)**56) + 1) = Infinity
   * Math.floor(Math.log((21915 * 15)**55) + 1) = 699
   * Hence, 71 is the safe number, as far as I'm concerned
   */
  points = (Math.log(points ** 50) + 1) * 2;
  points += totalPoints;
  points = Math.floor(points);
  // I don't expect this to happen, but who knows
  points = points === Infinity ? 1398 + streak : points;

  const todayKey = "t" + getDayBegin(new Date());
  const todayValue = Array.isArray(dailyPoints[todayKey])
    ? dailyPoints[todayKey]
    : [];
  // const taskRef = db.collection("user").doc(user.uid);
  updater.update(taskRef, {
    totalPoints: points,
    dailyPoints: {
      ...dailyPoints,
      [todayKey]: [...todayValue, points],
    },
  });
};

export default updateTimedTask;
