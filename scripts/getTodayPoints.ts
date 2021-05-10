import { getDayBegin } from "./datetime-utils";

export default function getTodayPoints(dailyPoints: {
  [key: string]: number[];
}) {
  const todayKey = "t" + getDayBegin(new Date());
  const points = dailyPoints[todayKey] || [];
  return points.reduce((prev, next) => prev + next, 0);
}
