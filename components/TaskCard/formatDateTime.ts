import dayjs from "dayjs";
import isToday from "../../scripts/filter/isToday";
import getTimeMs from "../../scripts/getTimeMs";
import Task from "../../props/Task";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const daysList = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

const formatWeeks = (weekdays: any[]) => {
  const length = weekdays.length;
  weekdays = weekdays.sort((prev: number, next: number) => prev - next);
  if (length === 1) return daysList[weekdays[0]];
  let dayString = "";
  weekdays.map((item: number, idx: number) => {
    if (idx == weekdays.length - 1)
      return (dayString += ` and ${daysList[item]}`);
    else if (idx === 0) dayString = daysList[item];
    else dayString += `, ${daysList[item]}`;
  });
  return dayString;
};

const convertNumberToPosition = (n: number) => {
  if (n === 1) return "1st";
  if (n === 2) return "2nd";
  if (n === 3) return "3rd";
  return `${n}th`;
};
const monthList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const formatMonths = (weekdays: any[]) => {
  const length = weekdays.length;
  weekdays = weekdays.sort((prev: number, next: number) => prev - next);
  if (length === 1) return monthList[weekdays[0]];
  let dayString = "";
  weekdays.map((item: number, idx: number) => {
    if (idx == weekdays.length - 1)
      return (dayString += ` and ${monthList[item]}`);
    else if (idx === 0) dayString = monthList[item];
    else dayString += `, ${monthList[item]}`;
  });
  return dayString;
};

export default function formatDateTime(item: Task) {
  let {
    repeat,
    time,
    date,
    reminder: { type, days = [], months = [], dateInMonth },
  } = item;

  const formattedTime = dayjs(new Date(getTimeMs(time))).format("h:mm A");
  if (repeat) {
    if (type === "daily") return `${formattedTime} everyday`;
    if (type === "weekly") return `${formattedTime} every ${formatWeeks(days)}`;
    if (type === "monthly" && dateInMonth)
      return `${formattedTime}, ${convertNumberToPosition(
        dateInMonth
      )} of every month`;
    if (type === "yearly" && dateInMonth)
      return `${formattedTime}, ${convertNumberToPosition(
        dateInMonth
      )} of ${formatMonths(months)}`;
  }

  return isToday(date)
    ? formattedTime
    : dayjs(new Date(`${date}T${time}`)).format("llll");
}
