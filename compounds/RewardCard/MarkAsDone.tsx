import styled from "styled-components";

export default styled.div<{ disabled: boolean }>`
  display: flex;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.palette.error.main : theme.palette.success.main};
  padding: 0 0.4rem;
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
`;
