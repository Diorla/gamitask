import { useIntl } from "react-intl";
import Select from "react-select";
import { useTaskList } from "../../context/taskListContext";
import animatedComponents from "./animatedComponents";

export default function TaskSelect({
  value,
  onChangeTask,
}: {
  value: any[];
  onChangeTask: (args: any[]) => void;
}): JSX.Element {
  const { taskList } = useTaskList();
  const options = taskList
    .filter((item) => !item.archive)
    .map((item) => {
      const { name: label, id: value } = item;
      return { label, value };
    });
  const intl = useIntl();
  return (
    <Select
      components={animatedComponents}
      closeMenuOnSelect={false}
      value={value.map((item) => {
        const { taskId: value, taskName: label } = item;
        return { value, label };
      })}
      onChange={(list) => {
        Array.isArray(list) && onChangeTask(list);
      }}
      isMulti
      options={options}
      placeholder={intl.formatMessage({
        id: "selectTask",
        defaultMessage: "selectTask",
      })}
    />
  );
}
