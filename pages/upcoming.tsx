import React from "react";
import Layout from "../container/Layout";
import { useTaskList } from "../context/taskListContext";
import TaskCollection from "../container/TaskCollection";
// import createDateCollection from "../scripts/createDateCollection";
// import dayjs from "dayjs";
import filter from "../scripts/filter";
import getTimeMs from "../scripts/getTimeMs";
import Task from "../props/Task";
import PageLoader from "../compounds/PageLoader";
//! TODO: Filter upcoming into different segments
/**
 * Break upcoming into tomorrow, next week etc as commented out
 * First, I have to discover the next due date
 * And then determine which sector the next due date belongs to
 */
// const filterAfterToday = (item: Task) =>
//   item.startTime && dayjs(item.startTime).isAfter(new Date(), "day");

const sortSoonToLater = (prev: Task, next: Task) =>
  getTimeMs(prev.time) > getTimeMs(next.time) ? 1 : -1;

export default function Upcoming(): JSX.Element {
  const { taskList, loadingTask } = useTaskList();
  const { upcoming } = filter(taskList.sort(sortSoonToLater));
  // const futureTasks = taskList.filter(filterAfterToday).sort(sortSoonToLater);
  // const {
  //   tomorrow,
  //   week,
  //   nextWeek,
  //   month,
  //   nextMonth,
  //   quarter,
  //   year,
  //   further,
  // } = createDateCollection(futureTasks);

  return (
    <Layout activePath="upcoming">
      {loadingTask ? (
        <PageLoader />
      ) : (
        <TaskCollection data={upcoming} title="Upcoming" type="others" />
      )}
    </Layout>
  );
}
