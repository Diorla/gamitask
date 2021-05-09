import { FaFlag } from "react-icons/fa";
import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
} from "react-icons/fc";
import styled, { keyframes } from "styled-components";
import palette from "../../theme/palette";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    background-color: ${palette.tertiary.main};
  }
  100% {
    opacity: 1;
    background-color: white;
  }
`;

export const Wrapper = styled.div`
  margin-bottom: 1.2rem;
  border-bottom: 0.1rem solid silver;
  animation: 1s ${fadeIn} ease-out;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
`;

export const ProjectName = styled.div`
  font-size: 1.2rem;
`;

export const Button = styled.button<{ variant: string }>`
  border: 0.1rem solid silver;
  cursor: pointer;
  margin: 0.2rem;
  display: inline-flex;
  align-items: center;
  padding: 0.2rem;
  & > svg {
    color: ${({ theme, variant }) => theme.palette[variant].dark};
    margin-right: 0.4rem;
  }
  &:hover {
    border: 0.1rem solid #949090;
    background: silver;
  }
`;

export const Expanded = styled.div``;

export const Label = styled.div`
  font-style: italic;
`;

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

export const PriorityDifficulty = styled.div`
  & > svg {
    margin: 0.4rem;
  }
`;

export const Difficulty = ({ index }: { index: number }) => {
  if (index === 1) return <FcLowPriority />;
  if (index === 2) return <FcMediumPriority />;
  if (index === 3) return <FcHighPriority />;
  return null;
};

export const ModalChild = styled.div`
  padding: 0.4rem;
  & span {
    text-decoration: underline;
  }
  & > h2 {
    text-align: center;
  }
  & div {
    font-weight: 500;
  }
  & button {
    cursor: pointer;
    display: inline-block;
    margin: 0.4rem;
    color: white;
    border: none;
    padding: 0.4rem;
  }
  & .control {
    text-align: right;
  }
  & button:first-child {
    background-color: ${({ theme }) => theme.palette.error.dark};
  }
  & button:last-child {
    background-color: ${({ theme }) => theme.palette.success.dark};
  }
  & button:hover {
    opacity: 0.9;
  }
`;
