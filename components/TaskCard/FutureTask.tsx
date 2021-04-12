import React from "react";
import { MdRepeat } from "react-icons/md";
import formatDateTime from "./formatDateTime";
import { TaskWrapper, TaskChild, Corner } from "./Styled";

const FutureTask = ({ data, type }) => {
  const time = formatDateTime(data.startTime, type);
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
          {data.event !== "once" && <MdRepeat />}
        </Corner>
      </TaskChild>
    </TaskWrapper>
  );
};

export default FutureTask;
