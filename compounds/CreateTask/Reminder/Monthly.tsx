import React from "react";
import { useTaskDispatch, useTaskState } from "../../../context/taskContext";
import { addTask } from "../../../context/taskContext/actions";
import NumberSelect from "../../../molecules/NumberSelect";

export default function Monthly(): JSX.Element {
  const task = useTaskState();
  const {
    reminder,
    reminder: { dateInMonth = 1 },
  } = task;
  const taskDispatch = useTaskDispatch();

  const setMonth = (dateInMonth: number) => {
    taskDispatch(
      addTask({
        ...task,
        reminder: {
          ...reminder,
          dateInMonth,
        },
      })
    );
  };

  return (
    <NumberSelect
      label="date"
      isLeft
      range={[1, 31]}
      onChange={(e) => setMonth(Number(e.target.value))}
      value={dateInMonth}
    />
  );
}
