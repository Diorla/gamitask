import React from "react";
import AppContainer from "../container/AppContainer";
import Layout from "../container/Layout";
import { useTaskList } from "../context/taskListContext";
import Task from "../context/taskContext/TaskProps";
import TaskCollection from "../container/TaskCollection";
import isToday from "dayjs/plugin/isToday";
import dayjs from "dayjs";
import filter from "../scripts/filter";
import { useUserInfo } from "../context/userInfoContext";
import getTimeMs from "../scripts/getTimeMs";
dayjs.extend(isToday);

// TODO: Fix page error on refreshing
const sortSoonToLater = (prev: Task, next: Task) =>
  getTimeMs(prev.time) > getTimeMs(next.time) ? 1 : -1;

export default function Home() {
  const taskList = useTaskList();
  const { runningTask } = useUserInfo();

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
