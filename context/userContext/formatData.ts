import UserInfo from "../../props/UserInfo";
import firebase from "../../firebase/clientApp";

export default function formatData(
  data: firebase.firestore.DocumentData
): UserInfo {
  const {
    uid = "",
    email = "",
    lastName = "",
    firstName = "",
    DOB = Date.now(),
    gender = "prefer not to say",
    lastUpdated = Date.now(),
    profileImage = "",
    theme = {
      primary: "",
      secondary: "",
      tertiary: "",
    },
    points = 0,
    labels = [],
    projects = [],
    pointsPerHour = 500,
    runningTask = {},
    created = Date.now(),
    dailyGoal = 5000,
  } = data;
  return {
    uid,
    email,
    lastName,
    firstName,
    DOB,
    gender,
    lastUpdated,
    profileImage,
    theme,
    points,
    labels,
    projects,
    pointsPerHour,
    runningTask,
    created,
    dailyGoal,
  };
}
