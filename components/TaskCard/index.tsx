import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
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
import Modal from "../Modal";
import TaskDetails from "./TaskDetails";

// TODO: Format labels
/**
 * For example, the following: "abc, def, ghi,   ,  " should return "abc, def, ghi"
 */
const TaskCard = ({ data, type }) => {
  const { user } = useUser();
  const time = formatDateTime(data);
  const { id, name, priority, difficulty, countdowns, done } = data;
  const taskDispatch = useTaskDispatch();
  const [showFullDetails, setShowFullDetails] = useState(false);

  const editTask = () => {
    taskDispatch(
      addTask({
        ...data,
        showModal: true,
      })
    );
  };
  const beginTask = () => {
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
    // const job = schedule.scheduleJob(date, function () {
    //   notifyUser(`${name}`);
    // });
    return () => {
      // job.cancel();
    };
  }, []);

  const isCurrent = type === "today" || type === "overdue";
  const isCompleted = type === "completed";
  return (
    <>
      {showFullDetails && (
        <Modal
          visible={showFullDetails}
          onClose={() => setShowFullDetails(false)}
        >
          <TaskDetails data={data} />
        </Modal>
      )}
      <TaskWrapper
        onClick={(e) => {
          const { className = "" } = e.target as HTMLDivElement;
          try {
            if (!className.includes("exclude")) setShowFullDetails(true);
          } catch (error) {}
        }}
      >
        <TaskChild>
          <Corner>
            {isCurrent && (
              <PlayStop running={false} toggleRunning={beginTask} />
            )}
            {isCurrent && <Checkbox onChange={checkDone} checked={false} />}
            {isCompleted && <Checkbox onChange={checkDone} checked />}
            {data.name}
          </Corner>
          <Corner>{data.project !== "Unsorted" && data.project}</Corner>
        </TaskChild>
        <TaskChild>
          <RevealOnHover>
            <MdEdit onClick={editTask} className="exclude" />
            <MdDelete onClick={deleteTask} className="exclude" />
          </RevealOnHover>
          {data.labels}
          <Corner>{time}</Corner>
        </TaskChild>
      </TaskWrapper>
    </>
  );
};

export default TaskCard;
