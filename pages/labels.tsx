import React from "react";
import AppContainer from "../container/AppContainer";
import Layout from "../container/Layout";
import TaskCollection from "../container/TaskCollection";
import { useTaskList } from "../context/taskListContext";
import Task from "../props/Task";
import toTitleCase from "../scripts/toTitleCase";

// in case someone created "unlabelled" label
const unlabelled = "egj9b39bn2217352b06a6178c0e95f431f30ej5ra";

const trim = (str: string) => str.trim();

const removeEmpty = (str: string) => !!str;

export interface CollectionProps {
  [key: string]: Task[];
}
const getLabelCollection = (taskList: any[]) => {
  const tempCollection: CollectionProps = {
    [unlabelled]: [],
  };
  taskList.map((item) => {
    if (item.labels) {
      for (let label of item.labels.split(",").map(trim).filter(removeEmpty)) {
        const key = label.trim();
        if (tempCollection[key]) tempCollection[key].push(item);
        else tempCollection[key] = [item];
      }
    } else {
      tempCollection[unlabelled].push(item);
    }
  });
  return tempCollection;
};

export default function Labels() {
  const taskList = useTaskList();
  const labelCollection = getLabelCollection(taskList);

  return (
    <Layout>
      <AppContainer active="labels">
        {Object.keys(labelCollection).map((item, idx) => {
          if (item !== unlabelled)
            return (
              <TaskCollection
                key={idx}
                data={labelCollection[item]}
                title={toTitleCase(item)}
                type="upcoming"
              />
            );
        })}
        <TaskCollection
          data={labelCollection[unlabelled]}
          title="Unlabelled"
          type="upcoming"
        />
      </AppContainer>
    </Layout>
  );
}
