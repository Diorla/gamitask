import React from "react";
import { useIntl } from "react-intl";
import PageLoader from "../compounds/PageLoader";
import Layout from "../container/Layout";
import TaskCollection from "../container/TaskCollection";
import { useTaskList } from "../context/taskListContext";
import Task from "../props/Task";

export interface CollectionProps {
  [key: string]: Task[];
}

const getLabelCollection = (taskList: any[]) => {
  const tempCollection: CollectionProps = {};
  taskList.map((item) => {
    const projectName = item.project;
    if (tempCollection[projectName]) tempCollection[projectName].push(item);
    else tempCollection[projectName] = [item];
  });
  return tempCollection;
};

export default function Projects(): JSX.Element {
  const { taskList, loadingTask } = useTaskList();
  const projectCollection = getLabelCollection(
    taskList.filter((item) => !item.archive)
  );

  const intl = useIntl();
  const noProject = intl.formatMessage({
    id: "noProject",
    defaultMessage: "Miscellaneous",
  });

  if (loadingTask) return <div>Loading tasks</div>;
  return (
    <Layout activePath="projects">
      {loadingTask ? (
        <PageLoader />
      ) : (
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
      )}
    </Layout>
  );
}
