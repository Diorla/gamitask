import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import Switch from "../Switch";

export default function Timed() {
  const taskDispatch = useTaskDispatch();
  const task = useTaskState();
  const { timed } = task;

  const toggleTimed = () =>
    taskDispatch(
      addTask({
        ...task,
        timed: !timed,
      })
    );
  return (
    <Switch
      positive="Timed"
      negative=""
      isChecked={timed}
      onChange={() => toggleTimed()}
    />
  );
}
