import React from "react";
import AppContainer from "../container/AppContainer";
import Layout from "../container/Layout";
import { useTaskList } from "../context/taskListContext";
import Task from "../context/taskContext/TaskProps";
import TaskCollection from "../container/TaskCollection";
import isToday from "dayjs/plugin/isToday";
import dayjs from "dayjs";
import { useCurrentTaskState } from "../context/currentTaskContext";
dayjs.extend(isToday);

/**
 * ?//TODO: Update filter
 * Create a more extensive filter that will consider repeat to determine if it's overdue
 */

const filterToday = (item: Task) =>
  item.startTime && dayjs(item.startTime).isToday() && !filterBeforeNow(item);

const filterBeforeNow = (item: Task) =>
  item.startTime && dayjs(item.startTime).isBefore(new Date());

const sortSoonToLater = (prev: Task, next: Task) =>
  new Date(prev.startTime) > new Date(next.startTime) ? 1 : -1;

const removeRunningTask = (item: Task, id: string) => item.id !== id;
export default function Home() {
  const taskList = useTaskList();
  const { id } = useCurrentTaskState();
  const overdueTasks = taskList
    .filter(filterBeforeNow)
    .filter((item) => removeRunningTask(item, id))
    .sort(sortSoonToLater);
  const todayTasks = taskList
    .filter(filterToday)
    .filter((item) => removeRunningTask(item, id))
    .sort(sortSoonToLater);

  return (
    <Layout>
      <AppContainer active="today">
        <TaskCollection data={overdueTasks} title="Overdue" type="overdue" />
        <TaskCollection data={todayTasks} title="Today" type="today" />
      </AppContainer>
    </Layout>
  );
}
