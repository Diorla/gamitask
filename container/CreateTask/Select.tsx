import styled from "styled-components";

export default styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  background: ${({ active, theme }) =>
    active ? "#0000001a" : theme.palette.secondary.main + "1a"};
  cursor: pointer;
  justify-content: center;
  padding: 6px;
  &:hover {
    background: ${({ theme }) => theme.palette.secondary.main + "33"};
  }
  & > svg {
    margin-right: 2px;
  }
`;
