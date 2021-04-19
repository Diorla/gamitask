import Task from "../../props/Task";
import filterTypes from "./filterTypes";

export default function filterYearly(task: Task): filterTypes {
  // TODO: complete country
//  * Repeated
//   *  Yearly
//   *    month includes this month
//   *      date includes today
//   *        Done today => completed
//   *        Not done
//   *          Before now => overdue
//   *          After now => today
//   *      date does not include today => upcoming
//   *    month does not include this month
//   *      Nearest month & date is done => upcoming
//   *      Nearest month & date is not done => overdue
  
  return "upcoming";
}
