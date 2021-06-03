import React from "react";
import Stack from "../../../atoms/Stack";
import { useTaskDispatch, useTaskState } from "../../../context/taskContext";
import { addTask } from "../../../context/taskContext/actions";
import FormSelect from "../../../molecules/FormSelect";
import Periods from "./Periods";

const reminderList = ["daily", "weekly", "monthly", "yearly"];
export default function Reminder(): JSX.Element {
  const taskDispatch = useTaskDispatch();
  const task = useTaskState();
  const { reminder } = task;
  const setReminder = (type: string) =>
    taskDispatch(
      addTask({
        ...task,
        reminder: {
          ...reminder,
          type,
        },
      })
    );

  const { type = "daily" } = reminder;
  return (
    <Stack>
      <FormSelect
        label="selectPeriod"
        value={type}
        onChange={(e) => setReminder(e.target.value)}
        list={reminderList.map((item) => {
          return { value: item, label: item };
        })}
      />
      <Periods period={type} />
    </Stack>
  );
}
