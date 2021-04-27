import Task from "./Task";
export default interface UserInfo {
  uid: string;
  email: string;
  profile: {
    DOB: number;
    first_name: string;
    gender: "male" | "female" | "non binary" | "prefer not to say";
    last_name: string;
    last_updated: number;
    profileImage: string;
  };
  theme: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  points: number;
  labels: string[];
  projects: string[];
  points_per_hour: number;
  runningTask: {
    name: string;
    startTime: number;
    priority: number;
    difficulty: number;
    id: string;
    countdowns: { [key: string]: any };
  };
  created: number;
}
