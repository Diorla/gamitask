import dayjs from "dayjs";
import isTomorrow from "dayjs/plugin/isTomorrow";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { toast } from "react-toastify";
dayjs.extend(quarterOfYear);
dayjs.extend(weekOfYear);
dayjs.extend(isTomorrow);

/**
 * returns collection of arrays, e.g. into "tomorrow", "week", "month", "year" & "further"
 * @param list an array that will be filtered according date
 */
export default function createDateCollection(list: any[]) {
  const tempCollection = {
    further: [],
    year: [],
    quarter: [],
    nextMonth: [],
    month: [],
    nextWeek: [],
    week: [],
    tomorrow: [],
  };
  try {
    list.forEach((item: any) => {
      const year = dayjs(item.startTime).year();
      const quarter = dayjs(item.startTime).quarter();
      const month = dayjs(item.startTime).month();
      const week = dayjs(item.startTime).week();

      if (dayjs(item.startTime).isTomorrow()) {
        tempCollection["tomorrow"].push(item);
      } else if (week === dayjs(new Date()).week()) {
        tempCollection["week"].push(item);
      } else if (week === dayjs(new Date()).week() + 1) {
        tempCollection["nextWeek"].push(item);
      } else if (month === dayjs(new Date()).month()) {
        tempCollection["month"].push(item);
      } else if (month === dayjs(new Date()).month() + 1) {
        tempCollection["nextMonth"].push(item);
      } else if (quarter === dayjs(new Date()).quarter()) {
        tempCollection["quarter"].push(item);
      } else if (year === dayjs(new Date()).year()) {
        tempCollection["year"].push(item);
      } else {
        tempCollection["further"].push(item);
      }
    });
  } catch (err) {
    toast.error(err);
  }
  return tempCollection;
}
