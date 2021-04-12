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
  const {
    reminder,
    reminder: { frequency, days, nth },
  } = useTaskState();
  const taskDispatch = useTaskDispatch();

  const setWeek = (value: {
    days?: string[];
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

  return (
    <div>
      <div>
        {listOfDays.map((item, idx) => (
          <DayButton
            key={idx}
            active={days.includes(item)}
            onClick={() =>
              setWeek({
                days: addRemoveItemFromArray(item, days),
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
          onChange={() => setWeek({ nth: false })}
        />{" "}
        <label>Every week</label>
      </div>
      <div>
        <input
          type="radio"
          name="week-type"
          checked={nth}
          onChange={() => setWeek({ nth: true })}
        />{" "}
        <label>Every</label>{" "}
        <NumberInput
          type="number"
          min={2}
          disabled={!nth}
          value={frequency}
          onChange={(e) => setWeek({ frequency: Number(e.target.value) })}
        />
        weeks
      </div>
    </div>
  );
}
