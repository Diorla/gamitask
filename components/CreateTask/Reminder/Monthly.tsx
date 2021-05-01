import { useTaskDispatch, useTaskState } from "../../../context/taskContext";
import { addTask } from "../../../context/taskContext/actions";

const arr = new Array(31);
arr.fill("");
export default function Monthly() {
  const task = useTaskState();
  const {
    reminder,
    reminder: { dateInMonth },
  } = task;
  const taskDispatch = useTaskDispatch();

  const setMonth = (dateInMonth: number) => {
    taskDispatch(
      addTask({
        ...task,
        reminder: {
          ...reminder,
          dateInMonth,
        },
      })
    );
  };

  return (
    <div>
      <label htmlFor="date">Date: </label>
      <select
        onChange={(e) => setMonth(Number(e.target.value))}
        value={dateInMonth}
        id="date"
      >
        {arr.map((_item, idx) => (
          <option value={idx + 1}>{idx + 1}</option>
        ))}
      </select>
    </div>
  );
}
