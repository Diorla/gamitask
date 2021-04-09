import { Task } from "../model/Task";

export enum TaskActionTypes {
  CREATE_TASK = "CREATE_TASK",
  UPDATE_TASK = "UPDATE_TASK",
  REMOVE_TASK = "REMOVE_TASK",
}

export type TaskAction = {
  type: TaskActionTypes;
  payload?: Task;
};

/**
 * Create more actions to be more specific, like setDifficulty, setLabel, setReminder etc
 * Hence, I could update the model/Task to match each action
 */
export const addTask = (task: Task) => {
  return {
    type: TaskActionTypes.CREATE_TASK,
    payload: task,
  };
};

export const removeTask = (task: Task) => {
  return {
    type: TaskActionTypes.REMOVE_TASK
  };
};
