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

export default function Monthly() {
  const [month, setMonth] = useState({
    count: 2,
    time: "",
    startDate: new Date(),
    date: 1,
    nth: false,
  });
  const { count, time, date, nth } = month;

  return (
    <div>
      <Input>
        <label>Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setMonth({ ...month, time: e.target.value })}
        />
      </Input>
      <Input>
        <label>Date:</label>
        <input
          type="number"
          min={1}
          max={31}
          value={date}
          onChange={(e) => setMonth({ ...month, date: Number(e.target.value) })}
        />
      </Input>
      <div>
        <input
          type="radio"
          name="month-type"
          checked={!nth}
          onChange={() => setMonth({ ...month, nth: false })}
        />{" "}
        <label>Every month</label>
      </div>
      <div>
        <input
          type="radio"
          name="month-type"
          checked={nth}
          onChange={() => setMonth({ ...month, nth: true, count: 2 })}
        />{" "}
        <label>Every</label>{" "}
        <NumberInput
          type="number"
          min={2}
          disabled={!nth}
          value={count}
          onChange={(e) =>
            setMonth({ ...month, count: Number(e.target.value) })
          }
        />
        months
      </div>
    </div>
  );
}
