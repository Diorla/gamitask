import React from "react";
import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
} from "react-icons/fc";

export const DifficultyIcon = ({
  difficulty,
  onClick,
}: {
  difficulty: number;
  onClick: () => void;
}): JSX.Element => (
  <span onClick={onClick} style={{ cursor: "pointer" }}>
    {difficulty === 1 && <FcLowPriority style={{ fontSize: "2.1rem" }} />}
    {difficulty === 2 && <FcMediumPriority style={{ fontSize: "2.1rem" }} />}
    {difficulty === 3 && <FcHighPriority style={{ fontSize: "2.1rem" }} />}
  </span>
);
