import styled from "styled-components";

export default styled.button`
  background: ${({ theme }) => theme.palette.default.light};
  color: ${({ theme }) => theme.palette.default.text};
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  &:active {
    background: ${({ theme }) => theme.palette.default.light}1a;
  }
  &:focus {
    outline: none;
  }
`;
