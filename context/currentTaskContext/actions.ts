import CurrentTaskProps from "./CurrentTaskProps";

export enum CurrentTaskActionTypes {
  START_TASK = "START_TASK",
  END_TASK = "END_TASK",
}

export type CurrentTaskAction = {
  type: CurrentTaskActionTypes;
  payload?: CurrentTaskProps;
};

export const startTask = (task: CurrentTaskProps) => {
  return {
    type: CurrentTaskActionTypes.START_TASK,
    payload: task,
  };
};

export const endTask = () => {
  return {
    type: CurrentTaskActionTypes.END_TASK,
  };
};
