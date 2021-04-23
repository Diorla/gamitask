import dayjs from "dayjs";

/**
 * Use to return the end of the day, just before tomorrow
 * @param date the current date
 * @returns time in milliseconds, to represent the final millisecond of the particular date
 * @example getDayEnd(new Date()) // 1619218799999 => Fri Apr 23 2021 23:59:59 GMT+0100 (British Summer Time)
 */
export default function getDayEnd(date: Date) {
  return dayjs(date).hour(23).minute(59).second(59).millisecond(999).valueOf();
}
