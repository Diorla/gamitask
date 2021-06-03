import CollectionProps from "../../props/CollectionProps";

export default function getProjectCollection(taskList: any[]): CollectionProps {
  const tempCollection: CollectionProps = {};
  taskList.map((item) => {
    const projectName = item.project;
    if (tempCollection[projectName]) tempCollection[projectName].push(item);
    else tempCollection[projectName] = [item];
  });
  return tempCollection;
}
