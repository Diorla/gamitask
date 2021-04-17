import { useState } from "react";
import styled from "styled-components";
import { useTaskState, useTaskDispatch } from "../../../context/taskContext";
import { addTask } from "../../../context/taskContext/actions";
import addRemoveItemFromArray from "../../../scripts/addRemoveItemFromArray";

const daysCount = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const Input = styled.div`
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  & > input {
    border: none;
    border-bottom: 1px solid silver;
    padding: 4px;
  }
`;

const monthInYears = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const MonthButton = styled.button<{ active: boolean }>`
  background-color: ${({ active, theme }) =>
    active ? theme.palette.secondary.main : "silver"};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 2px;
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  outline: none;
`;

export default function Yearly() {
  const task = useTaskState();
  const {
    reminder,
    reminder: { months, dateInMonth },
  } = task;
  const taskDispatch = useTaskDispatch();
  const [dateSelector, setDateSelector] = useState(new Array(29).fill(""));

  const setYear = (months: number[]) => {
    let maxDate = 29;
    let currentDate = dateInMonth;
    months.forEach((item: number) => {
      if (daysCount[item] > maxDate) maxDate = daysCount[item];
    });
    if (maxDate < currentDate) {
      currentDate = maxDate;
    }
    setDateSelector(new Array(maxDate).fill(""));
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
    <div>
      <div>
        <label htmlFor="date">Date: </label>
        <select
          onChange={(e) => setMonth(Number(e.target.value))}
          value={dateInMonth}
          id="date"
        >
          {dateSelector.map((_item, idx) => (
            <option value={idx + 1}>{idx + 1}</option>
          ))}
        </select>
      </div>
      <Input>
        <div>
          {monthList.map((item, idx) => (
            <MonthButton
              key={idx}
              active={months.includes(item)}
              onClick={() => setYear(addRemoveItemFromArray(item, months))}
            >
              {monthInYears[item]}
            </MonthButton>
          ))}
        </div>
      </Input>
    </div>
  );
}
