import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { useTaskState, useTaskDispatch } from "../../../context/taskContext";
import { addTask } from "../../../context/taskContext/actions";
import addRemoveItemFromArray from "../../../scripts/addRemoveItemFromArray";
import CalendarButton from "../../CalendarButton";

const daysCount = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const Input = styled.div`
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  & > input {
    border: none;
    border-bottom: 0.1rem solid silver;
    padding: 0.4rem;
  }
`;

const monthInYears = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function Yearly() {
  const task = useTaskState();
  const {
    reminder,
    reminder: { months = [], dateInMonth = 1 },
  } = task;
  const taskDispatch = useTaskDispatch();
  const [dateSelector, setDateSelector] = useState(
    new Array(daysCount[months[0]]).fill("")
  );

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
            <option value={idx + 1} key={idx}>
              {idx + 1}
            </option>
          ))}
        </select>
      </div>
      <Input>
        <div>
          {monthList.map((item, idx) => (
            <CalendarButton
              key={idx}
              active={months.includes(item)}
              onClick={() => setYear(addRemoveItemFromArray(item, months))}
            >
              <FormattedMessage
                id={monthInYears[item]}
                defaultMessage={monthInYears[item]}
              />
            </CalendarButton>
          ))}
        </div>
      </Input>
    </div>
  );
}
