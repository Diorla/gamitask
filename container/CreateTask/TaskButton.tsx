import React from "react";
import { useUser } from "../../context/userContext";
import { useTaskState, useTaskDispatch } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import initialState from "../../context/taskContext/initialState";
import Line from "../../atoms/Line";
import Button from "../../atoms/Button";
import uploadTask from "./uploadTask";

export default function TaskButton(): JSX.Element | null {
  const data = useTaskState();
  const { loadingUser, user } = useUser();
  const { labels: userLabels } = user;
  const { labels: taskLabels } = data;
  const taskDispatch = useTaskDispatch();

  const closeTask = () =>
    taskDispatch(
      addTask({
        ...initialState,
      })
    );
  if (loadingUser) return null;
  return (
    <Line style={{ justifyContent: "flex-end" }}>
      <Button
        onClick={() =>
          uploadTask(data, taskLabels, user, userLabels, taskDispatch)
        }
        variant="success"
        style={{ marginRight: "0.4rem" }}
      >
        save
      </Button>
      <Button onClick={closeTask} variant="error">
        close
      </Button>
    </Line>
  );
}
