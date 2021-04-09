import { useState } from "react";
import styled from "styled-components";

const Input = styled.div`
  margin-bottom: 4px;
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

function addRemoveItemFromArray<type>(item: type, arr: type[]) {
  if (arr.includes(item)) {
    const idx = arr.indexOf(item);
    return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
  }
  return [...arr, item];
}

const listOfDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const DayButton = styled.button<{ active: boolean }>`
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

export default function Weekly() {
  const [week, setWeek] = useState({
    nth: false,
    time: "",
    count: 2,
    weekdays: [],
    startDate: new Date(), // use it calculate next reminder
  });
  const { count, weekdays, time, nth } = week;

  return (
    <div>
      <Input>
        <label>Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setWeek({ ...week, time: e.target.value })}
        />
      </Input>
      <div>
        {listOfDays.map((item, idx) => (
          <DayButton
            key={idx}
            active={weekdays.includes(item)}
            onClick={() =>
              setWeek({
                ...week,
                weekdays: addRemoveItemFromArray(item, weekdays),
              })
            }
          >
            {item}
          </DayButton>
        ))}
      </div>
      <div>
        <input
          type="radio"
          name="week-type"
          checked={!nth}
          onChange={() => setWeek({ ...week, nth: false })}
        />{" "}
        <label>Every week</label>
      </div>
      <div>
        <input
          type="radio"
          name="week-type"
          checked={nth}
          onChange={() => setWeek({ ...week, nth: true, count: 2 })}
        />{" "}
        <label>Every</label>{" "}
        <NumberInput
          type="number"
          min={2}
          disabled={!nth}
          value={count}
          onChange={(e) => setWeek({ ...week, count: Number(e.target.value) })}
        />
        weeks
      </div>
    </div>
  );
}
