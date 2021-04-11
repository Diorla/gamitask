import { useRouter } from "next/router";
import React from "react";
import TaskCard from "../../components/TaskCard";
import AppContainer from "../../container/AppContainer";
import Layout from "../../container/Layout";
import { useTaskList } from "../../context/taskListContext";

export default function Priority() {
  const router = useRouter();
  const taskList = useTaskList();
  const { id } = router.query;
  const path = Array.isArray(id) ? id[0] : id;
  let filteredList = taskList.filter((item) => item.priority === Number(path));

  return (
    <Layout>
      <AppContainer active={path}>
        {filteredList.map((item, idx) => (
          <TaskCard data={item} key={idx} type="upcoming" />
        ))}
      </AppContainer>
    </Layout>
  );
}
