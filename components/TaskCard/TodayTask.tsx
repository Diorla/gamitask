import dayjs from "dayjs";
import React from "react";
import { useCurrentTaskDispatch } from "../../context/currentTaskContext";
import { startTask } from "../../context/currentTaskContext/actions";
import { useUser } from "../../context/userContext";
import addRemoveItemFromArray from "../../scripts/addRemoveItemFromArray";
import createData from "../../scripts/createData";
import formatDateTime from "./formatDateTime";
import PlayStop from "./PlayStop";
import { TaskWrapper, TaskChild, Corner } from "./Styled";

const TodayTask = ({ data, type }) => {
  const time = formatDateTime(data.startTime, type);
  const taskDispatch = useCurrentTaskDispatch();
  const { user } = useUser();

  const { id, name, priority, difficulty, countdowns, done } = data;
  const beginTask = () => {
    taskDispatch(
      startTask({
        id,
        name,
        priority,
        difficulty,
        startTime: Date.now(),
        countdowns,
      })
    );
  };

  const checkDone = () => {
    const dateId = dayjs().hour(0).minute(0).second(0).millisecond(0).valueOf();
    createData("user", `${user.uid}/tasks/${id}`, {
      done: addRemoveItemFromArray(dateId, done),
    });
  };

  return (
    <TaskWrapper>
      <TaskChild>
        <Corner>
          <PlayStop running={false} toggleRunning={beginTask} />
          <input type="checkbox" onChange={checkDone} /> {data.name}
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
