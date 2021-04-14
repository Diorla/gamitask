import React from "react";
import styled from "styled-components";
import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import Reminder from "./Reminder";
import { extractTime, updateTime, extractDate, updateDate } from "./timeFn";

const Row = styled.div`
  display: flex;
  align-items: center;
  & > input {
    border: 1px solid silver;
    margin-right: 4px;
  }
  & > label {
    margin-right: 12px;
  }
  & > div {
    color: ${({ theme }) => theme.palette.error.main};
  }
`;

export default function DueDate() {
  const taskDispatch = useTaskDispatch();
  const { repeat, date, time } = useTaskState();

  const setEvent = (repeat: boolean) => {
    taskDispatch(
      addTask({
        repeat,
      })
    );
  };

  const setDate = (date: string) => {
    taskDispatch(
      addTask({
        date,
      })
    );
  };

  const setTime = (time: string) => {
    taskDispatch(
      addTask({
        time,
      })
    );
  };

  return (
    <div>
      <Row>
        <input
          id="never"
          type="radio"
          checked={!repeat}
          onChange={() => setEvent(!repeat)}
        />{" "}
        <label htmlFor="never">Once</label>
        <input
          id="repeat"
          type="radio"
          checked={repeat}
          onChange={() => setEvent(!repeat)}
        />{" "}
        <label htmlFor="repeat">Repeat</label>
      </Row>
      <div>
        <label htmlFor="time">Time: </label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      {!repeat && (
        <>
          <label htmlFor="date">Date: </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </>
      )}
      {repeat && <Reminder />}
    </div>
  );
}
