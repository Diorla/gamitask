import { useRouter } from "next/router";
import React from "react";
import TaskCard from "../../components/TaskCard";
import AppContainer from "../../container/AppContainer";
import Layout from "../../container/Layout";
import { useTaskList } from "../../context/taskListContext";

/**
 * ?//TODO: Add error page to path
 * for example, if someone deliberately typed difficulty/not-so-hard, I should have a 
 * response like "Not fair, we only have three levels of difficulty"
 */
export default function Difficulty() {
  const router = useRouter();
  const taskList = useTaskList();
  const { id } = router.query;
  let filteredList = [];
  const path = Array.isArray(id) ? id[0] : id;
  if (path === "low")
    filteredList = taskList.filter((item) => item.difficulty === 1);
  if (path === "medium")
    filteredList = taskList.filter((item) => item.difficulty === 2);
  if (path === "high")
    filteredList = taskList.filter((item) => item.difficulty === 3);
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
