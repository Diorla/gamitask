import React from "react";
import { useIntl } from "react-intl";
import PageLoader from "../../compounds/PageLoader";
import TaskCollection from "../../container/TaskCollection";
import { useTaskList } from "../../context/taskListContext";
import getProjectCollection from "./getProjectCollection";

export default function Projects(): JSX.Element {
  const { taskList, loadingTask } = useTaskList();
  const projectCollection = getProjectCollection(
    taskList.filter((item) => !item.archive)
  );

  const intl = useIntl();
  const noProject = intl.formatMessage({
    id: "noProject",
    defaultMessage: "noProject",
  });

  if (loadingTask) return <PageLoader />;
  return (
    <>
      {Object.keys(projectCollection)
        .sort((prev, next) => (prev > next ? 1 : -1))
        .map((item, idx) => {
          if (item !== "Unsorted")
            return (
              <TaskCollection
                key={idx}
                data={projectCollection[item]}
                title={item}
                type="others"
              />
            );
        })}
      <TaskCollection
        data={projectCollection["Unsorted"]}
        title={noProject}
        type="others"
      />
    </>
  );
}
