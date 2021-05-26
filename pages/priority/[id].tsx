import { useRouter } from "next/router";
import React from "react";
import TaskCard from "../../compounds/TaskCard";
import Layout from "../../container/Layout";
import { useTaskList } from "../../context/taskListContext";

export default function Priority() {
  const router = useRouter();
  const { taskList } = useTaskList();
  const { id } = router.query;
  const path = Array.isArray(id) ? id[0] : id;
  let filteredList = taskList
    .filter((item) => item.priority === Number(path) && !item.archive)
    .sort((prev, next) => (prev.name > next.name ? 1 : -1));

  return (
    <Layout activePath={path || ""}>
      <h3>Priority {id}</h3>
      {filteredList.map((item, idx) => (
        <TaskCard data={item} key={idx} type="upcoming" />
      ))}
    </Layout>
  );
}
