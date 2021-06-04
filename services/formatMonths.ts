export const monthList = [
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

export default function formatMonths(weekdays: any[]): string {
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
}
