import React, { useState } from "react";
import { useTaskState, useTaskDispatch } from "../../../context/taskContext";
import { addTask } from "../../../context/taskContext/actions";
import addRemoveItemFromArray from "../../../scripts/addRemoveItemFromArray";
import CalendarButton from "../../../molecules/CalendarButton";
import Stack from "../../../atoms/Stack";
import NumberSelect from "../../../molecules/NumberSelect";

const daysCount = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const monthInYears = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

/**
 * This will set the month and date e.g. Feb 28th
 */
export default function Yearly(): JSX.Element {
  const task = useTaskState();
  const {
    reminder,
    reminder: { months = [], dateInMonth = 1 },
  } = task;
  const taskDispatch = useTaskDispatch();
  const [dateSelector, setDateSelector] = useState(daysCount[months[0]]);

  /**
   * Used to add or remove a month
   * @param months list of months selected
   */
  const setYear = (months: number[]) => {
    let maxDate = 29;
    let currentDate = dateInMonth;

    // Max date is based on the months, e.g. 31st of Feb shouldn't exist
    months.forEach((item: number) => {
      if (daysCount[item] > maxDate) maxDate = daysCount[item];
    });
    if (maxDate < currentDate) {
      currentDate = maxDate;
    }
    setDateSelector(maxDate);

    taskDispatch(
      addTask({
        ...task,
        reminder: {
          ...reminder,
          months,
          dateInMonth: currentDate,
        },
      })
    );
  };

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
    <Stack>
      <NumberSelect
        range={[1, dateSelector]}
        onChange={(e) => setMonth(Number(e.target.value))}
        value={dateInMonth}
        label="date"
        isLeft
      />
      <CalendarButton
        list={monthInYears}
        activeList={months}
        toggleDate={({ index }) =>
          setYear(addRemoveItemFromArray(index, months))
        }
      />
    </Stack>
  );
}
