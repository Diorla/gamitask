import styled from "styled-components";
import { useTaskDispatch, useTaskState } from "../../../context/taskContext";
import { addTask } from "../../../context/taskContext/actions";
import Periods from "./Periods";

const Select = styled.div`
  margin-bottom: 4px;
  & > select {
    border: none;
    border-bottom: 1px solid silver;
    padding: 4px;
  }
`;

export default function Reminder() {
  const taskDispatch = useTaskDispatch();
  const { reminder } = useTaskState();

  const setReminder = (type: string) =>
    taskDispatch(
      addTask({
        reminder: {
          ...reminder,
          type,
        },
      })
    );
  const { type = "daily" } = reminder;
  return (
    <div>
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
