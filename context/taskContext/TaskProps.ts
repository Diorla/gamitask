export default interface Task {
  id?: string;
  name?: string;
  startTime?: string; // date & time
  event?: string; //"once" | "n-times" | "forever";
  reminder?: {
    frequency: number; // every n days/weeks/months/years
    count: number; // used for n-times, to indicate how many times
    type: string; // daily, weekly, monthly, yearly
    nth: boolean; // e.g. true: everyday, false: every n day
    days: string[]; // if it's weekly, the days in the week
    months: string[]; // if it's year, the months
  };
  label?: string;
  priority?: number;
  difficulty?: number;
  project?: string;
  showModal?: boolean;
  done?: string[]; // generated when checked, consist of dates
  countdowns?: { [key: string]: any }; // used to keep record of the countdown, updated when completed
  points?: { [key: string]: any }; // keep all records of points earned, added when dropdown is completed or done is updated.
}
