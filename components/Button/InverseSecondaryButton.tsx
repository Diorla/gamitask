import styled from "styled-components";
import BaseButton from "./BaseButton";

export default styled(BaseButton)`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.palette.secondary.dark};
  color: ${({ theme }) => theme.palette.secondary.dark};
  &:active {
    background: ${({ theme }) => theme.palette.secondary.light}36;
  }
`;
