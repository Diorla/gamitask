import TaskProps from "../../props/Task";

export enum TaskActionTypes {
  CREATE_TASK = "CREATE_TASK",
  REMOVE_TASK = "REMOVE_TASK",
}

export type TaskAction = {
  type: TaskActionTypes;
  payload?: TaskProps;
};

export function addTask(
  task: TaskProps
): { type: TaskActionTypes; payload: TaskProps } {
  return {
    type: TaskActionTypes.CREATE_TASK,
    payload: task,
  };
}

export function removeTask(): { type: TaskActionTypes } {
  return {
    type: TaskActionTypes.REMOVE_TASK,
  };
}
