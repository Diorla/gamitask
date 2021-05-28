import React from "react";
import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import Line from "../../atoms/Line";
import Button from "../../atoms/Button";
import Flag from "../../atoms/Flag";

export default function Priority(): JSX.Element {
  const taskDispatch = useTaskDispatch();
  const task = useTaskState();

  const { priority } = task;
  const setPriority = (n: 1 | 2 | 3 | 4 | 5) =>
    taskDispatch(
      addTask({
        ...task,
        priority: n,
      })
    );

  return (
    <Line style={{ flexWrap: "wrap" }}>
      <Button
        onClick={() => setPriority(1)}
        variant={priority === 1 ? "info" : undefined}
        iconLeft={<Flag color="#00796b" />}
        extra=" 1"
        style={{ margin: "0.1rem" }}
      >
        priority
      </Button>
      <Button
        onClick={() => setPriority(2)}
        variant={priority === 2 ? "info" : undefined}
        iconLeft={<Flag color="#689f38" />}
        extra=" 2"
        style={{ margin: "0.1rem" }}
      >
        priority
      </Button>
      <Button
        onClick={() => setPriority(3)}
        variant={priority === 3 ? "info" : undefined}
        iconLeft={<Flag color="#ffeb3b" />}
        extra=" 3"
        style={{ margin: "0.1rem" }}
      >
        priority
      </Button>
      <Button
        onClick={() => setPriority(4)}
        variant={priority === 4 ? "info" : undefined}
        iconLeft={<Flag color="#ff9800" />}
        extra=" 4"
        style={{ margin: "0.1rem" }}
      >
        priority
      </Button>
      <Button
        onClick={() => setPriority(5)}
        variant={priority === 5 ? "info" : undefined}
        iconLeft={<Flag color="#e83c3d" />}
        extra=" 5"
        style={{ margin: "0.1rem" }}
      >
        priority
      </Button>
    </Line>
  );
}
