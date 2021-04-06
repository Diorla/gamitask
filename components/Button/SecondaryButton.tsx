import styled from "styled-components";
import BaseButton from "./BaseButton";

export default styled(BaseButton)`
  background: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.secondary.text};
  &:active {
    background: ${({ theme }) => theme.palette.secondary.light};
  }
`;
