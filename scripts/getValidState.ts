import Task from "../props/Task";

export default function getValidState(data: Task) {
  const {
    repeat,
    time,
    name,
    date,
    reminder: { type, dateInMonth, days = [], months = [] },
  } = data;
  if (!name) return { message: "Please provide a name", isValid: false };
  if (!time) return { message: "Please provide a time", isValid: false };
  if (!repeat && !date) {
    return { message: "Please provide a date", isValid: false };
  }
  if (repeat) {
    if (type === "weekly" && !days.length)
      return { message: "Please select one or more days", isValid: false };
    if (type === "monthly" && !dateInMonth)
      return { message: "Please select date", isValid: false };
    if (type === "yearly" && !months.length)
      return { message: "Please select a one or more months", isValid: false };
  }
  return { message: "Successful", isValid: true };
}
