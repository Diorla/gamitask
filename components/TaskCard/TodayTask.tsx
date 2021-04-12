import React from "react";
import { useCurrentTaskDispatch } from "../../context/currentTaskContext";
import { startTask } from "../../context/currentTaskContext/actions";
import formatDateTime from "./formatDateTime";
import PlayStop from "./PlayStop";
import { TaskWrapper, TaskChild, Corner } from "./Styled";

const TodayTask = ({ data, type }) => {
  const time = formatDateTime(data.startTime, type);
  const taskDispatch = useCurrentTaskDispatch();

  const { id, name, priority, difficulty } = data;
  const beginTask = () => {
    taskDispatch(
      startTask({ id, name, priority, difficulty, startTime: Date.now() })
    );
  };

  return (
    <TaskWrapper>
      <TaskChild>
        <Corner>
          <PlayStop running={false} toggleRunning={beginTask} />
          <input type="checkbox" /> {data.name}
        </Corner>
        <Corner>{data.project !== "Unsorted" && data.project}</Corner>
      </TaskChild>
      <TaskChild>
        <Corner>{data.label}</Corner>
        <Corner>{time}</Corner>
      </TaskChild>
    </TaskWrapper>
  );
};

export default TodayTask;
