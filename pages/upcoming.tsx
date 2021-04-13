import React from "react";
import AppContainer from "../container/AppContainer";
import Layout from "../container/Layout";
import { useTaskList } from "../context/taskListContext";
import Task from "../context/taskContext/TaskProps";
import TaskCollection from "../container/TaskCollection";
// import createDateCollection from "../scripts/createDateCollection";
// import dayjs from "dayjs";
import filter from "../scripts/filter";
//! TODO: Filter upcoming into different segments
/**
 * Break upcoming into tomorrow, next week etc as commented out
 */
// const filterAfterToday = (item: Task) =>
//   item.startTime && dayjs(item.startTime).isAfter(new Date(), "day");

const sortSoonToLater = (prev: Task, next: Task) =>
  new Date(prev.startTime) > new Date(next.startTime) ? 1 : -1;

export default function Upcoming() {
  const taskList = useTaskList();
  const { upcoming } = filter(taskList.sort(sortSoonToLater), "");
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
    <Layout>
      <AppContainer active="upcoming">
        <TaskCollection data={upcoming} title="Upcoming" type="upcoming" />
        {/* {tomorrow.length ? (
          <TaskCollection data={tomorrow} title="Tomorrow" type="upcoming" />
        ): null}
        {week.length ? (
          <TaskCollection data={week} title="Within 7 days" type="upcoming" />
        ): null}
        {nextWeek.length ? (
          <TaskCollection data={nextWeek} title="Next week" type="upcoming" />
        ): null}
        {month.length ? (
          <TaskCollection data={month} title="This month" type="upcoming" />
        ): null}
        {nextMonth.length ? (
          <TaskCollection data={nextMonth} title="Next month" type="upcoming" />
        ): null}
        {quarter.length ? (
          <TaskCollection data={quarter} title="This quarter" type="upcoming" />
        ): null}
        {year.length ? (
          <TaskCollection data={year} title="This year" type="upcoming" />
        ): null}
        {further.length ? (
          <TaskCollection data={further} title="Furthermore" type="upcoming" />
        ): null} */}
      </AppContainer>
    </Layout>
  );
}
