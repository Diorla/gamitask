import React from "react";
import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
} from "react-icons/fc";
import { FormattedMessage } from "react-intl";
import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import Row from "./Row";
import Select from "./Select";

export default function Difficulty() {
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
    <Row>
      <Select active={difficulty === 1} onClick={() => setDifficulty(1)}>
        <FcLowPriority />
        <FormattedMessage id="Easy" defaultMessage="Easy" />
      </Select>
      <Select active={difficulty === 2} onClick={() => setDifficulty(2)}>
        <FcMediumPriority />
        <FormattedMessage id="Medium" defaultMessage="Medium" />
      </Select>
      <Select active={difficulty === 3} onClick={() => setDifficulty(3)}>
        <FcHighPriority />
        <FormattedMessage id="Difficult" defaultMessage="Difficult" />
      </Select>
    </Row>
  );
}
