import TaskProps from "../../props/Task";

export enum TaskActionTypes {
  CREATE_TASK = "CREATE_TASK",
  REMOVE_TASK = "REMOVE_TASK",
}

export type TaskAction = {
  type: TaskActionTypes;
  payload?: TaskProps;
};

export const addTask = (task: TaskProps) => {
  return {
    type: TaskActionTypes.CREATE_TASK,
    payload: task,
  };
};

export const removeTask = (task: TaskProps) => {
  return {
    type: TaskActionTypes.REMOVE_TASK,
  };
};
