import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: calc(0% - 300px) 0;
  }

  20% {
    background-position: calc(0% - 300px) 0;
  }

  80% {
    background-position: calc(100% + 300px) 0;
  }

  100% {
    background-position: calc(100% + 300px) 0;
  }
`;

/**
 * Must provide height, if width is not provided, it will fill the container
 */
const Skeleton = styled.div<{
  height: string;
  width?: string;
  backgroundColor?: string;
  foregroundColor?: string;
}>`
  animation: ${shimmer} 1s linear 0.5s infinite forwards;
  background-color: ${({ backgroundColor = "#ededed" }) => backgroundColor};
  background-image: ${({
    backgroundColor = "#ededed",
    foregroundColor = "#d7d6d6",
  }) => `linear-gradient(
    90deg,
    ${backgroundColor} 14.36%,
    ${foregroundColor} 56.29%,
    ${backgroundColor} 100%
  )`};
  background-repeat: no-repeat;
  background-size: 25rem ${({ height }) => height};
  position: relative;
  height: ${({ height }) => height};
  width: ${({ width }) => width || "100%"};
`;

export default Skeleton;
