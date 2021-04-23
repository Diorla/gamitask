import dayjs from "dayjs";
import DateType from "./DateType";

/**
 * the number of days, weeks, years etc to find, e.g. if value = 1, last week or yesterday. value = 2, last 2 months or the day before yesterday. value = 5, five years ago.
 * @param value the distance between this date and the next date, e.g 2
 * @param type one of the date types like day, week, month, year, hour, minute etc
 * @param date the current date, so if 14th June, then next month will be 14th Feb, Mar, Apr, May etc
 * @returns returns the date in milliseconds
 * @example getNextDate(new Date("Wed Jun 21 2021 10:11:20 GMT+0100"), 1, "month") // 1621588280000 => Fri May 21 2021 10:11:20 GMT+0100 (British Summer Time)
 */
export default function getPrevDate(
  value: number,
  type: DateType,
  date = new Date()
) {
  return dayjs(date).subtract(value, type).valueOf();
}
