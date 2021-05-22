import { useIntl } from "react-intl";
import styled from "styled-components";
import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";

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

export default function Name(): JSX.Element {
  const taskDispatch = useTaskDispatch();
  const task = useTaskState();

  const setName = (name: string) =>
    taskDispatch(
      addTask({
        ...task,
        name,
      })
    );
  const intl = useIntl();
  const placeholder = intl.formatMessage({
    id: "labelName",
    defaultMessage: "Name",
  });

  return (
    <InputDiv>
      <input
        placeholder={placeholder}
        value={task.name}
        onChange={(e) => setName(e.target.value)}
      />
    </InputDiv>
  );
}
