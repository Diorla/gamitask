import React from "react";
import styled from "styled-components";
import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import getDateTimeString from "../../scripts/getDateTimeString";
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

const InputNumber = styled.input`
  border: none;
  border-bottom: 1px solid silver;
  width: 40px;
`;
export default function DueDate() {
  const taskDispatch = useTaskDispatch();
  const {
    startTime,
    event,
    reminder,
    reminder: { count },
  } = useTaskState();

  const setStartDate = (n: string) =>
    taskDispatch(
      addTask({
        startTime: n,
      })
    );

  const setCount = (count: number) =>
    taskDispatch(
      addTask({
        reminder: {
          ...reminder,
          count,
        },
      })
    );

  const setEvent = (n: "once" | "n-times" | "forever") => {
    taskDispatch(
      addTask({
        event: n,
      })
    );
  };

  return (
    <div>
      <Row>
        <input
          type="time"
          value={extractTime(startTime)}
          onChange={(e) => setStartDate(updateTime(startTime, e.target.value))}
        />
      </Row>
      <h4>Repeat</h4>
      <Row>
        <input
          id="never"
          type="radio"
          checked={event === "once"}
          onClick={() => setEvent("once")}
        />{" "}
        <label htmlFor="never">Once</label>
        <input
          id="n-times"
          type="radio"
          checked={event === "n-times"}
          onClick={() => setEvent("n-times")}
        />{" "}
        <label htmlFor="n-times">
          <InputNumber
            type="number"
            min={2}
            onFocus={() => setEvent("n-times")}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />{" "}
          time(s)
        </label>
        <input
          id="forever"
          type="radio"
          checked={event === "forever"}
          onClick={() => setEvent("forever")}
        />{" "}
        <label htmlFor="forever">Forever</label>
      </Row>
      {event === "once" && (
        <input
          type="date"
          value={extractDate(startTime)}
          onChange={(e) => setStartDate(updateDate(startTime, e.target.value))}
        />
      )}
      {event !== "once" && <Reminder />}
    </div>
  );
}
