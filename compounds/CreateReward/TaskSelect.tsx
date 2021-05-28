import { useIntl } from "react-intl";
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
}): JSX.Element {
  const { taskList } = useTaskList();
  const options = taskList
    .filter((item) => !item.archive)
    .map((item) => {
      const { name, id } = item;
      return { label: name, value: id };
    });
  const intl = useIntl();
  return (
    <Select
      components={animatedComponents}
      closeMenuOnSelect={false}
      value={value}
      onChange={(list) => onChangeTask(list)}
      isMulti
      options={options}
      placeholder={intl.formatMessage({
        id: "selectTask",
        defaultMessage: "Select one or more tasks",
      })}
    />
  );
}
