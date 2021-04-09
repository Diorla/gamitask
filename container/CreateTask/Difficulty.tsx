import React from "react";
import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
} from "react-icons/fc";
import { useTaskDispatch, useTaskState } from "./context/Task";
import { addTask } from "./redux/actions";
import Row from "./Row";
import Select from "./Select";

export default function Difficulty() {
  const taskDispatch = useTaskDispatch();
  const { difficulty } = useTaskState();

  const setDifficulty = (n: 1 | 2 | 3) =>
    taskDispatch(
      addTask({
        difficulty: n,
      })
    );
    
  return (
    <Row>
      <Select active={difficulty === 1} onClick={() => setDifficulty(1)}>
        <FcLowPriority /> Easy
      </Select>
      <Select active={difficulty === 2} onClick={() => setDifficulty(2)}>
        <FcMediumPriority /> Medium
      </Select>
      <Select active={difficulty === 3} onClick={() => setDifficulty(3)}>
        <FcHighPriority /> Difficult
      </Select>
    </Row>
  );
}
