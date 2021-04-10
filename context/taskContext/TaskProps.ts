export default interface Task {
  name?: string;
  reminder?: {
    type: string;
    nth: boolean;
    count: number;
    startDate: string;
    time: string;
    weekdays?: string[];
    date: string;
    months?: string[];
  };
  dueDate?: string;
  label?: string;
  priority?: number;
  difficulty?: number;
  project?: string;
  showModal?: boolean;
};
