export default interface Task {
  id?: string;
  name?: string;
  repeat?: boolean; // once or regularly
  date?: string;
  time?: string;
  dateInMonth?: number;
  reminder?: {
    type: string; // daily, weekly, monthly, yearly
    days: number[]; // if it's weekly, the days in the week
    months: number[]; // if it's year, the months
  };
  label?: string;
  priority?: number;
  difficulty?: number;
  project?: string;
  showModal?: boolean;
  done?: number[]; // generated when checked, consist of dates
  countdowns?: { [key: string]: any }; // used to keep record of the countdown, updated when completed
  points?: { [key: string]: any }; // keep all records of points earned, added when dropdown is completed or done is updated.
}
