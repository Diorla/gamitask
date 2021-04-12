import React, { useReducer } from "react";
import initialState from "./initialState";
import CurrentTaskProps from "./CurrentTaskProps";
import { CurrentTaskAction } from "./actions";
import { taskReducer } from "./reducer";

export const CurrentTaskState = React.createContext<
  CurrentTaskProps | undefined
>(undefined);

export const CurrentTaskDispatch = React.createContext<
  React.Dispatch<CurrentTaskAction> | undefined
>(undefined);

export const CurrentTaskProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  return (
    <CurrentTaskState.Provider value={state}>
      <CurrentTaskDispatch.Provider value={dispatch}>
        {children}
      </CurrentTaskDispatch.Provider>
    </CurrentTaskState.Provider>
  );
};

export const useCurrentTaskState = (): CurrentTaskProps => {
  const context = React.useContext(CurrentTaskState);
  if (undefined === context) {
    throw new Error("Please use within CurrentTaskListStateProvider");
  }
  return context;
};

export const useCurrentTaskDispatch = (): React.Dispatch<CurrentTaskAction> => {
  const context = React.useContext(CurrentTaskDispatch);
  if (undefined === context) {
    throw new Error("Please use within CurrentTaskListDispatchProvider");
  }
  return context;
};
