import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useCurrentTaskDispatch } from "../../context/currentTaskContext";
import { startTask } from "../../context/currentTaskContext/actions";
import { useUser } from "../../context/userContext";
import addRemoveItemFromArray from "../../scripts/addRemoveItemFromArray";
import createData from "../../scripts/createData";
import notifyUser from "../../scripts/notifyUser";
import formatDateTime from "./formatDateTime";
import PlayStop from "./PlayStop";
import { TaskWrapper, TaskChild, Corner } from "./Styled";
import schedule from "node-schedule";

const TodayTask = ({ data, type }) => {
  const time = formatDateTime(data.startTime, type);
  const taskDispatch = useCurrentTaskDispatch();
  const { user } = useUser();

  const { id, name, priority, difficulty, countdowns, done, startTime } = data;

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

  useEffect(() => {
    // TODO: Implement schedule, like 20 minutes before due date.
    const date = new Date(startTime);
    schedule.scheduleJob(date, function () {
      notifyUser(`${name}`);
    });
  }, []);

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
