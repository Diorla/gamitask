import { useRouter } from "next/router";
import React from "react";
import TaskCard from "../../components/TaskCard";
import Layout from "../../container/Layout";
import { useTaskList } from "../../context/taskListContext";
import Task from "../../props/Task";

export default function Difficulty() {
  const router = useRouter();
  const taskList = useTaskList();
  const { id } = router.query;
  let filteredList: Task[] = [];
  const path = Array.isArray(id) ? id[0] : id;
  if (path === "easy")
    filteredList = taskList
      .filter((item) => item.difficulty === 1 && !item.archive)
      .sort((prev, next) => (prev.name > next.name ? 1 : -1));
  if (path === "medium")
    filteredList = taskList
      .filter((item) => item.difficulty === 2 && !item.archive)
      .sort((prev, next) => (prev.name > next.name ? 1 : -1));
  if (path === "difficult")
    filteredList = taskList
      .filter((item) => item.difficulty === 3 && !item.archive)
      .sort((prev, next) => (prev.name > next.name ? 1 : -1));
  return (
    <Layout activePath={path || ""}>
      <h3 style={{ textTransform: "capitalize" }}>{path}</h3>
      {filteredList.map((item, idx) => (
        <TaskCard data={item} key={idx} type="upcoming" />
      ))}
    </Layout>
  );
}
