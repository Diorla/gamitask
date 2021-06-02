import React from "react";
import Layout from "../container/Layout";
import TaskCollection from "../container/TaskCollection";
import { useTaskList } from "../context/taskListContext";
import Task from "../props/Task";

const taskBasedOnPriority = (taskList: Task[], priority: number) =>
  taskList
    .filter((item) => item.priority === priority && !item.archive)
    .sort((prev, next) => (prev.name > next.name ? 1 : -1));

export default function Priority(): JSX.Element {
  const { taskList } = useTaskList();

  return (
    <Layout activePath="priority">
      <TaskCollection
        data={taskBasedOnPriority(taskList, 1)}
        title="Priority 1"
        type="upcoming"
      />
      <TaskCollection
        data={taskBasedOnPriority(taskList, 2)}
        title="Priority 2"
        type="upcoming"
      />
      <TaskCollection
        data={taskBasedOnPriority(taskList, 3)}
        title="Priority 3"
        type="upcoming"
      />
      <TaskCollection
        data={taskBasedOnPriority(taskList, 4)}
        title="Priority 4"
        type="upcoming"
      />
      <TaskCollection
        data={taskBasedOnPriority(taskList, 5)}
        title="Priority 5"
        type="upcoming"
      />
    </Layout>
  );
}
