import React from "react";
import formatDateTime from "./formatDateTime";
import { TaskWrapper, TaskChild, Corner } from "./Styled";

const FutureTask = ({ data }) => {
  const time = formatDateTime(data);
  return (
    <TaskWrapper>
      <TaskChild>
        <Corner> {data.name}</Corner>
        <Corner>{data.project !== "Unsorted" && data.project}</Corner>
      </TaskChild>
      <TaskChild>
        <Corner>{data.label}</Corner>
        <Corner>
          {time}
        </Corner>
      </TaskChild>
    </TaskWrapper>
  );
};

export default FutureTask;
