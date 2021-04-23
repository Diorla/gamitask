import dayjs from "dayjs";

/**
 * Used to get the very first millisecond of the day
 * @param date the date that will be processed
 * @returns milliseconds
 * @example getDayBegin(new Date()) //1619132400000 => Fri Apr 23 2021 00:00:00 GMT+0100 (British Summer Time)
 */
export default function getDayBegin(date: Date) {
  return dayjs(date).hour(0).minute(0).second(0).millisecond(0).valueOf();
}
