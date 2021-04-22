import dayjs from "dayjs";
import IsSameOrAfter from "dayjs/plugin/IsSameOrAfter";
import DateType from "./DateType";
dayjs.extend(IsSameOrAfter);

/**
 * Determines if the first date comes at a later time
 * @param next The date that is supposed to be in the future
 * @param current The current time
 * @param type One of the date types
 * @returns boolean
 * @example isAfter(new Date(), new Date(), "year") // false
 */
export default function isAfter(next: Date, current: Date, type?: DateType) {
  return dayjs(next).isSameOrAfter(dayjs(current), (type = "millisecond"));
}
