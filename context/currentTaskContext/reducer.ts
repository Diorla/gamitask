import initialState from "./initialState";
import TaskProps from "./CurrentTaskProps";
import { CurrentTaskAction, CurrentTaskActionTypes } from "./actions";

export const taskReducer = (state: TaskProps, action: CurrentTaskAction) => {
  switch (action.type) {
    case CurrentTaskActionTypes.START_TASK:
      return { ...state, ...action.payload, startTime: Date.now() };
    case CurrentTaskActionTypes.END_TASK:
      return initialState;
    default:
      return state;
  }
};
