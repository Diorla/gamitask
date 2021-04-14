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
dayjs.extend(isToday);

const sortSoonToLater = (prev: Task, next: Task) =>
  new Date(prev.startTime) > new Date(next.startTime) ? 1 : -1;

export default function Home() {
  const taskList = useTaskList();
  const {
    runningTask: { id },
  } = useUserInfo();

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
