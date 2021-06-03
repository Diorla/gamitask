import styled from "styled-components";

export default styled.div<{ disabled: boolean }>`
  display: flex;
  & > div:last-child {
    opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  }
  & .disabled {
    background-color: ${({ theme }) => theme.palette.error.main};
  }
  & .enabled {
    background-color: ${({ theme }) => theme.palette.success.main};
  }
`;
