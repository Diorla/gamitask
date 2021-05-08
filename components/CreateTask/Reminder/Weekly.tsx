import React from "react";
import { FormattedMessage } from "react-intl";
import { useTaskDispatch, useTaskState } from "../../../context/taskContext";
import { addTask } from "../../../context/taskContext/actions";
import addRemoveItemFromArray from "../../../scripts/addRemoveItemFromArray";
import CalendarButton from "../../CalendarButton";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const listOfDays = [0, 1, 2, 3, 4, 5, 6];

export default function Weekly() {
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
    <div>
      {listOfDays.map((item, idx) => (
        <CalendarButton
          key={idx}
          active={days.includes(item)}
          onClick={() => setWeek(addRemoveItemFromArray(item, days))}
        >
          <FormattedMessage
            id={weekdays[item]}
            defaultMessage={weekdays[item]}
          />
        </CalendarButton>
      ))}
    </div>
  );
}
