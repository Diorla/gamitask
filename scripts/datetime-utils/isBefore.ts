import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import DateType from "./DateType";
dayjs.extend(isSameOrBefore);

/**
 * Determines if the first date comes at an earlier time
 * @param prev The date that is supposed to be in the past
 * @param current The current time
 * @param type One of the date types
 * @returns boolean
 * @example isBefore(new Date(), new Date(), "year") // false
 */
export default function isBefore(prev: Date, current: Date, type?: DateType) {
  return dayjs(prev).isSameOrBefore(dayjs(current), (type = "millisecond"));
}
