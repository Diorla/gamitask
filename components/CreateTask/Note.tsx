import { useIntl } from "react-intl";
import styled from "styled-components";
import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";

const InputWrapper = styled.div`
  display: flex;
  & > textarea {
    resize: vertical;
    border: 1px solid silver;
    min-height: 5rem;
    margin: auto;
    flex: 1;
  }
`;

export default function Note() {
  const taskDispatch = useTaskDispatch();
  const task = useTaskState();
  const { note } = task;
  const setNote = (note: string) =>
    taskDispatch(
      addTask({
        ...task,
        note,
      })
    );

  const intl = useIntl();
  return (
    <InputWrapper>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder={intl.formatMessage({
          id: "notesPlaceholder",
          defaultMessage: "Notes...",
        })}
      />
    </InputWrapper>
  );
}
