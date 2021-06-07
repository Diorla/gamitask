import CollectionProps from "../../props/CollectionProps";
import removeEmptyStringFromArr from "../../utils/removeEmptyStringFromArr";
import trimSpace from "../../utils/trimSpace";
import { unlabelled } from "./index";

/**
 * It will return task with the labels as the keys
 * @param taskList the list of task to be sorted into different labels
 * @returns { label1: [...task]}
 */
export default function getLabelCollection(taskList: any[]): CollectionProps {
  const tempCollection: CollectionProps = {
    [unlabelled]: [],
  };
  taskList.map((item) => {
    if (item.labels) {
      for (const label of item.labels
        .split(",")
        .map(trimSpace)
        .filter(removeEmptyStringFromArr)) {
        const key = label.trim();
        if (tempCollection[key]) tempCollection[key].push(item);
        else tempCollection[key] = [item];
      }
    } else {
      tempCollection[unlabelled].push(item);
    }
  });
  return tempCollection;
}
