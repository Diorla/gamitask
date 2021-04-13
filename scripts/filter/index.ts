import dayjs from "dayjs";

const addToday = () => {
  // I could filter it further to overdue and today(not yet due)
  return "add it to today";
};

const addUpcoming = () => {
  // Will need maths to determine the nearest time it will be due based on repetition
  // I will probably leave this to the FutureTask component
  return "add it to upcoming";
};

const addArchive = () => {
  // Will be used remove tasks and saved into archives. I don't support it yet but I
  // can use it to reduce reads
  return "archived";
};

export default function filterToday({ event, startTime, reminder, done }) {
  const { type, count, nth, frequency, days, months } = reminder;
  const taskDate = new Date(startTime);
  const currentDate = new Date();
  // The task has been done, I should probably create an "archive" folder
  // to toss them, and reduce document reads
  if (event === "once" || event === "n-times") {
    if (count >= done.length) addArchive();
  } else if (event === "once") {
    // No maths here
    if (dayjs(startTime).isToday()) addToday();
    else addUpcoming();
  } else {
    // n-times and forever
    if (!nth) {
      // every - day/week/month/year
      if (type === "daily") addToday();
      else if (type === "weekly") {
        // the day of the week matches the days
        if (days.includes(currentDate.getDay())) addToday();
        else addUpcoming();
      } else if (type === "monthly") {
        if (taskDate.getDate() === currentDate.getDate()) addToday();
        else addUpcoming();
      } else {
        if (
          taskDate.getDate() === currentDate.getDate() &&
          months.includes(currentDate.getMonth())
        )
          addToday();
        else addUpcoming();
      }
    } else {
      // there is frequency e.g. every other day, or every 4 months
      if (type === "daily") {
        const dayDifference = dayjs(currentDate).diff(taskDate, "day");
        if (!(dayDifference % frequency)) addToday();
        else addUpcoming;
      } else if (type === "weekly") {
        const weekDifference = dayjs(currentDate).diff(taskDate, "week");
        if (
          !(weekDifference % frequency) &&
          days.includes(currentDate.getDay())
        )
          addToday();
        else addUpcoming();
      } else if (type === "monthly") {
        const monthDifference = dayjs(currentDate).diff(taskDate, "month");
        if (
          !(monthDifference % frequency) &&
          taskDate.getDate() === currentDate.getDate()
        )
          addToday();
        else addUpcoming();
      } else {
        const yearDifference = dayjs(currentDate).diff(taskDate, "year");
        if (
          !(yearDifference % frequency) &&
          taskDate.getDate() === currentDate.getDate() &&
          months.includes(currentDate.getMonth())
        )
          addToday();
        else addUpcoming();
      }
    }
  }
  return "";
}
