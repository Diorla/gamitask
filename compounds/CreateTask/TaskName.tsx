import Input from "../../atoms/Input";
import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";

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

  return (
    <Input
      placeholder="name"
      value={task.name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
