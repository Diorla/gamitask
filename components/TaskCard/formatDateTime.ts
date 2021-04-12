import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export default function formatDateTime(
  startTime: string | number | Date,
  type: string
) {
  const time = startTime && dayjs(startTime).format("HH:mm A");
  const dateTime = startTime && dayjs(startTime).format("llll");
  const countdown = startTime && dayjs().from(dayjs(startTime), true);

  if (type === "today") {
    return time;
  } else if (type === "overdue") {
    return `${countdown} ago`;
  }
  return dateTime;
}
