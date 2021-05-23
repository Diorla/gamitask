import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-toastify";
import TaskProps from "../../props/Task";
import { useUser } from "../userContext";
import getTaskList from "../../services/getTaskList";

export const TaskListContext = createContext<{
  taskList: TaskProps[];
  loadingTask: boolean;
}>({ taskList: [], loadingTask: true });

export default function TaskListContextWrapper({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [taskList, setTaskList] = useState([] as TaskProps[]);
  const [loadingTask, setLoadingTask] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user && user.uid)
      getTaskList(user.uid, setTaskList)
        .then(() => setLoadingTask(false))
        .catch((err) => toast.error(err));
  }, [user]);

  return (
    <TaskListContext.Provider value={{ taskList, loadingTask }}>
      {children}
    </TaskListContext.Provider>
  );
}

export const useTaskList = (): {
  taskList: TaskProps[];
  loadingTask: boolean;
} => useContext(TaskListContext);
