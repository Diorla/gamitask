import React from "react";
import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
} from "react-icons/fc";
import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import Line from "../../atoms/Line";
import Button from "../../atoms/Button";

export default function Difficulty(): JSX.Element {
  const taskDispatch = useTaskDispatch();
  const task = useTaskState();
  const { difficulty } = task;
  const setDifficulty = (n: 1 | 2 | 3) =>
    taskDispatch(
      addTask({
        ...task,
        difficulty: n,
      })
    );

  return (
    <Line style={{ justifyContent: "space-evenly" }}>
      <Button
        onClick={() => setDifficulty(1)}
        variant={difficulty === 1 ? "secondary" : undefined}
        iconLeft={<FcLowPriority />}
      >
        easy
      </Button>
      <Button
        onClick={() => setDifficulty(2)}
        variant={difficulty === 2 ? "secondary" : undefined}
        iconLeft={<FcMediumPriority />}
      >
        medium
      </Button>
      <Button
        onClick={() => setDifficulty(3)}
        variant={difficulty === 3 ? "secondary" : undefined}
        iconLeft={<FcHighPriority />}
      >
        difficult
      </Button>
    </Line>
  );
}
