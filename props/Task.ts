export default interface Task {
  /**
   * id: generated by uuid
   */
  id: string;
  /**
   * The name of the task
   */
  name: string;
  /**
   * false => one time thing
   * true => at regular intervals e.g daily or yearly
   */
  repeat: boolean;
  /**
   * The time it is going to happen, whether it's once or not
   */
  time: string;
  /**
   * The date that it will happen
   * For one time event
   */
  date: string;
  /**
   * For repetitive event
   */
  reminder: {
    /**
     * daily, weekly, monthly and yearly
     */
    type?: string;
    /**
     * For monthly and yearly events, between 1 to 31.
     */
    dateInMonth?: number;
    /**
     * For weekly events, 0 to 6
     * 0 = sun, 1 = mon etc
     */
    days?: number[];
    /**
     * For yearly events, 0 to 11,
     * 0 is jan, 1 is feb and 11 is dec
     */
    months?: number[]; // if it's year, the months
  };
  /**
   * like a tag, though it's is a string, each label should be separated by a string
   * e.g. "routine, daily, health" => 3 labels
   */
  labels: string;
  /**
   * Ranges from 1 to 5, based on level of importance
   */
  priority: number;
  /**
   * Ranges from 1(easy) to 3(difficult), indicate how hard it is going to be
   */
  difficulty: number;
  /**
   * The name of the project it belongs to, used to group tasks together
   */
  project: string;
  /**
   * Keeps a record of all days an event is checked, ie. marked as done
   * It is saved as milliseconds, ie. Date.now(), based on the beginning of that date,
   * i.e. Date.getHours() = 0 and Date.getMinutes() = 0.
   */
  done: number[];
  /**
   * The key indicates the date, it will be created using t+dayBegin.valueOf()
   * So, I will get something like t120894244654
   * The array will contain items, indicating startTime, using Date.now() and the
   * "length" in milliseconds. When countdown is started, it will be 0.
   */
  countdowns: {
    [key: string]: [
      {
        startTime: number;
        length: number;
      }
    ];
  };
  /**
   * Similar to countdowns, it keeps record of each points earned using "t" + Date.now() as key while value is the points accrued.
   */
  points: { [key: string]: any }; // keep all records of points earned, added when dropdown is completed or done is updated.
  showModal: boolean;
  /**
   * Indicate created date, and any date that an input is made
   */
  modified: number;
  /**
   * Sort of "deleted" state without actually deleting it, so that user can still have access to the data, with it appearing in their todo list
   */
  archive: number;
  /**
   * List of rewards, for tasked rewards
   */
  rewards: string[];
  /**
   * Used to indicate last time it was checked as done
   * the number is from Date.now(), 0 indicates that it was never done
   * It will be used to for filter algorithm as well
   */
  lastCompleted: number | 0;
  /**
   * Use to maintain streak. Anytime a new data is checked, it will check
   * if the lastCompleted is within the due date, e.g. if it's daily, then lastCompleted must
   * yesterday, if it is weekend(sun and sat) and today is sat, then lastCompleted must be
   * last Sunday. If it is true, it will increase it, otherwise, it will reset to 1
   */
  streak: number;
  /**
   * used to determine if it will have a countdown. Calculation of points depends on streak
   * In order to prevent the value ballooning, I will use log to calculate streak
   */
  timed: boolean;
  /**
   * This is for description or additional information
   */
  note: string;
  /**
   * The date it was created
   */
  created: number;
}
