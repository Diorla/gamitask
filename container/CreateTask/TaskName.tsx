import styled from "styled-components";
import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";

const InputDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  height: 40px;
  margin-bottom: 4px;
  & > input {
    flex: 1;
    border: none;
    border-bottom: 1px solid silver;
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
      <input value={task.name} onChange={(e) => setName(e.target.value)} />
    </InputDiv>
  );
}
