import React from "react";
import Layout from "../container/Layout";
import { useTaskList } from "../context/taskListContext";
import TaskCollection from "../container/TaskCollection";
import filter from "../scripts/filter";
import PageLoader from "../compounds/PageLoader";

export default function Home(): JSX.Element {
  const { taskList, loadingTask } = useTaskList();
  const { completed, overdue, today } = filter(taskList);

  return (
    <Layout activePath="today">
      {loadingTask ? (
        <PageLoader />
      ) : (
        <>
          <TaskCollection data={overdue} title="overdue" type="today" />
          <TaskCollection data={today} title="today" type="today" />
          <TaskCollection data={completed} title="completed" type="others" />
        </>
      )}
    </Layout>
  );
}
