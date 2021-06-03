import React from "react";
import Layout from "../container/Layout";
import TaskCollection from "../container/TaskCollection";
import { useTaskList } from "../context/taskListContext";

export default function Difficulty(): JSX.Element {
  const { taskList } = useTaskList();

  /**
   * Group task into three category: easy, medium and difficult
   */
  const easyList = taskList
    .filter((item) => item.difficulty === 1 && !item.archive)
    .sort((prev, next) => (prev.name > next.name ? 1 : -1));

  const mediumList = taskList
    .filter((item) => item.difficulty === 2 && !item.archive)
    .sort((prev, next) => (prev.name > next.name ? 1 : -1));

  const difficultList = taskList
    .filter((item) => item.difficulty === 3 && !item.archive)
    .sort((prev, next) => (prev.name > next.name ? 1 : -1));

  return (
    <Layout activePath="difficulty">
      <TaskCollection data={easyList} title="Easy" type="others" />
      <TaskCollection data={mediumList} title="Medium" type="others" />
      <TaskCollection data={difficultList} title="Difficult" type="others" />
    </Layout>
  );
}
