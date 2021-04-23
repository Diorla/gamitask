import dayjs from "dayjs";
import DateType from "./DateType";

/**
 * It will compare two dates and see if they occur at the same time
 * @param prev the first date
 * @param next the second date
 * @param type returns one of the date types
 * @returns boolean
 * @example isTheSameTime(new Date(), new Date(), "year") // true
 */
export default function isTheSameTime(prev: Date, next: Date, type?: DateType) {
  return dayjs(prev).isSame(dayjs(next), type);
}
