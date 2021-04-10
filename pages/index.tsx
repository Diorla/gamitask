import React from "react";
import AppContainer from "../container/AppContainer";
import Layout from "../container/Layout";
import { useTaskList } from "../context/taskListContext";
import { isBefore, isToday } from "date-fns";
import Task from "../context/taskContext/TaskProps";
import TaskCard from "../components/TaskCard";

const filterToday = (item: Task) =>
  item.dueDate && isToday(new Date(item.dueDate));

const filterBeforeToday = (item: Task) =>
  item.dueDate && isBefore(new Date(item.dueDate), new Date());

const sortSoonToLater = (prev: Task, next: Task) =>
  new Date(prev.dueDate) > new Date(next.dueDate) ? 1 : -1;

export default function Home() {
  const taskList = useTaskList();
  console.log({ taskList });
  return (
    <Layout>
      <AppContainer active="today">
        <h3>Overdue</h3>
        <div>
          {taskList
            .filter(filterBeforeToday)
            .sort(sortSoonToLater)
            .map((item, idx) => (
              <TaskCard data={item} key={idx} type="overdue" />
            ))}
        </div>
        <h3>Today</h3>
        <div>
          {taskList
            .filter(filterToday)
            .sort(sortSoonToLater)
            .map((item, idx) => (
              <TaskCard data={item} key={idx} type="today" />
            ))}
        </div>
      </AppContainer>
    </Layout>
  );
}
