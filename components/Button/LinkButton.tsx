import styled from "styled-components";
import BaseButton from "./BaseButton";

export default styled(BaseButton)`
  background: transparent;
  color: ${({ theme }) => theme.palette.primary.dark};
  &:active {
    background: transparent;
    text-decoration: underline;
  }
`;
