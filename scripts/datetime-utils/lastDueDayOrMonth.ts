import uniqueArray from "../uniqueArray";

/**
 * For example, if I created it today, it shouldn't go back in time to see anything
 * @param day - the value of current day
 * @param dayList - the list of days
 * @returns
 */
export default function lastDueDayOrMonth(day: number, dayList: number[]) {
  let sortedList = uniqueArray([...dayList, day].sort((a, b) => a - b));
  const dayIndex = sortedList.findIndex((x) => x === day);
  if (dayIndex === 0) return sortedList[sortedList.length - 1];
  return sortedList[dayIndex - 1];
  // let nearestDay = 0;
  // const minDay = Math.min(...dayList);
  // // if it's sunday (0), then the nearest last day will be saturday, (7)
  // // this is the only occasion where today is less than nearest last day
  // if (day === minDay) return Math.max(...dayList);
  // dayList.forEach((item) => {
  //   // it's before the day, but after any other day
  //   if (item > nearestDay && item < day) nearestDay = item;
  // });
  // return nearestDay;
}
