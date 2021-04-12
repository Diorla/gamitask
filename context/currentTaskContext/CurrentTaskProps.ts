export default interface Task {
  id: string;
  name: string;
  startTime: number;
  priority: number;
  difficulty: number;
  countdowns: { [key: string]: any };
}
