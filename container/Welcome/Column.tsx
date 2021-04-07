import styled from "styled-components";

export default styled.div`
  & > * {
    margin-bottom: 8px;
  }
`;

export const Header = styled.h1`
  font-weight: normal;
  text-align: center;
`;

export const Action = styled.div`
  display: flex;
  border-radius: 8px;
  & > * {
    flex: 1;
  }
`;
