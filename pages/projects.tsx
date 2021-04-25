import React from "react";
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

export default function Projects() {
  const taskList = useTaskList();
  const projectCollection = getLabelCollection(
    taskList.filter((item) => !item.archive)
  );

  return (
    <Layout activePath="projects">
      {Object.keys(projectCollection)
        .sort((prev, next) => (prev > next ? 1 : -1))
        .map((item, idx) => {
          if (item !== "Unsorted")
            return (
              <TaskCollection
                key={idx}
                data={projectCollection[item]}
                title={item}
                type="upcoming"
              />
            );
        })}
      <TaskCollection
        data={projectCollection["Unsorted"]}
        title="Unsorted"
        type="upcoming"
      />
    </Layout>
  );
}
