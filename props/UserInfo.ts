export default interface UserInfo {
  uid: string;
  email: string;
  DOB: number;
  firstName: string;
  gender: "Male" | "Female" | "Non binary" | "Prefer not to say";
  lastName: string;
  lastUpdated: number;
  profileImage: string;
  theme: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  points: number;
  labels: string[];
  projects: string[];
  pointsPerHour: number;
  runningTask: {
    name: string;
    startTime: number;
    priority: number;
    difficulty: number;
    id: string;
    countdowns: { [key: string]: any };
  };
  created: number;
  dailyGoal: number;
}
