import { contrastColor } from "./../scripts/color-functions";
import styled from "styled-components";

export default styled.button<{ active: boolean }>`
  background-color: ${({ active, theme }) =>
    active ? theme.palette.secondary.main : "silver"};
  color: ${({ active, theme }) =>
    active
      ? contrastColor(theme.palette.secondary.main)
      : contrastColor("silver")};
  border: none;
  border-radius: 50%;
  width: 4.5rem;
  height: 4.5rem;
  margin: 0.2rem;
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  outline: none;
  cursor: pointer;
  transition: 0.3s linear;
`;
