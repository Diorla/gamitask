import styled from "styled-components";
import BaseButton from "./BaseButton";

export default styled(BaseButton)`
  background: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.text};
  &:active {
    background: ${({ theme }) => theme.palette.primary.light};
  }
`;
