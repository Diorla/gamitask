import Task from "../../context/taskContext/TaskProps";

const arrayToSentence = (duration: string[]) => {
  return duration.map((item: string) => item.toLowerCase()).join(", ");
};

interface ReminderProps {
  frequency: any;
  type: any;
  nth: any;
  days: any;
  months: any;
  count: number;
}

export default function formatReminder(event: string, reminder: ReminderProps) {
  let { frequency, type, nth, days, months, count } = reminder;
  frequency = nth ? ` ${frequency} ` : "";
  if (event === "once") return null;
  if (event === "n-times" || event === "forever") {
    const fullCount = event === "forever" ? "" : `${count} times`;
    if (type === "daily") {
      return (
        <span>
          Every{frequency}days, {fullCount}
        </span>
      );
    }
    if (type === "weekly") {
      const daysCount = days.length === 7 ? "everyday" : arrayToSentence(days);
      return (
        <span>
          Every{frequency}weeks, {daysCount}, {fullCount}
        </span>
      );
    }
    if (type === "monthly") {
      return (
        <span>
          Every{frequency}month, {fullCount}
        </span>
      );
    }
    if (type === "yearly") {
      const monthsCount =
        months.length === 12 ? "every month" : arrayToSentence(months);
      return (
        <span>
          Every{frequency}month, {monthsCount}, {fullCount}
        </span>
      );
    }
  }
}
