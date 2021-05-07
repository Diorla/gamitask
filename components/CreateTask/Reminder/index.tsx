import styled from "styled-components";
import { useTaskDispatch, useTaskState } from "../../../context/taskContext";
import { addTask } from "../../../context/taskContext/actions";
import Periods from "./Periods";

const Select = styled.div`
  margin-bottom: 0.4rem;
  & > select {
    border: none;
    border-bottom: 0.1rem solid silver;
    padding: 0.4rem;
  }
  & > * {
    margin-top: 0.8rem;
  }
`;

export default function Reminder() {
  const taskDispatch = useTaskDispatch();
  const task = useTaskState();
  const { reminder } = task;
  const setReminder = (type: string) =>
    taskDispatch(
      addTask({
        ...task,
        reminder: {
          ...reminder,
          type,
        },
      })
    );
  const { type = "daily" } = reminder;
  return (
    <div>
      <hr />
      <Select>
        <label htmlFor="period">Select group:</label>
        <select
          name="period"
          id="period"
          value={type}
          onChange={(e) => setReminder(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </Select>
      <Periods period={type} />
    </div>
  );
}
