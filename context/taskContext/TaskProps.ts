export default interface Task {
  name?: string;
  startTime?: string; // date & time
  event?: string; //"once" | "n-times" | "forever";
  reminder?: {
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
}
