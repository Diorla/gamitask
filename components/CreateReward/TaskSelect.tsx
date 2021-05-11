import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useTaskList } from "../../context/taskListContext";

const animatedComponents = makeAnimated();

export default function TaskSelect({
  value,
  onChangeTask,
}: {
  value: any[];
  onChangeTask: (args: any[]) => void;
}) {
  const task = useTaskList();
  const options = task
    .filter((item) => !item.archive)
    .map((item) => {
      const { name, id } = item;
      return { label: name, value: id };
    });
  return (
    <div>
      <Select
        components={animatedComponents}
        closeMenuOnSelect={false}
        value={value}
        onChange={(list) => onChangeTask(list)}
        isMulti
        options={options}
      />
    </div>
  );
}
