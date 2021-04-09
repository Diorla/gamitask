import React from "react";
import styled from "styled-components";
import getDateTimeString from "../../scripts/getDateTimeString";
import { useTaskDispatch, useTaskState } from "./context/Task";
import { addTask } from "./redux/actions";

const Styled = styled.div`
  display: flex;
  align-items: center;
  & > input {
    border: 1px solid silver;
    margin-right: 4px;
  }
  & > div {
    color: ${({ theme }) => theme.palette.error.main};
  }
`;

export default function DueDate() {
  const taskDispatch = useTaskDispatch();
  const { dueDate } = useTaskState();

  const setDueDate = (n: string) =>
    taskDispatch(
      addTask({
        dueDate: n,
      })
    );

  const minDate = getDateTimeString(new Date());
  const errorLog = minDate > dueDate ? "Error, please set a future date" : "";

  return (
    <Styled>
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        min={minDate}
      />
      <div>{errorLog}</div>
    </Styled>
  );
}
