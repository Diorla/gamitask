import React from "react";
import AppContainer from "../container/AppContainer";
import Layout from "../container/Layout";
import { useTaskList } from "../context/taskListContext";
import Task from "../context/taskContext/TaskProps";
import TaskCollection from "../container/TaskCollection";
import isToday from "dayjs/plugin/isToday";
import dayjs from "dayjs";

dayjs.extend(isToday);

const filterToday = (item: Task) =>
  item.dueDate && dayjs(item.dueDate).isToday();

const filterBeforeNow = (item: Task) =>
  item.dueDate && dayjs(item.dueDate).isBefore(new Date());

const sortSoonToLater = (prev: Task, next: Task) =>
  new Date(prev.dueDate) > new Date(next.dueDate) ? 1 : -1;

export default function Home() {
  const taskList = useTaskList();
  const overdueTasks = taskList.filter(filterBeforeNow).sort(sortSoonToLater);
  const todayTasks = taskList.filter(filterToday).sort(sortSoonToLater);
  return (
    <Layout>
      <AppContainer active="today">
        <TaskCollection data={overdueTasks} title="Overdue" type="overdue" />
        <TaskCollection data={todayTasks} title="Today" type="today" />
      </AppContainer>
    </Layout>
  );
}
