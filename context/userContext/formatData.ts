import UserInfo from "../../props/UserInfo";
import firebase from "../../firebase/clientApp";

export default function formatData(
  data: firebase.firestore.DocumentData
): UserInfo {
  const {
    uid = "",
    email = "",
    profile = {
      last_name: "",
      first_name: "",
      DOB: Date.now(),
      gender: "prefer not to say",
      last_updated: Date.now(),
      profileImage: "",
    },
    theme = {
      primary: "",
      secondary: "",
      tertiary: "",
    },
    points = 0,
    labels = [],
    projects = [],
    points_per_minute = 500,
    runningTask = {},
    created = Date.now(),
  } = data;
  return {
    uid,
    email,
    profile,
    theme,
    points,
    labels,
    projects,
    points_per_minute,
    runningTask,
    created,
  };
}
