export type taskInfo = {
  label: string;
  value: string;
};

export default interface Reward {
  /**
   * Unique id
   */
  id?: string;
  /**
   * The title of the reward
   */
  name: string;
  /**
   * timed: will calculate points based on the length of time, default value
   * task: requires one or more task to be fulfilled
   */
  type: "timed" | "task";
  /**
   * Refers to the points that needs to be subtracted
   */
  point: number;
  /**
   * Preferred, uses global points_per_hour value
   */
  time: number;
  /**
   * Keeps record of the task id and name, for task based rewards.
   */
  task: taskInfo[];
  /**
   * list of when the rewards were activated
   */
  done: number[];
  /**
   * The list of task that has been done, used in tasked rewards
   */
  checklist?: string[];
  /**
   * Add note to reward
   */
  note: string;
}
