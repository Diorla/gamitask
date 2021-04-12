import styled from "styled-components";
import { useTaskDispatch, useTaskState } from "../../../context/taskContext";
import { addTask } from "../../../context/taskContext/actions";

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

const setError = (num: number, min: number, max: number) => {
  if (num < min) return `Value must be greater or equal to ${min}`;
  if (num > max) return `Value must be less or equal to ${max}`;
  return "";
};

const putNumberInRange = (num: number, min: number, max: number) => {
  if (num < min) return min;
  if (num > max) return max;
  return num;
};

export default function Daily() {
  const taskDispatch = useTaskDispatch();
  const { reminder } = useTaskState();

  const setReminder = (val) =>
    taskDispatch(
      addTask({
        reminder: {
          ...reminder,
          ...val,
        },
      })
    );

  const { count, nth } = reminder;
  const errorLog = setError(count, 2, 6);

  return (
    <div>
      <div>
        <input
          type="radio"
          name="day-type"
          checked={!nth}
          onChange={() => setReminder({ nth: false })}
        />{" "}
        <label>Every day</label>
      </div>
      <div>
        <input
          type="radio"
          name="day-type"
          checked={nth}
          onChange={() => setReminder({ nth: true })}
        />{" "}
        <label>Every</label>{" "}
        <NumberInput
          type="number"
          min={2}
          max={6}
          disabled={!nth}
          value={count}
          onChange={(e) =>
            setReminder({
              count: putNumberInRange(Number(e.target.value), 2, 6),
            })
          }
        />
        days <span style={{ color: "red" }}>{nth && errorLog}</span>
      </div>
    </div>
  );
}
