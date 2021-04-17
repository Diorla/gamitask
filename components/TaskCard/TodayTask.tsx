import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useUser } from "../../context/userContext";
import addRemoveItemFromArray from "../../scripts/addRemoveItemFromArray";
import createData from "../../scripts/createData";
// import notifyUser from "../../scripts/notifyUser";
import PlayStop from "./PlayStop";
import { TaskWrapper, TaskChild, Corner, RevealOnHover } from "./Styled";
// import schedule from "node-schedule";
import { toast } from "react-toastify";
import formatDateTime from "./formatDateTime";
import Checkbox from "./Checkbox";
import { MdDelete, MdEdit } from "react-icons/md";
import { useTaskDispatch } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import deleteData from "../../scripts/deleteData";

const TodayTask = ({ data }) => {
  const { user } = useUser();
  const time = formatDateTime(data);
  const { id, name, priority, difficulty, countdowns, done } = data;
  const taskDispatch = useTaskDispatch();

  const editTask = () => {
    taskDispatch(
      addTask({
        ...data,
        showModal: true,
      })
    );
  };
  const beginTask = () => {
    // TODO: Insert checks here for running task
    /**
     * So that I can save the current running task
     */
    const startTime = Date.now();
    createData("user", user.uid, {
      runningTask: {
        id,
        name,
        priority,
        difficulty,
        startTime,
        countdowns,
      },
    }).catch((err) => toast.error(err));
  };

  const checkDone = () => {
    const dateId = dayjs().hour(0).minute(0).second(0).millisecond(0).valueOf();
    createData("user", `${user.uid}/tasks/${id}`, {
      done: addRemoveItemFromArray(dateId, done),
    }).catch((err) => toast.error(err));
  };

  const deleteTask = () => {
    deleteData("user", `${user.uid}/tasks/${data.id}`)
      .then(() => toast.success(`${data.name} deleted`))
      .catch((err) => toast.error(err.message));
  };
  
  useEffect(() => {
    // TODO: Implement schedule, like 20 minutes before due date.
    // const date = new Date(startTime);
    // schedule.scheduleJob(date, function () {
    //   notifyUser(`${name}`);
    // });
  }, []);

  return (
    <TaskWrapper>
      <TaskChild>
        <Corner>
          <PlayStop running={false} toggleRunning={beginTask} />
          <Checkbox onChange={checkDone} checked={false} /> {data.name}
        </Corner>
        <Corner>{data.project !== "Unsorted" && data.project}</Corner>
      </TaskChild>
      <TaskChild>
        <RevealOnHover>
          <MdEdit onClick={editTask} />
          <MdDelete onClick={deleteTask} />
        </RevealOnHover>
        {data.labels}
        <Corner>{time}</Corner>
      </TaskChild>
    </TaskWrapper>
  );
};

export default TodayTask;
