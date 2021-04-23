import dayjs from "dayjs";
import DateType from "./DateType";

const pluralise = (word: string, value: number) => {
  if (value > 1) return word + "s";
  return word;
};
const formatDate = (value: number, dateType: DateType, isFuture: boolean) => {
  if (isFuture) {
    if (dateType === "year") {
      if (value === 1) return "Next year";
      return `In ${value} ${pluralise("year", value)}`;
    }
    if (dateType === "month") {
      if (value === 1) return "Next month";
      return `In ${value} ${pluralise("month", value)}`;
    }
    if (dateType === "week") {
      if (value === 1) return "Next week";
      return `In ${value} ${pluralise("week", value)}`;
    }
    if (dateType === "day") {
      if (value === 1) return "Tomorrow";
      return `In ${value} ${pluralise("day", value)}`;
    }
    if (dateType === "hour") return `In ${value} ${pluralise("hour", value)}`;
    if (dateType === "minute")
      return `In ${value} ${pluralise("minute", value)}`;
    if (dateType === "second")
      return `In ${value} ${pluralise("second", value)}`;
    if (dateType === "millisecond")
      return `In ${value} ${pluralise("millisecond", value)}`;
  } else {
    value = Math.abs(value);
    if (dateType === "year") {
      if (value === 1) return "Last year";
      return `${value} ${pluralise("year", value)} ago`;
    }
    if (dateType === "month") {
      if (value === 1) return "Last month";
      return `${value} ${pluralise("month", value)} ago`;
    }
    if (dateType === "week") {
      if (value === 1) return "Last week";
      return `${value} ${pluralise("week", value)} ago`;
    }
    if (dateType === "day") {
      if (value === 1) return "Yesterday";
      return `${value} ${pluralise("day", value)} ago`;
    }
    if (dateType === "hour") return `${value} ${pluralise("hour", value)} ago`;
    if (dateType === "minute")
      return `${value} ${pluralise("minute", value)} ago`;
    if (dateType === "second")
      return `${value} ${pluralise("second", value)} ago`;
    if (dateType === "millisecond")
      return `${value} ${pluralise("millisecond", value)} ago`;
  }
};
export default function getDateDifference(date1: Date, date2 = new Date()) {
  const msDiff = dayjs(date1).diff(date2);
  const dateType: DateType[] = [
    "year",
    "month",
    "week",
    "day",
    "hour",
    "minute",
    "second",
    "millisecond",
  ];
  for (let date of dateType) {
    const dateDiff = dayjs(date1).diff(date2, date);
    if (dateDiff) return formatDate(dateDiff, date, msDiff > 0);
  }
}
