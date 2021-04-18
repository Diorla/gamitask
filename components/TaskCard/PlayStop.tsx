import React from "react";
import { MdPlayArrow, MdStop } from "react-icons/md";
import styled from "styled-components";

const Play = styled(MdPlayArrow)`
  border: 1px solid black;
  border-radius: 50%;
  margin: 4px;
  cursor: pointer;
  transition: ${({ theme }) => theme.transform.duration.short} linear;
  &:hover {
    background: #dcdcdc;
  }
`;

const Stop = styled(MdStop)`
  border: 1px solid white;
  border-radius: 50%;
  margin: 4px;
  cursor: pointer;
  transition: ${({ theme }) => theme.transform.duration.short} linear;
  &:hover {
    color: #dcdcdc;
  }
`;

export default function PlayPause({
  running,
  toggleRunning,
}: {
  running: boolean;
  toggleRunning: () => void;
}) {
  return running ? (
    <Stop onClick={toggleRunning} className="exclude" />
  ) : (
    <Play onClick={toggleRunning} className="exclude" />
  );
}
