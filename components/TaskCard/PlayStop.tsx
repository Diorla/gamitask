import React from "react";
import { MdPlayArrow, MdStop } from "react-icons/md";
import styled from "styled-components";

const Play = styled(MdPlayArrow)`
  margin-top: 0.2rem;
  margin-right: 1rem;
  border: 0.1rem solid black;
  border-radius: 50%;
  cursor: pointer;
  font-size: 2.1rem;
  transition: ${({ theme }) => theme.transform.duration.short} linear;
  &:hover {
    background: #dcdcdc;
  }
`;

const Stop = styled(MdStop)`
  border: 0.1rem solid white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 2.1rem;
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
