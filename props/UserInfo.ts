import Task from "./Task";

export default interface UserInfo {
  profile: {
    DOB: number;
    first_name: string;
    gender: "male" | "female" | "non binary" | "prefer not to say";
    last_name: string;
    last_updated: number;
    profileImg: string;
  };
  theme: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  points: number;
  labels: string[];
  projects: string[];
  points_per_minute: number;
  runningTask: Task | {};
  newUser: true;
}
