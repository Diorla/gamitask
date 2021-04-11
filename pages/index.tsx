import React from "react";
import AppContainer from "../container/AppContainer";
import Layout from "../container/Layout";
import { useTaskList } from "../context/taskListContext";
import Task from "../context/taskContext/TaskProps";
import TaskCollection from "../container/TaskCollection";
import isToday from "dayjs/plugin/isToday";
import dayjs from "dayjs";
dayjs.extend(isToday);

/**
 * ?//TODO: Update filter
 * Create a more extensive filter that will consider repeat to determine if it's overdue
 */

/**
 * ?//TODO: Countdown
 * Whenever a countdown is created, there will be a firebase store with the following information
 * - task id
 * - start time
 * It will be at the user info currentTask = {taskId: id1234, startTime: new Date()}
 * So even if the user closes the tab an reopens, it will continue the countdown.
 * And whenever page reloads, it will check for any running task, calculate the time and
 * continue the countdown.
 * Of course, whenever the user stops the countdown, it will clear the task id and start time.
 * And it will record it.
 *
 */
const filterToday = (item: Task) =>
  item.dueDate && dayjs(item.dueDate).isToday() && !filterBeforeNow(item);

const filterBeforeNow = (item: Task) =>
  item.dueDate && dayjs(item.dueDate).isBefore(new Date());

const sortSoonToLater = (prev: Task, next: Task) =>
  new Date(prev.dueDate) > new Date(next.dueDate) ? 1 : -1;

export default function Home() {
  const taskList = useTaskList();
  const overdueTasks = taskList.filter(filterBeforeNow).sort(sortSoonToLater);
  const todayTasks = taskList.filter(filterToday).sort(sortSoonToLater);
  return (
    <Layout>
      <AppContainer active="today">
        <TaskCollection data={overdueTasks} title="Overdue" type="overdue" />
        <TaskCollection data={todayTasks} title="Today" type="today" />
      </AppContainer>
    </Layout>
  );
}
