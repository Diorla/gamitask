import styled, { keyframes } from "styled-components";

const rotate = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(270deg);
	}
`;

const dash = keyframes`
	0% {
		stroke-dashoffset: 187;
	}
	50% {
		stroke-dashoffset: 46.75;
		transform: rotate(135deg);
	}
	100% {
		stroke-dashoffset: 187;
		transform: rotate(450deg);
	}
`;

const SVG = styled.svg`
  animation: ${rotate} 1.4s linear infinite;
  stroke-width: 6;
`;

const Circle = styled.circle<{ color?: string }>`
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  stroke: ${({ color = "white" }) => color};
  animation: ${dash} 1.4s ease-in-out infinite;
`;

export default function Spinner({
  size = "65px",
  color,
}: {
  size?: string;
  color?: string;
}): JSX.Element {
  return (
    <SVG
      width={size}
      height={size}
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle
        color={color}
        fill="none"
        stroke-width="6"
        stroke-linecap="round"
        cx="33"
        cy="33"
        r="30"
      />
    </SVG>
  );
}
