import { FaFlag } from "react-icons/fa";
import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
} from "react-icons/fc";
import styled from "styled-components";

export const colourScale = [
  "#00796b",
  "#689f38",
  "#ffeb3b",
  "#ff9800",
  "#e83c3d",
];

export const Flag = styled(FaFlag)<{ index: number }>`
  color: ${({ index }) => colourScale[index - 1]};
`;

export const Difficulty = ({
  index,
}: {
  index: number;
}): JSX.Element | null => {
  if (index === 1) return <FcLowPriority />;
  if (index === 2) return <FcMediumPriority />;
  if (index === 3) return <FcHighPriority />;
  return null;
};
