import dayjs from "dayjs";
import { BigDateType } from "./DateType";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

// getDateBefore(new Date("24-Aug-2021"), 8, "month") will return 24-Sept-2020
/**
 * Returns the nearest date that matches, getDateAfter(new Date("24-Aug-2021"), 8, "month") will return 24-Sept-2021 because 8 in months is Sept
 * @param value hour: 0-23, day: 0-7, week: 0-51, month: 0-11
 * @param type weekday, date or month
 * @param date the current date to compare to
 * @returns date in milliseconds
 */
export default function getNearestDateAfter(
  value: number,
  type: BigDateType,
  date: Date
) {
  let current;
  switch (type) {
    case "day":
      current = dayjs(date).day();
      if (value > current) return dayjs(date).day(value).valueOf();
      return dayjs(date).add(1, "week").day(value).valueOf();

    // Month
    default:
      current = dayjs(date).month();
      if (value > current) return dayjs(date).month(value).valueOf();
      return dayjs(date).add(1, "year").month(value).valueOf();
  }
}
