import styled from "styled-components";

export default styled.div`
  & > * {
    margin-bottom: 0.8rem;
  }
`;

export const Header = styled.h1`
  font-weight: normal;
  text-align: center;
`;

export const Action = styled.div`
  display: flex;
  border-radius: 0.8rem;
  & > * {
    flex: 1;
  }
`;
