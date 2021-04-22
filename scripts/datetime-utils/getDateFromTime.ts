import dayjs from "dayjs";

/**
 * Converts time from input:time to date
 * @param time Comes in this format=> hh:mm e.g. 10:53
 * @param date the date, it defaults to today
 * @returns Date in milliseconds value
 * @example getDateFromTime("10:11") // 1618996280000 => Wed Apr 21 2021 10:11:20 GMT+0100 (British Summer Time)
 */
export default function getDateFromTime(time: string, date?: Date) {
  const [hh = "0", mm = "0"] = time.split(":");
  const hour = Number(hh);
  const minute = Number(mm);
  const currentDate = date || new Date();
  return dayjs(currentDate).hour(hour).minute(minute).valueOf();
}
