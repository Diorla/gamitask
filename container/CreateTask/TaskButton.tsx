import React from "react";
import styled from "styled-components";
import { useTaskState } from "./context/Task";

export const Button = styled.button`
  font-size: 16px;
  font-family: monospace;
  border: none;
  background: purple;
  color: white;
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
  }
`;

export default function Name() {
  const data = useTaskState();
  const { name } = data;
  console.log({ ...data });
  // validate here before submitting.

  return <Button disabled={!name}>Save</Button>;
}
