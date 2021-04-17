import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useTaskDispatch } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import { useUser } from "../../context/userContext";
import deleteData from "../../scripts/deleteData";
import formatDateTime from "./formatDateTime";
import { TaskWrapper, TaskChild, Corner, RevealOnHover } from "./Styled";

const FutureTask = ({ data }) => {
  const time = formatDateTime(data);
  const taskDispatch = useTaskDispatch();
  const { user } = useUser();

  const deleteTask = () => {
    deleteData("user", `${user.uid}/tasks/${data.id}`)
      .then(() => toast.success(`${data.name} deleted`))
      .catch((err) => toast.error(err.message));
  };
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
          <MdDelete onClick={deleteTask} />
        </RevealOnHover>
        {data.labels}
        <Corner>{time}</Corner>
      </TaskChild>
    </TaskWrapper>
  );
};

export default FutureTask;
