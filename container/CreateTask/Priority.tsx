import React from "react";
import { FaFlag } from "react-icons/fa";
import styled from "styled-components";
import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import Row from "./Row";
import Select from "./Select";

const Flag = styled(FaFlag)<{ color: string }>`
  color: ${({ theme, color }) => theme.palette[color].main};
`;

export default function Priority() {
  const taskDispatch = useTaskDispatch();
  const { priority } = useTaskState();

  const setPriority = (n: 1 | 2 | 3 | 4 | 5) =>
    taskDispatch(
      addTask({
        priority: n,
      })
    );

  return (
    <Row>
      <Select active={priority === 1} onClick={() => setPriority(1)}>
        <Flag color="success" /> Priority 1
      </Select>
      <Select active={priority === 2} onClick={() => setPriority(2)}>
        <Flag color="info" /> Priority 2
      </Select>
      <Select active={priority === 3} onClick={() => setPriority(3)}>
        <Flag color="primary" /> Priority 3
      </Select>
      <Select active={priority === 4} onClick={() => setPriority(4)}>
        <Flag color="warning" /> Priority 4
      </Select>
      <Select active={priority === 5} onClick={() => setPriority(5)}>
        <Flag color="error" /> Priority 5
      </Select>
    </Row>
  );
}
