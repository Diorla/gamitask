import React, { useReducer } from "react";
import initialState from "./initialState";
import TaskProps from "./TaskProps";
import { TaskAction } from "./actions";
import { taskReducer } from "./reducer";

export const TaskState = React.createContext<TaskProps | undefined>(undefined);

export const TaskDispatch = React.createContext<
  React.Dispatch<TaskAction> | undefined
>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  return (
    <TaskState.Provider value={state}>
      <TaskDispatch.Provider value={dispatch}>{children}</TaskDispatch.Provider>
    </TaskState.Provider>
  );
};

export const useTaskState = (): TaskProps => {
  const context = React.useContext(TaskState);
  if (undefined === context) {
    throw new Error("Please use within TaskListStateProvider");
  }
  return context;
};

export const useTaskDispatch = (): React.Dispatch<TaskAction> => {
  const context = React.useContext(TaskDispatch);
  if (undefined === context) {
    throw new Error("Please use within TaskListDispatchProvider");
  }
  return context;
};
