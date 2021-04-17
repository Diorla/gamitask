import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useTaskDispatch } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import formatDateTime from "./formatDateTime";
import { TaskWrapper, TaskChild, Corner, RevealOnHover } from "./Styled";

const FutureTask = ({ data }) => {
  const time = formatDateTime(data);
  const taskDispatch = useTaskDispatch();

  const editTask = () => {
    taskDispatch(
      addTask({
        ...data,
        showModal: true,
      })
    );
  };
  return (
    <TaskWrapper>
      <TaskChild>
        <Corner> {data.name}</Corner>
        <Corner>{data.project !== "Unsorted" && data.project}</Corner>
      </TaskChild>
      <TaskChild>
        <RevealOnHover>
          <MdEdit onClick={editTask} />
          <MdDelete />
        </RevealOnHover>
        {data.labels}
        <Corner>{time}</Corner>
      </TaskChild>
    </TaskWrapper>
  );
};

export default FutureTask;
