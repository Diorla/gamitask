import initialState from "./initialState";
import TaskProps from "./TaskProps";
import { TaskAction, TaskActionTypes } from "./actions";

export const taskReducer = (state: TaskProps, action: TaskAction) => {
  switch (action.type) {
    case TaskActionTypes.CREATE_TASK:
      return { ...state, ...action.payload };
    case TaskActionTypes.REMOVE_TASK:
      return initialState;
    default:
      return state;
  }
};
