export const daysList = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

export default function formatWeeks(weekdays: any[]): string {
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
}
