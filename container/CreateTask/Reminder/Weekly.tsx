import React from "react";
import { useTaskDispatch, useTaskState } from "../../../context/taskContext";
import { addTask } from "../../../context/taskContext/actions";
import addRemoveItemFromArray from "../../../scripts/addRemoveItemFromArray";
import CalendarButton from "../../../molecules/CalendarButton";

const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export default function Weekly(): JSX.Element {
  const task = useTaskState();
  const {
    reminder,
    reminder: { days = [] },
  } = task;
  const taskDispatch = useTaskDispatch();

  const setWeek = (days: number[]) => {
    taskDispatch(
      addTask({
        ...task,
        reminder: {
          ...reminder,
          days,
        },
      })
    );
  };

  return (
    <CalendarButton
      list={weekdays}
      activeList={days}
      toggleDate={({ index }) => setWeek(addRemoveItemFromArray(index, days))}
    />
  );
}
