import React from "react";
import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
} from "react-icons/fc";
import styled from "styled-components";

const Span = styled.span`
  cursor: pointer;
`;

export const DifficultyIcon = ({
  difficulty,
  onClick,
  style,
}: {
  style?: React.CSSProperties;
  difficulty: number;
  onClick: () => void;
}): JSX.Element => (
  <Span onClick={onClick} style={style}>
    {difficulty === 1 && <FcLowPriority style={{ fontSize: "2.1rem" }} />}
    {difficulty === 2 && <FcMediumPriority style={{ fontSize: "2.1rem" }} />}
    {difficulty === 3 && <FcHighPriority style={{ fontSize: "2.1rem" }} />}
  </Span>
);
