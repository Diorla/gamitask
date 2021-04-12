import styled from "styled-components";
import { useTaskDispatch, useTaskState } from "../../../context/taskContext";
import { addTask } from "../../../context/taskContext/actions";

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

export default function Monthly() {
  const {
    reminder,
    reminder: { count, nth },
  } = useTaskState();
  const taskDispatch = useTaskDispatch();

  const setMonth = (value: { nth?: boolean; count?: number }) => {
    taskDispatch(
      addTask({
        reminder: {
          ...reminder,
          ...value,
        },
      })
    );
  };

  return (
    <div>
      <div>
        <input
          type="radio"
          name="month-type"
          checked={!nth}
          onChange={() => setMonth({ nth: false })}
        />{" "}
        <label>Every month</label>
      </div>
      <div>
        <input
          type="radio"
          name="month-type"
          checked={nth}
          onChange={() => setMonth({ nth: true })}
        />{" "}
        <label>Every</label>{" "}
        <NumberInput
          type="number"
          min={2}
          disabled={!nth}
          value={count}
          onChange={(e) => setMonth({ count: Number(e.target.value) })}
        />
        months
      </div>
    </div>
  );
}
