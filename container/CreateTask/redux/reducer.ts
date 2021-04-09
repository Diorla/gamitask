import initialState from "../model/initialState";
import { Task } from "../model/Task";
import { TaskAction, TaskActionTypes } from "./actions";

export const taskReducer = (state: Task, action: TaskAction) => {
  switch (action.type) {
    case TaskActionTypes.CREATE_TASK:
      return { ...state, ...action.payload };
    case TaskActionTypes.REMOVE_TASK:
      return initialState;
    default:
      return state;
  }
};
