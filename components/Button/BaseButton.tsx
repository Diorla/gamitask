import styled from "styled-components";

export default styled.button`
  background: ${({ theme }) => theme.palette.default.light};
  color: ${({ theme }) => theme.palette.default.text};
  border: none;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  &:active {
    background: ${({ theme }) => theme.palette.default.light}1a;
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    cursor: not-allowed !important;
    opacity: 0.8;
  }
`;
