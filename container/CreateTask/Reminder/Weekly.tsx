import styled from "styled-components";
import { useTaskDispatch, useTaskState } from "../../../context/taskContext";
import { addTask } from "../../../context/taskContext/actions";
import addRemoveItemFromArray from "../../../scripts/addRemoveItemFromArray";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const listOfDays = [0, 1, 2, 3, 4, 5, 6];

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
    reminder: { days },
  } = useTaskState();
  const taskDispatch = useTaskDispatch();

  const setWeek = (value: { days?: number[] }) => {
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
          {weekdays[item]}
        </DayButton>
      ))}
    </div>
  );
}
