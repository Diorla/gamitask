import dayjs from "dayjs";
import DateType from "./DateType";

/**
 * the number of days, weeks, years etc to find, e.g. if value = 1, next week. value = 2, upper week or day after tomorrow. value = 5, in five years time.
 * @param value the distance between this date and the next date, e.g 2
 * @param type one of the date types like day, week, month, year, hour, minute etc
 * @param date the current date, so if 14th March, then next month will be 14th Apr, May, June etc
 * @returns returns the date in milliseconds
 * @example getNextDate(new Date("Wed Apr 21 2021 10:11:20 GMT+0100"), 1, "month") // 1621588280000 => Fri May 21 2021 10:11:20 GMT+0100 (British Summer Time)
 */
export default function getNextDate(
  value: number,
  type: DateType,
  date = new Date()
) {
  return dayjs(date).add(value, type).valueOf();
}
