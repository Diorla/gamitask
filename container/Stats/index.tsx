import React from "react";
import Layout from "../Layout";
import { useTaskList } from "../../context/taskListContext";
// import BootstrapTable from "react-bootstrap-table-next";
import StatsWrapper from "./StatsWrapper";
import columns from "./columns";

export default function Stats(): JSX.Element {
  const taskList = useTaskList();
  return (
    <Layout activePath="stats" hideMenu>
      <a href="/">Home</a>
      <StatsWrapper>
        {/* <BootstrapTable keyField="id" data={taskList} columns={columns} /> */}
        Hello stats
      </StatsWrapper>
    </Layout>
  );
}
