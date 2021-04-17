import UserInfo from "../../props/UserInfo";

const initialState: UserInfo = {
  profile: {
    last_name: "",
    first_name: "",
    DOB: Date.now(),
    gender: "prefer not to say",
    last_updated: Date.now(),
    profileImg: "",
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
  newUser: true,
};

export default initialState;
