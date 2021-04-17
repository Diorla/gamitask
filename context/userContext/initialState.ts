import UserInfo from "../../props/UserInfo";

const user: UserInfo = {
  uid: "",
  email: "",
  profile: {
    last_name: "",
    first_name: "",
    DOB: Date.now(),
    gender: "prefer not to say",
    last_updated: Date.now(),
    profileImage: "",
  },
  theme: {
    primary: "",
    secondary: "",
    tertiary: "",
  },
  points: 0,
  labels: [],
  projects: [],
  points_per_minute: 500,
  runningTask: {},
  created: Date.now(),
};

const initialState = {
  user,
  loadingUser: true,
};

export default initialState;
