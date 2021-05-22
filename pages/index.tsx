import React from "react";
import Layout from "../container/Layout";
import { useTaskList } from "../context/taskListContext";
import TaskCollection from "../container/TaskCollection";
import isToday from "dayjs/plugin/isToday";
import dayjs from "dayjs";
import filter from "../scripts/filter";
import Task from "../props/Task";
dayjs.extend(isToday);

const sortAlphabetically = (prev: Task, next: Task) =>
  prev.name.toLowerCase() > next.name.toLowerCase() ? 1 : -1;

export default function Home(): JSX.Element {
  const taskList = useTaskList();
  const { completed, overdue, today } = filter(
    taskList.sort(sortAlphabetically)
  );

  return (
    <Layout activePath="today">
      <TaskCollection data={overdue} title="Overdue" type="overdue" />
      <TaskCollection data={today} title="Today" type="today" />
      <TaskCollection data={completed} title="Completed" type="completed" />
    </Layout>
  );
}
