import styled from "styled-components";

export default styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.text};
  height: 70px;
  align-items: center;
`;
