import React from "react";
import { FaFlag } from "react-icons/fa";
import styled from "styled-components";
import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import Row from "./Row";
import Select from "./Select";

const Flag = styled(FaFlag)<{ color: string }>`
  color: ${({ color }) => color};
`;

export default function Priority() {
  const taskDispatch = useTaskDispatch();
  const task = useTaskState();

  const setPriority = (n: 1 | 2 | 3 | 4 | 5) =>
    taskDispatch(
      addTask({
        ...task,
        priority: n,
      })
    );

  return (
    <Row>
      <Select active={task.priority === 1} onClick={() => setPriority(1)}>
        <Flag color="#00796b" /> Priority 1
      </Select>
      <Select active={task.priority === 2} onClick={() => setPriority(2)}>
        <Flag color="#689f38" /> Priority 2
      </Select>
      <Select active={task.priority === 3} onClick={() => setPriority(3)}>
        <Flag color="#ffeb3b" /> Priority 3
      </Select>
      <Select active={task.priority === 4} onClick={() => setPriority(4)}>
        <Flag color="#ff9800" /> Priority 4
      </Select>
      <Select active={task.priority === 5} onClick={() => setPriority(5)}>
        <Flag color="#e83c3d" /> Priority 5
      </Select>
    </Row>
  );
}
