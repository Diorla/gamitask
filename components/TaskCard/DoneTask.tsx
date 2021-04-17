import dayjs from "dayjs";
import React from "react";
import { useUser } from "../../context/userContext";
import addRemoveItemFromArray from "../../scripts/addRemoveItemFromArray";
import createData from "../../scripts/createData";
import Checkbox from "./Checkbox";
import formatDateTime from "./formatDateTime";
import { TaskWrapper, TaskChild, Corner } from "./Styled";

const DoneTask = ({ data }) => {
  const time = formatDateTime(data);
  const { user } = useUser();

  const { id, done } = data;

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
          <Checkbox onChange={checkDone} checked /> {data.name}
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

export default DoneTask;
