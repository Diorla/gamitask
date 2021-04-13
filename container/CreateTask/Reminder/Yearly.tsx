import styled from "styled-components";
import { useTaskState, useTaskDispatch } from "../../../context/taskContext";
import { addTask } from "../../../context/taskContext/actions";
import addRemoveItemFromArray from "../../../scripts/addRemoveItemFromArray";
import { extractDate, updateDate } from "../timeFn";

// TODO: Add date selection
const days = {
  JAN: 31,
  FEB: 29,
  MAR: 31,
  APR: 30,
  MAY: 31,
  JUN: 30,
  JUL: 31,
  AUG: 31,
  SEP: 30,
  OCT: 31,
  NOV: 30,
  DEC: 31,
};

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

const NumberInput = styled.input`
  width: 50px;
  border: none;
  border-bottom: 1px solid silver;
  text-align: center;
  padding-left: 8px;
  &:invalid {
    border: 1px solid red;
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
  const {
    startTime,
    reminder,
    reminder: { frequency, months, nth },
  } = useTaskState();
  const taskDispatch = useTaskDispatch();

  const setYear = (value: {
    months?: number[];
    nth?: boolean;
    frequency?: number;
  }) => {
    taskDispatch(
      addTask({
        reminder: {
          ...reminder,
          ...value,
        },
      })
    );
  };

  const setStartDate = (n: string) =>
    taskDispatch(
      addTask({
        startTime: n,
      })
    );

  return (
    <div>
      <input
        type="date"
        value={extractDate(startTime)}
        onChange={(e) => setStartDate(updateDate(startTime, e.target.value))}
      />
      <Input>
        <div>
          {monthList.map((item, idx) => (
            <MonthButton
              key={idx}
              active={months.includes(item)}
              onClick={() =>
                setYear({
                  months: addRemoveItemFromArray(item, months),
                })
              }
            >
              {monthInYears[item]}
            </MonthButton>
          ))}
        </div>
      </Input>
      <div>
        <input
          type="radio"
          name="year-type"
          checked={!nth}
          onChange={() => setYear({ nth: false })}
        />{" "}
        <label>Every year</label>
      </div>
      <div>
        <input
          type="radio"
          name="year-type"
          checked={nth}
          onChange={() => setYear({ nth: true })}
        />{" "}
        <label>Every</label>{" "}
        <NumberInput
          type="number"
          min={2}
          disabled={!nth}
          value={frequency}
          onChange={(e) => setYear({ frequency: Number(e.target.value) })}
        />
        years
      </div>
    </div>
  );
}
