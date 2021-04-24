import uniqueArray from "../uniqueArray";

/**
 * For example, if I created it today, it shouldn't go back in time to see anything
 * @param day - the value of current day
 * @param dayList - the list of days
 * @returns number
 */
export default function lastDueDayOrMonth(
  day: number,
  dayList: number[]
): number {
  let sortedList = uniqueArray([...dayList, day].sort((a, b) => a - b));
  const dayIndex = sortedList.findIndex((x) => x === day);
  if (dayIndex === 0) return sortedList[sortedList.length - 1];
  return sortedList[dayIndex - 1];
}
