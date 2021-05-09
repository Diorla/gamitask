import styled from "styled-components";

export default styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  background: ${({ active, theme }) =>
    active ? theme.palette.secondary.main + "80" : theme.palette.secondary.main + "1a"};
  cursor: pointer;
  justify-content: center;
  padding: 0.6rem;
  width: 9rem;
  &:hover {
    background: ${({ theme }) => theme.palette.secondary.main + "33"};
  }
  & > svg {
    margin-right: 0.2rem;
  }
`;
