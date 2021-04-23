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
  if (path === "low")
    filteredList = taskList.filter((item) => item.difficulty === 1);
  if (path === "medium")
    filteredList = taskList.filter((item) => item.difficulty === 2);
  if (path === "high")
    filteredList = taskList.filter((item) => item.difficulty === 3);
  return (
    <Layout activePath={path || ""}>
      {filteredList.map((item, idx) => (
        <TaskCard data={item} key={idx} type="upcoming" />
      ))}
    </Layout>
  );
}
