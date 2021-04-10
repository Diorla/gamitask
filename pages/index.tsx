import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AppContainer from "../container/AppContainer";
import Layout from "../container/Layout";
import { useTaskList } from "../context/taskListContext";
// import { useUser } from "../context/userContext";
// import watchData from "../scripts/watchData";

const TaskWrapper = styled.div`
  box-shadow: 0 0 2px silver;
  margin: 4px;
`;
const TaskChild = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Corner = styled.div`
  padding: 2px;
`;

const TaskCard = ({ data }) => {
  return (
    <TaskWrapper>
      <TaskChild>
        <Corner>Pl C {data.name}</Corner>
        <Corner>D Pr {data.project !== "Unsorted" && data.project}</Corner>
      </TaskChild>
      <TaskChild>
        <Corner>{data.label}</Corner>
        <Corner>A {data.dueDate}</Corner>
      </TaskChild>
    </TaskWrapper>
  );
};

export default function Home() {
  const taskList = useTaskList();
  return (
    <Layout>
      <AppContainer active="today">
        {taskList.map((item, idx) => (
          <TaskCard data={item} key={idx} />
        ))}
      </AppContainer>
    </Layout>
  );
}
