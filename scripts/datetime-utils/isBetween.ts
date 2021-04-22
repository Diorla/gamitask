import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

/**
 * This is to see if a date B is between date A and date C
 * @param prev the farthest date
 * @param current the date that is supposed to be in between
 * @param next the closest date
 * @returns boolean
 * @example isBefore(new Date(), new Date(), new Date(), "year") // true
 */
export default function isBefore(prev: Date, current: Date, next: Date) {
  return dayjs(current).isBetween(prev, next);
}
