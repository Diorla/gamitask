import React from "react";
import styled from "styled-components";
import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import Reminder from "./Reminder";

const Row = styled.div`
  display: flex;
  align-items: center;
  & > input {
    border: 0.1rem solid silver;
    margin-right: 0.4rem;
  }
  & > label {
    margin-right: 1.2rem;
  }
  & > div {
    color: ${({ theme }) => theme.palette.error.main};
  }
`;

export default function DueDate() {
  const taskDispatch = useTaskDispatch();
  const task = useTaskState();
  const { repeat, date, time } = task;
  const setEvent = (repeat: boolean) => {
    taskDispatch(
      addTask({
        ...task,
        repeat,
      })
    );
  };

  const setDate = (date: string) => {
    taskDispatch(
      addTask({
        ...task,
        date,
      })
    );
  };

  const setTime = (time: string) => {
    taskDispatch(
      addTask({
        ...task,
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
