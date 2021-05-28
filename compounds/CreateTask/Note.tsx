import TextArea from "../../atoms/TextArea";
import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";

export default function Note(): JSX.Element {
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

  return (
    <TextArea
      value={note}
      onChange={(e) => setNote(e.target.value)}
      placeholder="notes"
    />
  );
}
