import React from "react";
import PageLoader from "../../compounds/PageLoader";
import TaskCollection from "../../container/TaskCollection";
import { useTaskList } from "../../context/taskListContext";
import taskBasedOnPriority from "./taskBasedOnPriority";

export default function Priority(): JSX.Element {
  const { taskList, loadingTask } = useTaskList();

  if (loadingTask) return <PageLoader />;
  return (
    <>
      <TaskCollection
        data={taskBasedOnPriority(taskList, 1)}
        title="Priority 1"
        type="others"
      />
      <TaskCollection
        data={taskBasedOnPriority(taskList, 2)}
        title="Priority 2"
        type="others"
      />
      <TaskCollection
        data={taskBasedOnPriority(taskList, 3)}
        title="Priority 3"
        type="others"
      />
      <TaskCollection
        data={taskBasedOnPriority(taskList, 4)}
        title="Priority 4"
        type="others"
      />
      <TaskCollection
        data={taskBasedOnPriority(taskList, 5)}
        title="Priority 5"
        type="others"
      />
    </>
  );
}
