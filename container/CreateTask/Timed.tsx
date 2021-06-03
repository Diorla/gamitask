import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import Switch from "../../molecules/Switch";

export default function Timed(): JSX.Element {
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
      positive="timed"
      negative=""
      isChecked={timed}
      onChange={() => toggleTimed()}
    />
  );
}
