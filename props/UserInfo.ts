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
  totalPoints: number;
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
  /**
   * This is the collection of all the points accumulated in a day.
   * The key will be "t" + daybegin in milliseconds.
   * It will be used to evaluate if to daily goal has been met.
   */
  dailyPoints: {
    [key: string]: number[];
  };
  /**
   * The total points you've acquired in a lifetime
   */
  lifetimePoints: number;
  /**
   * This is a way of keeping records of how long user actually spent
   * doing these things. This is because a user can simply set high
   * difficulty and priority to all their task and gain a lots of point.
   */
  lifetimeHours: number;
}
