import React from "react";
import Line from "../../atoms/Line";
import Stack from "../../atoms/Stack";
import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import DateTimeInput from "../../molecules/DateTimeInput";
import RadioInput from "../../molecules/RadioInput";
import Reminder from "./Reminder";

export default function DueDate(): JSX.Element {
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
    <Stack>
      <Line style={{ alignItems: "center", margin: "0.4rem" }}>
        <RadioInput
          checked={!repeat}
          onChange={() => setEvent(!repeat)}
          label="once"
        />
        <RadioInput
          label="repeat"
          checked={repeat}
          onChange={() => setEvent(!repeat)}
        />
      </Line>
      <DateTimeInput
        label="time"
        type="time"
        value={time}
        placeholder="time"
        onChange={(e) => setTime(e.target.value)}
      />
      {!repeat && (
        <DateTimeInput
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          label="date"
          placeholder="date"
        />
      )}

      {repeat && <Reminder />}
    </Stack>
  );
}
