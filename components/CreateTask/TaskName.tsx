import styled from "styled-components";
import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import formatText from "../../scripts/formatText";

const InputDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  margin-bottom: 0.4rem;
  & > input {
    flex: 1;
    border: none;
    border-bottom: 0.1rem solid silver;
    outline: none;
  }
`;

export default function Name() {
  const taskDispatch = useTaskDispatch();
  const task = useTaskState();

  const setName = (name: string) =>
    taskDispatch(
      addTask({
        ...task,
        name,
      })
    );
  return (
    <InputDiv>
      <input
        value={task.name}
        onChange={(e) => setName(formatText(e.target.value, "title"))}
      />
    </InputDiv>
  );
}
