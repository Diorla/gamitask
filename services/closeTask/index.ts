import { toast } from "react-toastify";
import UserInfo from "../../props/UserInfo";
import { getDayBegin } from "../../scripts/datetime-utils";
import fromMS from "../../scripts/fromMS";
import transation from "../../scripts/transation";

/**
 * This is used to stop a task from running
 */
const closeTask = (user: UserInfo, callback?: () => void) => {
  const {
    runningTask: { startTime, priority, difficulty, countdowns, id, name },
    totalPoints,
    dailyPoints,
    lifetimeHours,
    lifetimePoints,
  } = user;
  // get the countdown and convert it to points
  const timeDiff = Date.now() - startTime;
  let currentPoints = timeDiff * priority * difficulty;
  currentPoints /= 18482.52;
  let cumulativePoints = currentPoints + totalPoints;
  cumulativePoints = Math.floor(cumulativePoints);
  currentPoints = Math.floor(currentPoints);
  // get today points and countdowns
  const todayKey = "t" + getDayBegin(new Date());
  const todayPoints = Array.isArray(dailyPoints[todayKey])
    ? dailyPoints[todayKey]
    : [];
  const todayCountdown = Array.isArray(countdowns[todayKey])
    ? countdowns[todayKey]
    : [];

  // insert into db
  transation((db, t) => {
    const userRef = db.doc(`user/${user.uid}`);
    const taskRef = db.doc(`user/${user.uid}/tasks/${id}`);
    t.update(userRef, {
      totalPoints: cumulativePoints,
      runningTask: {},
      dailyPoints: {
        ...dailyPoints,
        [todayKey]: [...todayPoints, currentPoints],
      },
      lifetimeHours: lifetimeHours + fromMS(timeDiff, "hour"),
      lifetimePoints: lifetimePoints + Math.floor(currentPoints),
    });

    todayCountdown.push({
      startTime,
      length: timeDiff,
    });
    t.update(taskRef, {
      countdowns: {
        ...countdowns,
        [todayKey]: todayCountdown,
      },
    });
  })
    .then(() => toast.info(`${name} ended`))
    .then(() => (callback ? callback() : null))
    .catch((err) => toast.error(err));
};

export default closeTask;
