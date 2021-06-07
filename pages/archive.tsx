import React from "react";
import Layout from "../container/Layout";
import { useTaskList } from "../context/taskListContext";
import TaskCollection from "../container/TaskCollection";
import filter from "../scripts/filter";
import PageLoader from "../compounds/PageLoader";

export default function Archive(): JSX.Element {
  const { taskList, loadingTask } = useTaskList();
  const { archived } = filter(taskList);

  return (
    <Layout activePath="archive">
      {loadingTask ? (
        <PageLoader />
      ) : (
        <TaskCollection data={archived} title="archive" type="others" />
      )}
    </Layout>
  );
}
