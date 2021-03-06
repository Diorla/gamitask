import UserInfo from "../../props/UserInfo";

const user: UserInfo = {
  uid: "",
  email: "",
  lastName: "",
  firstName: "",
  DOB: Date.now(),
  gender: "Prefer not to say",
  lastUpdated: Date.now(),
  profileImage: "",
  theme: {
    primary: "",
    secondary: "",
    tertiary: "",
  },
  totalPoints: 0,
  labels: [],
  projects: [],
  pointsPerHour: 500,
  runningTask: {
    name: "",
    startTime: 0,
    priority: 1,
    difficulty: 1,
    id: "",
    countdowns: {},
  },
  created: Date.now(),
  dailyGoal: 5000,
  dailyPoints: {},
  lifetimeHours: 0,
  lifetimePoints: 0,
};

const initialState = {
  user,
  loadingUser: true,
};

export default initialState;
