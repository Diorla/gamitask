import React from "react";
import AppContainer from "../container/AppContainer";
import Layout from "../container/Layout";
import { useTaskList } from "../context/taskListContext";
import TaskCollection from "../container/TaskCollection";
import isToday from "dayjs/plugin/isToday";
import dayjs from "dayjs";
import filter from "../scripts/filter";
import getTimeMs from "../scripts/getTimeMs";
import Task from "../props/Task";
import { useUser } from "../context/userContext";
dayjs.extend(isToday);
// TODO: When new user is created, set default values
/**
 * This includes user info
 * setting projects and labels array
 */
// TODO: Fix page error on refreshing
const sortSoonToLater = (prev: Task, next: Task) =>
  getTimeMs(prev.time) > getTimeMs(next.time) ? 1 : -1;

// TODO: When user check a task as done, do additional test
/**
 * In case user has not run the task (untimed task)
 * In this case, points is generated for checking the task
 * This is important for tasks that are not timed
 * It is also useful for tasks that are more like don't do, e.g. don't smoke
 * Priority and difficulty will still be important
 * @returns
 */
export default function Home() {
  const taskList = useTaskList();
  const { user } = useUser();
  const { runningTask } = user;
  const id = runningTask && runningTask.id;
  const { completed, overdue, today } = filter(
    taskList.sort(sortSoonToLater),
    id
  );

  return (
    <Layout>
      <AppContainer active="today">
        <TaskCollection data={completed} title="Completed" type="completed" />
        <TaskCollection data={overdue} title="Overdue" type="overdue" />
        <TaskCollection data={today} title="Today" type="today" />
      </AppContainer>
    </Layout>
  );
}
