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
  width: 4rem;
  height: 4rem;
  margin: 0.2rem;
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  outline: none;
`;

export default function Weekly() {
  const task = useTaskState();
  const {
    reminder,
    reminder: { days = [] },
  } = task;
  const taskDispatch = useTaskDispatch();

  const setWeek = (days: number[]) => {
    taskDispatch(
      addTask({
        ...task,
        reminder: {
          ...reminder,
          days,
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
          onClick={() => setWeek(addRemoveItemFromArray(item, days))}
        >
          {weekdays[item]}
        </DayButton>
      ))}
    </div>
  );
}
