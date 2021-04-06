import styled from "styled-components";
import BaseButton from "./BaseButton";

export default styled(BaseButton)`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.palette.primary.dark};
  color: ${({ theme }) => theme.palette.primary.dark};
  &:active {
    background: ${({ theme }) => theme.palette.primary.light}36;
  }
`;
