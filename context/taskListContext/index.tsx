import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-toastify";
import watchData from "../../scripts/watchData";
import TaskProps from "../../props/Task";
import { useUser } from "../userContext";

export const TaskListContext = createContext<TaskProps[]>([]);

export default function TaskListContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [taskList, setTaskList] = useState([] as TaskProps[]);
  const { user } = useUser();

  useEffect(() => {
    if (user && user.uid)
      watchData(`user/${user.uid}/tasks`, setTaskList).catch((err) =>
        toast.error(err)
      );
  }, [user]);

  return (
    <TaskListContext.Provider value={taskList}>
      {children}
    </TaskListContext.Provider>
  );
}

export const useTaskList = () => useContext(TaskListContext);
