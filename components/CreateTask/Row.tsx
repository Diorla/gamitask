import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-wrap: wrap;
  & > div {
    flex: 1;
    min-width: 7.5rem;
  }
`;
