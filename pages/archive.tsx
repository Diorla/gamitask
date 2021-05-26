import React from "react";
import Layout from "../container/Layout";
import { useTaskList } from "../context/taskListContext";
import TaskCollection from "../container/TaskCollection";
import isToday from "dayjs/plugin/isToday";
import dayjs from "dayjs";
import filter from "../scripts/filter";
import getTimeMs from "../scripts/getTimeMs";
import Task from "../props/Task";
import PageLoader from "../compounds/PageLoader";
dayjs.extend(isToday);

const sortSoonToLater = (prev: Task, next: Task) =>
  getTimeMs(prev.time) > getTimeMs(next.time) ? 1 : -1;

export default function Archive(): JSX.Element {
  const { taskList, loadingTask } = useTaskList();
  const { archived } = filter(taskList.sort(sortSoonToLater));

  return (
    <Layout activePath="archive">
      {loadingTask ? (
        <PageLoader />
      ) : (
        <TaskCollection data={archived} title="Archive" type="archive" />
      )}
    </Layout>
  );
}
